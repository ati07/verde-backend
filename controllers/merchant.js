import Client from '../models/client.js';
import Merchant from '../models/merchant.js';
import tryCatch from './utils/tryCatch.js';

export const createMerchant = tryCatch(async (req, res) => {
  //todo: error handle
  let merchantPayload = req.body
  const newMerchant = new Merchant(merchantPayload);
  await newMerchant.save();
  res.status(201).json({ success: true, message: 'Merchant added successfully' });
});

export const getMerchant = tryCatch(async (req, res) => {
  // console.log('req',req.auth.user._doc)
  let findMerchant = {
    isDelete: false
  }
  if (req.params.clientId ) {
    findMerchant.clientId = req.params.clientId
  }
  if(req.query.clientIds){
    findMerchant.clientId = {$in:JSON.parse(req.query.clientIds)}
  }
  if(req.auth.user._doc.role !=='Admin'){
    findMerchant.clientId = req.auth.user._doc.clientId
  }
  // if()
  const merchant = await Merchant.find(findMerchant).populate({
    path: 'clientId',
    model: 'clients'
  }).sort({ _id: -1 });
  res.status(200).json({ success: true, result: merchant, });
});

export const deleteMerchant = tryCatch(async (req, res) => {
  //Todo: handle data for Merchant 
  let updateData = {
    $set: {isDelete:true}
  }
  let findMerchant={
    _id: req.params.merchantId
  }
  const { _id } = await Merchant.updateOne(findMerchant,updateData);
  // const updatedMerchant = await Merchant.updateOne({ _id: req.params.merchantId },{ isDelete: true })

  res.status(200).json({ success: true, message: 'Merchant deleted successfully' });
});

export const updateMerchant = tryCatch(async (req, res) => {
  //Todo: handle client data for status
  const updatedMerchant = await Merchant.updateOne(
    { _id: req.params.merchantId },
    {
      $set: req.body
    })
  res.status(200).json({ success: true, message: 'Merchant edited successfully' });
});