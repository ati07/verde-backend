import EthocaAlerts from '../models/ethocaAlerts.js';
import tryCatch from './utils/tryCatch.js';

export const createEthocaAlerts = tryCatch(async (req, res) => {
  //todo: error handle

  const ethocaAlertsPayload = req.body;
  ethocaAlertsPayload.dueDate = new Date(new Date(myStringDate).getTime() + 60 * 60 * 24 * 1000)
  const newEthoca = new EthocaAlerts(ethocaAlertsPayload);
  await newEthoca.save();
  res.status(201).json({ success: true, message: 'Ethoca Alerts added successfully' });
});

export const getEthocaAlerts = tryCatch(async (req, res) => {
  //todo: handle deleted data
  let findEthocaAlerts = {
    isDelete: false
  }
  if(req.auth.user._doc.role !=='Admin'){
    findEthocaAlerts.clientId = req.auth.user._doc.clientId
  }
  const ethocaAlerts = await EthocaAlerts.find(findEthocaAlerts)
                                        .populate([
                                          {path:'clientId',model:'clients'},
                                          { path:'merchantId',model:'merchants'},
                                          { path:'merchantAccountId',model:'merchantAccounts'}
                                        ]).sort({ _id: -1 });
  res.status(200).json({ success: true, result: ethocaAlerts });
});

export const deleteEthocaAlerts = tryCatch(async (req, res) => {
  //Todo: handle data for EthocaAlerts
  const { _id } = await EthocaAlerts.findByIdAndDelete(req.params.ethocaId);
  res.status(200).json({ success: true, message: 'Ethoca Alert deleted successfully' });
});

export const updateEthocaAlerts = tryCatch(async (req, res) => {
  //Todo: handle EthocaAlerts data for status
  const updatedEthocaAlerts = await EthocaAlerts.updateOne(
    {_id:req.params.ethocaId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, message:'Ethoca Alert edited successfully' });
});

export const filterEthocaAlerts = tryCatch(async(req, res)=>{
  let filterEthocaAlertsData = {}

  if(req.body.clients && req.body.clients.length > 0 ) {
    filterEthocaAlertsData['clientId'] = {$in:req.body.clients}
  }
  if(req.body.merchants && req.body.merchants.length > 0) {
    filterEthocaAlertsData['merchantId'] = {$in:req.body.merchants}
  }
  if(req.body.dbas && req.body.dbas.length > 0){
    filterEthocaAlertsData['merchantAccountId'] = {$in:req.body.dbas}
  }
  const EthocaAlerts = await EthocaAlerts.find(filterEthocaAlertsData)
                              .populate([
                                {path:'clientId',model:'clients'},
                                { path:'merchantId',model:'merchants'},
                                { path:'merchantAccountId',model:'merchantAccounts'}
                              ]).sort({ _id: -1 });
                              
  res.status(200).json({ success: true, result: EthocaAlerts });
})