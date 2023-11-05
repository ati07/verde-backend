import Chargebacks from '../models/chargebacks.js';
import EthocaAlert from '../models/ethocaAlerts.js';
import MerchantAccount from '../models/merchantAccount.js';
import RdrAlerts from '../models/rdrAlerts.js';
import tryCatch from './utils/tryCatch.js';

export const getRiskReport = tryCatch(async (req, res) => {
  let client;
  let merchant;
  let dba;
  let dbas;
  let chargebacks;
  let ethoca;
  let rdr
  if (req.query.current
    && req.query.clientIds
    && req.query.merchantIds
    && req.query.dbasIds
  ) {
    let currentDate = JSON.parse(req.query.current)
    let endDate = JSON.parse(req.query.previous)
    let clientIds = JSON.parse(req.query.clientIds)
    let merchantIds = JSON.parse(req.query.merchantIds)
    let dbasIds = JSON.parse(req.query.dbasIds)

    let findDbaData = {
      createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) },
      isDelete:false,
      
    }
   
    if (clientIds && clientIds.length > 0 && req.auth.user.role === 'Admin') {
      findDbaData['clientId'] = { $in: clientIds }
    }
    if (merchantIds && merchantIds.length > 0) {
      findDbaData['merchantId'] = { $in: merchantIds }
    }
    let merchantAccountData={ 
      ...findDbaData,
      isActive: true
    }
    if(dbasIds && dbasIds.length > 0){
      merchantAccountData['_id']= { $in: dbasIds }
    }

    dba = await MerchantAccount.find(merchantAccountData).sort({ _id: -1 });

    if (dbasIds && dbasIds.length > 0) {
      findDbaData['merchantAcoountId'] = { $in: dbasIds }
    }

    if(req.auth.user.role !=='Admin'){
      findDbaData['clientId'] = req.auth.user.clientId
    }
    // console.log('rrfd',findDbaData)
    
    chargebacks = await Chargebacks.find(findDbaData).sort({ _id: -1 });
    ethoca = await EthocaAlert.find(findDbaData).sort({ _id: -1 });
    rdr = await RdrAlerts.find(findDbaData).sort({ _id: -1 });

    // console.log('dba', dba)
    // console.log('ethoca', ethoca)
    // console.log('rdr', rdr)
    
    const dbadata = []
    for (let i = 0; i < dba.length; i++) {
      dbadata.push({
        id: dba[i]._id,
        createdAt: dba[i].createdAt,
        dba: dba[i].dba,
        rdrStatus: dba[i]?.rdrStatus,
        ethocaStatus: dba[i]?.ethocaStatus,
        rdrAlerts: rdr.filter((obj) => String(obj.merchantAccountId) === String(dba[i]._id)).length,
        ethocaAlerts: ethoca.filter((obj) => String(obj.merchantAccountId) === String(dba[i]._id)).length,
        chargebacks: chargebacks.filter((obj) => String(obj.merchantAccountId) === String(dba[i]._id)).length
      })
    }

    res.status(200).json({
      success: true,
      result: {
        riskreportData: dbadata
      }
    })
  }

})
