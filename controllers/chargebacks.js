import Chargebacks from '../models/chargebacks.js';
import tryCatch from './utils/tryCatch.js';

export const createChargebacks = tryCatch(async (req, res) => {
  //todo: error handle
  let chargebacksPayload = req.body
  const newChargebacks = new Chargebacks(chargebacksPayload);
  await newChargebacks.save();
  res.status(201).json({ success: true, result: 'Chargeback added successfully'});
});

export const getChargebacks = tryCatch(async (req, res) => {
    //todo: handle deleted data
  const chargebacks = await Chargebacks.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: chargebacks });
});

export const deleteChargebacks = tryCatch(async (req, res) => {
   //Todo: handle data for Chargebacks
  const { _id } = await Chargebacks.findByIdAndDelete(req.params.chargebacksId);
  res.status(200).json({ success: true, message:'Chargeback deleted successfully' });
});

export const updateChargebacks = tryCatch(async (req, res) => {
  //Todo: handle Chargebacks data for status
  const updatedChargebacks = await Chargebacks.updateOne(
    { _id: req.params.chargebacksId },
    {
      $set: req.body
    })
    let message = 'Chargeback edited successfully'
    if(req.body.isActive){
      message = 'Chargeback status updated successfully'
    }
    res.status(200).json({ success: true, message: message })
});

export const filterChargebacks = tryCatch(async (req, res) => {
  let filterData = {}

  if (!req.body.client.includes('All')) {
    filterData['client'] = { $in: req.body.client }
  }
  if (!req.body.merchants.includes('All')) {
    filterData['merchant'] = { $in: req.body.merchants }
  }
  if (!req.body.dbas.includes('All')) {
    filterData['dba'] = { $in: req.body.merchants }
  }
  const chargebacks = await Chargebacks.find(filterData).sort({ _id: -1 });
  res.status(200).json({ success: true, result: chargebacks });
})

export const insertManyChargebacks = tryCatch(async (req, res) => {
  console.log('reqb',typeof req.body, req.body)
  await Chargebacks.insertMany(req.body).then(function (respo) {
    res.status(200).json({ success: true, result:"Data Imported"  });
    console.log("Data inserted",respo)  // Success
  }).catch(function (error) {
    res.status(500).json({ success: false, result:"Importing Failed", error:error });
    console.log(error)      // Failure
  });

})