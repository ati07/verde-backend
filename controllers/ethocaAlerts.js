import EthocaAlerts from '../models/ethocaAlerts.js';
import tryCatch from './utils/tryCatch.js';

export const createEthocaAlerts = tryCatch(async (req, res) => {
  //todo: error handle

  const ethocaAlertsPayload = req.body;
  const newEthoca = new EthocaAlerts(ethocaAlertsPayload);
  await newEthoca.save();
  res.status(201).json({ success: true, result: 'Ethoca Alerts added successfully' });
});

export const getEthocaAlerts = tryCatch(async (req, res) => {
  //todo: handle deleted data
  const ethocaAlerts = await EthocaAlerts.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: ethocaAlerts });
});

export const deleteEthocaAlerts = tryCatch(async (req, res) => {
  //Todo: handle data for EthocaAlerts
  const { _id } = await EthocaAlerts.findByIdAndDelete(req.params.ethocaId);
  res.status(200).json({ success: true, result: 'Ethoca Alert deleted successfully' });
});

export const updateEthocaAlerts = tryCatch(async (req, res) => {
  //Todo: handle EthocaAlerts data for status
  const updatedEthocaAlerts = await EthocaAlerts.updateOne(
    {_id:req.params.ethocaId},
    {
      $set:req.body
    })
  res.status(200).json({ success: true, result:'Ethoca Alert edited successfully' });
});

export const filterEthocaAlerts = tryCatch(async(req, res)=>{
  let filterData = {}

  if(!req.body.client.includes('All')) {
    filterData['client'] = {$in:req.body.client}
  }
  if(!req.body.merchants.includes('All')) {
    filterData['merchant'] = {$in:req.body.merchants}
  }
  const ethocaAlerts = await EthocaAlerts.find(filterData).sort({ _id: -1 });
  res.status(200).json({ success: true, result: ethocaAlerts });
})