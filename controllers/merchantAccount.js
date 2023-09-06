import MerchantAccount from '../models/merchantAccount.js';
import tryCatch from './utils/tryCatch.js';

export const createMerchantAccount = tryCatch(async (req, res) => {
  //todo: error handle
  let merchantAccountPayload = req.body
  const newMerchantAccount = new MerchantAccount(merchantAccountPayload);
  await newMerchantAccount.save();
  res.status(201).json({ success: true, message: "Merchant Account added successfully" });
});

export const getMerchantAccount = tryCatch(async (req, res) => {
  let findData = {
    isDelete: false
  }
  const merchantAccount = await MerchantAccount.find(findData).sort({ _id: -1 });
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
  let filterMerchantAccountData = {}

  if (!req.body.client.includes('All')) {
    filterMerchantAccountData['client'] = { $in: req.body.client }
  }
  if (!req.body.merchants.includes('All')) {
    filterMerchantAccountData['merchant'] = { $in: req.body.merchants }
  }
  const merchantAccount = await MerchantAccount.find(filterMerchantAccountData).sort({ _id: -1 });
  res.status(200).json({ success: true, result: merchantAccount });
})