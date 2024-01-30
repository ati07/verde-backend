import RdrAlerts from '../models/rdrAlerts.js';
import tryCatch from './utils/tryCatch.js';

export const createRdrAlerts = tryCatch(async (req, res) => {
  //todo: error handle
  const rdrAlertsPayload = req.body;

  if(req.auth.user.role == 'Partner' ){
    rdrAlertsPayload.partnerId = req.auth.user._id
  }
  rdrAlertsPayload.addedBy = req.auth.user._id


  if(req.body.caseReceivedDate !==''){
    rdrAlertsPayload.createdAt = new Date(req.body.caseReceivedDate)
  }
  // console.log('rdrAlertsPayload',rdrAlertsPayload)
  const newrdr = new RdrAlerts(rdrAlertsPayload);
  await newrdr.save();
  res.status(200).json({ success: true, message: 'Rdr added successfully' });
});

export const getRdrAlerts = tryCatch(async (req, res) => {

  let findRdrAlerts = {
    isDelete: false
  }
  if (req.auth.user.role !== 'Admin' && req.auth.user.role !== 'Partner') {
    findRdrAlerts.clientId = req.auth.user.clientId
  }
  // if(req.auth.user.role == 'Partner' ){
  //   findRdrAlerts.partnerId = req.auth.user._id
  // }
  let populateRdrAlerts = [
    { path: 'clientId', model: 'clients' },
    { path: 'merchantId', model: 'merchants' },
    { path: 'merchantAccountId', model: 'merchantAccounts' }
  ]
  console.log("findRdrAlerts",findRdrAlerts);

  const rdrAlerts = await RdrAlerts.find(findRdrAlerts).populate(populateRdrAlerts).sort({ _id: -1 });

  if(req.auth.user.role == 'Partner'){
    const filterData = rdrAlerts.filter((i)=> String(i.clientId.partnerId) === String(req.auth.user._id))
    // console.log('filterData',rdrAlerts,filterData)
     return  res.status(200).json({ success: true, result: filterData });

  }
  res.status(200).json({ success: true, result: rdrAlerts });
});

export const deleteRdrAlerts = tryCatch(async (req, res) => {

  let updateData = {
    $set: { isDelete: true }
  }
  let findRdrAlerts = {
    _id: req.params.rdrId
  }
  const { _id } = await RdrAlerts.updateOne(findRdrAlerts, updateData);
  res.status(200).json({ success: true, message: 'Rdr deleted successfully' });
});

export const updateRdrAlerts = tryCatch(async (req, res) => {
  let updateData = {
    $set: req.body
  }
  let findRdrAlerts = {
    _id: req.params.rdrId
  }
  const updatedrdr = await RdrAlerts.updateOne(findRdrAlerts, updateData)
  
  res.status(200).json({ success: true, message: 'Rdr edited successfully' });
});

export const filterRdrAlerts = tryCatch(async (req, res) => {
  let filterRdrAlertsData = {
    isDelete: false
  }

  if (req.body.clients && req.body.clients.length > 0) {
    filterRdrAlertsData['clientId'] = { $in: req.body.clients }
  }
  if (req.body.merchants && req.body.merchants.length > 0) {
    filterRdrAlertsData['merchantId'] = { $in: req.body.merchants }
  }
  if (req.body.dbas && req.body.dbas.length > 0) {
    filterRdrAlertsData['merchantAccountId'] = { $in: req.body.dbas }
  }

  if (req.auth.user.role !== 'Admin' && req.auth.user.role !== 'Partner') {
    filterRdrAlertsData.clientId = {$in: req.auth.user.clientId}
  }

  if(req.auth.user.role == 'Partner' ){
    filterRdrAlertsData.partnerId = {$in: req.auth.user._id}
  }

  const rdr = await RdrAlerts.find(filterRdrAlertsData)
    .populate([
      { path: 'clientId', model: 'clients' },
      { path: 'merchantId', model: 'merchants' },
      { path: 'merchantAccountId', model: 'merchantAccounts' }
    ]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: rdr });
})