import MerchantAccount from '../models/merchantAccount.js';
import tryCatch from './utils/tryCatch.js';

export const createMerchantAccount = tryCatch(async (req, res) => {
  //todo: error handle
  let {clientId,merchantId,dba,mcc,mid,midStatus,midLive,rdrActivation,ethocaActivation} = req.body
  let merchantAccountPayload= {clientId,merchantId,dba,mcc,mid,midStatus,midLive,rdrActivation,ethocaActivation}
  if(rdrActivation==='Yes'){
    if(req.body.rdrCAID){
        merchantAccountPayload['rdrCAID'] = req.body.rdrCAID
    }
    if(req.body.rdrARN){
      merchantAccountPayload['rdrARN'] = req.body.rdrARN
    }
    merchantAccountPayload['visaBin'] = req.body.visaBin
    merchantAccountPayload['rdrTier'] = req.body.rdrTier  
  }

  if(ethocaActivation==='Yes'){
    merchantAccountPayload['masterCardBin'] = req.body.masterCardBin 
    merchantAccountPayload['ethocaARN'] = req.body.ethocaARN 

  }
  const newMerchantAccount = new MerchantAccount(merchantAccountPayload);
  await newMerchantAccount.save();
  res.status(201).json({ success: true, message: "Merchant Account added successfully" });
});

export const getMerchantAccount = tryCatch(async (req, res) => {
  let findMerchantAccount = {
    isDelete: false
  }
  if (req.params.clientId) {
    findMerchantAccount.clientId = req.params.clientId
  }
  if(req.query.clientIds){
    findMerchantAccount.clientId = {$in:JSON.parse(req.query.clientIds)}
  }

  if(req.auth.user._doc.role !=='Admin'){
    findMerchantAccount.clientId = req.auth.user._doc.clientId
  }

  const merchantAccount = await MerchantAccount.find(findMerchantAccount)
  .populate([{path:'clientId',model:'clients'},{ path:'merchantId',model:'merchants'}]).sort({ _id: -1 });
  res.status(200).json({ success: true, result: merchantAccount });
});

export const deleteMerchantAccount = tryCatch(async (req, res) => {
  //Todo: handle data for merchantAccount
  const { _id } = await MerchantAccount.findByIdAndDelete(req.params.merchantAccountId);
  res.status(200).json({ success: true, message: "Merchant Account deleted successfully" });
});

export const updateMerchantAccount = tryCatch(async (req, res) => {
  //Todo: handle MerchantAccount data for status
  const updatedMerchantAccount = await MerchantAccount.updateOne(
    { _id: req.params.merchantAccountId },
    {
      $set: req.body
    })
  let message = 'Merchant Account edited successfully'
  if (req.body.isActive) {
    message = 'Merchant Account status updated successfully'
  }
  res.status(200).json({ success: true, message: message })
});

export const filterMerchantAccount = tryCatch(async (req, res) => {
  let filterMerchantAccountData = {
    isDelete: false
  }

  if(req.body.clients && req.body.clients.length > 0 ) {
    filterMerchantAccountData['clientId'] = {$in:req.body.clients}
  }
  if(req.body.merchants && req.body.merchants.length > 0) {
    filterMerchantAccountData['merchantId'] = {$in:req.body.merchants}
  }
  const merchantAccount = await MerchantAccount.find(filterMerchantAccountData)
  .populate([{path:'clientId',model:'clients'},{path:'merchantId',model:'merchants'}])
  .sort({ _id: -1 });
  res.status(200).json({ success: true, result: merchantAccount });
})