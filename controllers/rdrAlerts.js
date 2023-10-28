import RdrAlerts from '../models/rdrAlerts.js';
import tryCatch from './utils/tryCatch.js';

export const createRdrAlerts = tryCatch(async (req, res) => {
  //todo: error handle
  const rdrAlertsPayload = req.body;
  const newrdr = new RdrAlerts(rdrAlertsPayload);
  await newrdr.save();
  res.status(200).json({ success: true, message: 'Rdr added successfully' });
});

export const getRdrAlerts = tryCatch(async (req, res) => {
   
   let findRdrAlerts = {
    isDelete: false
  }
  if(req.auth.user.role !=='Admin'){
    findRdrAlerts.clientId = req.auth.user.clientId
  }
  const rdrAlerts = await RdrAlerts.find(findRdrAlerts)
                                  .populate([
                                    {path:'clientId',model:'clients'},
                                    { path:'merchantId',model:'merchants'},
                                    { path:'merchantAccountId',model:'merchantAccounts'}
                                  ]).sort({ _id: -1 });;
  
  res.status(200).json({ success: true, result: rdrAlerts });
});

export const deleteRdrAlerts = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: {isDelete:true}
  }
  let findRdrAlerts={
    _id: req.params.rdrId
  }
  const { _id } = await RdrAlerts.updateOne(findRdrAlerts,updateData);
  res.status(200).json({ success: true, message: 'Rdr deleted successfully' });
});

export const updateRdrAlerts = tryCatch(async (req, res) => {
  
  const updatedrdr = await RdrAlerts.updateOne(
    {_id:req.params.rdrId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, message:'Rdr edited successfully' });
});

export const filterRdrAlerts = tryCatch(async(req, res)=>{
  let filterRdrAlertsData = {
    isDelete: false
  }

  if(req.body.clients && req.body.clients.length > 0 ) {
    filterRdrAlertsData['clientId'] = {$in:req.body.clients}
  }
  if(req.body.merchants && req.body.merchants.length > 0) {
    filterRdrAlertsData['merchantId'] = {$in:req.body.merchants}
  }
  if(req.body.dbas && req.body.dbas.length > 0){
    filterRdrAlertsData['merchantAccountId'] = {$in:req.body.dbas}
  }
  const rdr = await RdrAlerts.find(filterRdrAlertsData)
                              .populate([
                                {path:'clientId',model:'clients'},
                                { path:'merchantId',model:'merchants'},
                                { path:'merchantAccountId',model:'merchantAccounts'}
                              ]).sort({ _id: -1 });
                              
  res.status(200).json({ success: true, result: rdr });
})