import MerchantAccount from '../models/merchantAccount.js';
import RdrAlerts from '../models/rdrAlerts.js';
import EthocaAlerts from '../models/ethocaAlerts.js';
import tryCatch from './utils/tryCatch.js';
import Chargebacks from '../models/chargebacks.js';

export const createMerchantAccount = tryCatch(async (req, res) => {
  //todo: error handle
  let { clientId, merchantId, dba,currency, mcc, mid, midStatus, rdrStatus, ethocaStatus, midLive, rdrActivation, ethocaActivation } = req.body
  let merchantAccountPayload = { clientId, merchantId, dba,currency, mcc, mid, rdrStatus, ethocaStatus, midStatus, midLive, rdrActivation, ethocaActivation }
  if (rdrActivation === 'Yes') {
    if (req.body.rdrCAID) {
      merchantAccountPayload['rdrCAID'] = req.body.rdrCAID
    }
    if (req.body.rdrARN) {
      merchantAccountPayload['rdrARN'] = req.body.rdrARN
    }
    merchantAccountPayload['visaBin'] = req.body.visaBin
    merchantAccountPayload['rdrTier'] = req.body.rdrTier
  }

  if (ethocaActivation === 'Yes') {
    merchantAccountPayload['masterCardBin'] = req.body.masterCardBin
    merchantAccountPayload['ethocaARN'] = req.body.ethocaARN
  }

  const existingMerchant = await MerchantAccount.find({ dba });
  console.log("🚀 ~ file: merchantAccount.js:29 ~ createMerchantAccount ~ existingMerchant:", dba, existingMerchant)

  if (existingMerchant.length) {
    return res.status(400).json({ success: true, message: `Merchant Account created with this Descriptor: ${dba}` });
  }

  if(req.auth.user.role == 'Partner' ){
    merchantAccountPayload.partnerId = req.auth.user._id
  }
  merchantAccountPayload.addedBy = req.auth.user._id

  const newMerchantAccount = new MerchantAccount(merchantAccountPayload);
  await newMerchantAccount.save();
  res.status(200).json({ success: true, message: "Merchant Account added successfully" });
});

export const getMerchantAccount = tryCatch(async (req, res) => {
  let findMerchantAccount = {
    isDelete: false,
    isActive: true
  }
  if (req.query.clientId) {
    findMerchantAccount.clientId = req.query.clientId
  }
  // console.log('req.params',req.params)

  if (req.query.merchantId) {
    findMerchantAccount.merchantId = req.query.merchantId
  }
  
  if (req.query.clientIds) {
    findMerchantAccount.clientId = { $in: JSON.parse(req.query.clientIds) }
  }
  if (req.query.merchantIds) {
    findMerchantAccount.merchantId = { $in: JSON.parse(req.query.merchantIds) }
  }
  
  if (req.auth.user.role !== 'Admin') {
    findMerchantAccount.clientId = req.auth.user.clientId
  }

  if(req.auth.user.role == 'Partner' ){
    findMerchantAccount.partnerId = req.auth.user._id
  }

  const merchantAccount = await MerchantAccount.find(findMerchantAccount)
    .populate([{ path: 'clientId', model: 'clients' }, { path: 'merchantId', model: 'merchants' }]).sort({ _id: -1 });
  res.status(200).json({ success: true, result: merchantAccount });
});

export const deleteMerchantAccount = tryCatch(async (req, res) => {

  let updateData = {
    $set: { isDelete: true }
  }
  let findMerchantAccount = {
    _id: req.params.merchantAccountId
  }
  const ma = await MerchantAccount.updateOne(findMerchantAccount, updateData);
  let findData = {
    merchantAccountId: req.params.merchantAccountId
  }
  // console.log('mA',mA);

  const rdr = await RdrAlerts.updateMany(findData, updateData);
  // console.log('rdr',rdr);

  const e = await EthocaAlerts.updateMany(findData, updateData);
  // console.log('e',e);

  const ch = await Chargebacks.updateMany(findData, updateData);
  // console.log('ch',ch);

  res.status(200).json({ success: true, message: "Merchant Account and all the related data deleted successfully" });
});

export const updateMerchantAccount = tryCatch(async (req, res) => {

  let findData = {
    _id: req.params.merchantAccountId
  }

  let updateData = {
    $set: req.body
  }

  const updatedMerchantAccount = await MerchantAccount.updateOne(findData, updateData)

  let message = 'Merchant Account edited successfully'

  if (req.body.isActive) {
    message = 'Merchant Account status updated successfully'
  }

  res.status(200).json({ success: true, message: message })

});

export const filterMerchantAccount = tryCatch(async (req, res) => {

  let filterMerchantAccountData = {
    isDelete: false,
    isActive:true
  }

  if (req.body.clients && req.body.clients.length > 0) {
    filterMerchantAccountData['clientId'] = { $in: req.body.clients }
  }

  if (req.body.merchants && req.body.merchants.length > 0) {
    filterMerchantAccountData['merchantId'] = { $in: req.body.merchants }
  }

  let populatedMerchantAccount = [{ path: 'clientId', model: 'clients' }, { path: 'merchantId', model: 'merchants' }]
  const merchantAccount = await MerchantAccount.find(filterMerchantAccountData).populate(populatedMerchantAccount).sort({ _id: -1 });
  res.status(200).json({ success: true, result: merchantAccount });
})