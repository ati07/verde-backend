import Invoice from '../models/invoice.js';
import MerchantAccount from '../models/merchantAccount.js';
import { getEthocaAmounts, getRdrAmounts } from './utils/calculation.js';
import tryCatch from './utils/tryCatch.js';

export const createInvoice = tryCatch(async (req, res) => {
  const invoicePayload = req.body;

  let filterData = {
    createdAt: { $gte: new Date(invoicePayload.startDate), $lte: new Date(invoicePayload.endDate) },
    clientId: invoicePayload.clientId
  }

  // filterData.startDate = invoicePayload.startDate
  // filterData.endDate = invoicePayload.endDate

  if (invoicePayload.merchantAccountId) {
    filterData.merchantAccountId = invoicePayload.merchantAccountId
  }
  let allMerchantAccounts = await MerchantAccount.find(filterData)

  invoicePayload.allMerchantAccounts = allMerchantAccounts

  let rdrAmount = await getRdrAmounts(filterData, invoicePayload)
  let ethocaAlertsAmounts = await getEthocaAmounts(filterData, invoicePayload)
  // if(invoicePayload.clientId){

  // }
  // console.log('r,e', rdrAmount, ethocaAlertsAmounts)

  invoicePayload.amount = rdrAmount.amount + ethocaAlertsAmounts.amount
  invoicePayload.numberOfTier1 = rdrAmount.rdrTier1
  invoicePayload.numberOfTier2 = rdrAmount.rdrTier2
  invoicePayload.numberOfTier3 = rdrAmount.rdrTier3
  invoicePayload.numberOfEthoca = ethocaAlertsAmounts.numberOfEthocaAlerts

  const newInvoice = new Invoice(invoicePayload);
  await newInvoice.save();
  res.status(201).json({ success: true, message: 'Invoice added successfully' });
})

export const getInvoice = tryCatch(async (req, res) => {
  let findInvoice = {
    isDelete: false
  }
  if (req.auth.user._doc.role !== 'Admin') {
    findInvoice.clientId = req.auth.user._doc.clientId
  }
  const invoice = await Invoice.find(findInvoice)
    .populate([
      { path: 'clientId', model: 'clients' },
      { path: 'merchantId', model: 'merchants' },
      { path: 'merchantAccountId', model: 'merchantAccounts' }
    ]).sort({ _id: -1 });
  res.status(200).json({ success: true, result: invoice });
})

export const getPartialAmounts = tryCatch(async (req, res) => {
  const totalPartialAmounts = await Invoice.find({ status: 'Partial Payment',isDelete:false }).sort({ _id: -1 });
  // console.log('pA',totalPartialAmounts)
  let sum = 0
  totalPartialAmounts.map((i, j) => {
    sum += parseInt(i.dueAmount)
  })
  res.status(200).json({ success: true, result: sum });
})

export const deleteInvoice = tryCatch(async (req, res) => {
  //Todo: handle data for Invoice
  // console.log('dal',req.params)
  let updateData = {
    $set: { isDelete: true }
  }
  let findInvoice = {
    _id: req.params.invoiceId
  }
  const { _id } = await Invoice.updateOne(findInvoice, updateData);
  res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
});

export const updateInvoice = tryCatch(async (req, res) => {
  let updateData = {
    $set: { status: req.body.status }
  }
  let findInvoice = {
    _id: req.params.invoiceId
  }
  if(req.body.partialPaidAmount){

    updateData.$set['partialPaidAmount'] = req.body.partialPaidAmount
    updateData.$set['dueAmount'] = req.body.dueAmount

  }
  if(req.body.status ==='Paid'){

    updateData.$set['partialPaidAmount'] = 0
    updateData.$set['dueAmount'] = 0
  }
  const { _id } = await Invoice.updateOne(findInvoice, updateData);
  res.status(200).json({ success: true, message: 'Invoice status updated successfully' });
})

export const mailInvoice = tryCatch(async (req, res) => {
  let findInvoice = {
    _id: req.params.invoiceId
  }
  const invoiceDetail = await Invoice.find(findInvoice)
    .populate([{ path: 'clientId', model: 'clients' },
    { path: 'merchantId', model: 'merchants' },
    { path: 'merchantAccountId', model: 'merchantAccounts' }]);
  console.log('invoiceDetail', invoiceDetail)
  //Todo: handle data for Email Invoice

  res.status(200).json({ success: true, message: 'Email Send successfully' });

})

