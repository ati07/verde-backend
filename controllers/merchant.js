import Chargebacks from '../models/chargebacks.js';
import Client from '../models/client.js';
import Merchant from '../models/merchant.js';
import MerchantAccount from '../models/merchantAccount.js';
import RdrAlerts from '../models/rdrAlerts.js';
import EthocaAlerts from '../models/ethocaAlerts.js';
import tryCatch from './utils/tryCatch.js';
import Users from '../models/user.js';

export const createMerchant = tryCatch(async (req, res) => {
  //todo: error handle
  let merchantPayload = req.body
  let verifyM = req.body.merchant

  const existingMerchant = await Merchant.find({ merchant: verifyM });
  // console.log('existingMerchant',existingMerchant)
  if (existingMerchant.length) {
    return res.status(400).json({ success: true, message: `Merchant already created : ${verifyM}` });
  }

  const newMerchant = new Merchant(merchantPayload);
  await newMerchant.save();
  
  res.status(201).json({ success: true, message: 'Merchant added successfully' });
});

export const getMerchant = tryCatch(async (req, res) => {

  let findMerchant = {
    isDelete: false,
    isActive: true
  }

  if (req.params.clientId ) {
    findMerchant.clientId = req.params.clientId
  }

  if(req.query.clientIds){
    findMerchant.clientId = {$in:JSON.parse(req.query.clientIds)}
  }

  if(req.auth.user.role !=='Admin'){
    findMerchant.clientId = req.auth.user.clientId
  }

  let populateMerchant = {
    path: 'clientId',
    model: 'clients'
  }
  const merchant = await Merchant.find(findMerchant).populate(populateMerchant).sort({ _id: -1 });
  
  res.status(200).json({ success: true, result: merchant, });
});

export const deleteMerchant = tryCatch(async (req, res) => {
   
  let updateData = {
    $set: {isDelete:true}
  }
  let findMerchant={
    _id: req.params.merchantId
  }
  const m = await Merchant.updateOne(findMerchant,updateData);
  let findData={
    merchantId: req.params.merchantId
  }
  const mA = await MerchantAccount.updateMany(findData,updateData);
  // console.log('mA',mA);

  const rdr= await RdrAlerts.updateMany(findData,updateData);
  // console.log('rdr',rdr);

  const e = await EthocaAlerts.updateMany(findData,updateData);
  // console.log('e',e);
  
  const ch = await Chargebacks.updateMany(findData,updateData);
  // console.log('ch',ch);

  res.status(200).json({ success: true, message: 'Merchant and all the related data deleted successfully' });
});

export const updateMerchant = tryCatch(async (req, res) => {
  
  const updatedMerchant = await Merchant.updateOne(
    { _id: req.params.merchantId },
    {
      $set: req.body
    })
  res.status(200).json({ success: true, message: 'Merchant edited successfully' });
});