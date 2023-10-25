import Chargebacks from '../models/chargebacks.js';
import tryCatch from './utils/tryCatch.js';

export const createChargebacks = tryCatch(async (req, res) => {
  //todo: error handle
  let chargebacksPayload = req.body
  const newChargebacks = new Chargebacks(chargebacksPayload);
  await newChargebacks.save();
  res.status(201).json({ success: true, result: 'Chargeback added successfully' });
});

export const getChargebacks = tryCatch(async (req, res) => {
  
  let findChargebacks = {
    isDelete: false
  }
  if (req.auth.user.role !== 'Admin') {
    findChargebacks.clientId = req.auth.user.clientId
  }
  const chargebacks = await Chargebacks.find(findChargebacks)
    .populate([
      { path: 'clientId', model: 'clients' },
      { path: 'merchantId', model: 'merchants' },
      { path: 'merchantAccountId', model: 'merchantAccounts' }
    ]).sort({ _id: -1 });
  res.status(200).json({ success: true, result: chargebacks });
});

export const deleteChargebacks = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: { isDelete: true }
  }
  let find = {
    _id: req.params.chargebacksId
  }
  const { _id } = await Chargebacks.updateOne(find, updateData);
  res.status(200).json({ success: true, message: 'Chargeback deleted successfully' });
});

export const updateChargebacks = tryCatch(async (req, res) => {
  
  const updatedChargebacks = await Chargebacks.updateOne(
    { _id: req.params.chargebacksId },
    {
      $set: req.body
    })
  let message = 'Chargeback edited successfully'
  if (req.body.isActive) {
    message = 'Chargeback status updated successfully'
  }
  res.status(200).json({ success: true, message: message })
});

export const filterChargebacks = tryCatch(async (req, res) => {

  let filterChargebacksData = {}

  if (req.body.clients && req.body.clients.length > 0) {
    filterChargebacksData['clientId'] = { $in: req.body.clients }
  }
  if (req.body.merchants && req.body.merchants.length > 0) {
    filterChargebacksData['merchantId'] = { $in: req.body.merchants }
  }
  if (req.body.dbas && req.body.dbas.length > 0) {
    filterChargebacksData['merchantAccountId'] = { $in: req.body.dbas }
  }
  const chargebacks = await Chargebacks.find(filterChargebacksData)
    .populate([
      { path: 'clientId', model: 'clients' },
      { path: 'merchantId', model: 'merchants' },
      { path: 'merchantAccountId', model: 'merchantAccounts' }
    ]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: chargebacks });

})

export const insertManyChargebacks = tryCatch(async (req, res) => {
  console.log('reqb', typeof req.body, req.body)
  await Chargebacks.insertMany(req.body).then(function (respo) {
    res.status(200).json({ success: true, result: "Data Imported" });
    console.log("Data inserted", respo)  // Success
  }).catch(function (error) {
    res.status(500).json({ success: false, result: "Importing Failed", error: error });
    console.log(error)      // Failure
  });

})