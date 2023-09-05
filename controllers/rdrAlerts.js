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
   //todo: handle deleted data
  const rdrAlerts = await RdrAlerts.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: rdrAlerts });
});

export const deleteRdrAlerts = tryCatch(async (req, res) => {
  //Todo: handle data for RdrAlerts
  const { _id } = await RdrAlerts.findByIdAndDelete(req.params.rdrId);
  res.status(200).json({ success: true, message: 'Rdr deleted successfully' });
});

export const updateRdrAlerts = tryCatch(async (req, res) => {
  //Todo: handle RdrAlerts data for status

  const updatedrdr = await RdrAlerts.updateOne(
    {_id:req.params.rdrId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, message:'Rdr edited successfully' });
});

export const filterRdrAlerts = tryCatch(async(req, res)=>{
  let filterData = {}

  if(!req.body.client.includes('All')) {
    filterData['client'] = {$in:req.body.client}
  }
  if(!req.body.merchants.includes('All')) {
    filterData['merchant'] = {$in:req.body.merchants}
  }
  const rdr = await RdrAlerts.find(filterData).sort({ _id: -1 });
  res.status(200).json({ success: true, result: rdr });
})