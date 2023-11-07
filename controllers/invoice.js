import Invoice from '../models/invoice.js';
import MerchantAccount from '../models/merchantAccount.js';
import { getEthocaAmounts, getRdrAmounts } from './utils/calculation.js';
import tryCatch from './utils/tryCatch.js';

export const createInvoice = tryCatch(async (req, res) => {
  //todo: email to client
  const invoicePayload = req.body;

  let filterData = {
    createdAt: { $gte: new Date(invoicePayload.startDate), $lte: new Date(invoicePayload.endDate) },
    clientId: invoicePayload.clientId,
    isDelete: false
  }
  
  if (invoicePayload.merchantAccountId) {
    filterData.merchantAccountId = invoicePayload.merchantAccountId
  }
  
  let rdrAmount = await getRdrAmounts(filterData, invoicePayload)
  let ethocaAlertsAmounts = await getEthocaAmounts(filterData, invoicePayload)
  let totalA = rdrAmount.amount + ethocaAlertsAmounts.amount

  if(totalA <= parseFloat(invoicePayload.monthlyMinimumFees)){
     invoicePayload.amount =  parseFloat(invoicePayload.monthlyMinimumFees)
  }else{
    invoicePayload.amount = totalA +  parseFloat(invoicePayload.monthlyMinimumFees)
  }
  
  invoicePayload.numberOfTier1 = rdrAmount.rdrTier1
  invoicePayload.numberOfTier2 = rdrAmount.rdrTier2
  invoicePayload.numberOfTier3 = rdrAmount.rdrTier3
  invoicePayload.numberOfEthoca = ethocaAlertsAmounts.numberOfEthocaAlerts
  invoicePayload.from = new Date(invoicePayload.startDate)
  
  let d = new Date(invoicePayload.endDate)
  d.setDate(d.getDate() - 1);

  invoicePayload.to = new Date(d)

  let invoice = await Invoice.findOne({ isDelete: false }).sort({ invoiceNumber: -1 })
  let currentInvoiceNumber = invoice ? invoice.invoiceNumber : 999
  invoicePayload.invoiceNumber = currentInvoiceNumber + 1
    
  const newInvoice = new Invoice(invoicePayload);
  await newInvoice.save();
  res.status(201).json({ success: true, message: 'Invoice added successfully' });
})

export const getInvoice = tryCatch(async (req, res) => {

  let findInvoice = {
    isDelete: false
  }

  if (req.auth.user.role !== 'Admin') {
    findInvoice.clientId = req.auth.user.clientId
  }

  let populateQuery = [
    { path: 'clientId', model: 'clients' },
    { path: 'merchantId', model: 'merchants' },
    { path: 'merchantAccountId', model: 'merchantAccounts' }
  ]

  const invoice = await Invoice.find(findInvoice).populate(populateQuery).sort({ _id: -1 });

  res.status(200).json({ success: true, result: invoice });
})

export const getPartialAmounts = tryCatch(async (req, res) => {

  let findInvoice = { status: 'Partial Payment', isDelete: false }

  const totalPartialAmounts = await Invoice.find(findInvoice).sort({ _id: -1 });

  let sum = 0

  totalPartialAmounts.map((i, j) => {
    sum += parseFloat(i.dueAmount)
  })

  res.status(200).json({ success: true, result: sum });
})

export const deleteInvoice = tryCatch(async (req, res) => {

  let updateData = {
    $set: { isDelete: true }
  }

  let findInvoice = {
    _id: req.params.invoiceId
  }

  const updatedData = await Invoice.updateOne(findInvoice, updateData);

  res.status(200).json({ success: true, message: 'Invoice deleted successfully' });

});

export const updateInvoice = tryCatch(async (req, res) => {

  let updateData = {
    $set: { status: req.body.status }
  }

  let findInvoice = {
    _id: req.params.invoiceId
  }

  if (req.body.partialPaidAmount) {
    updateData.$set['partialPaidAmount'] = parseFloat(req.body.partialPaidAmount)
    updateData.$set['dueAmount'] = parseFloat(req.body.dueAmount)
  }

  if (req.body.status === 'Paid') {
    updateData.$set['partialPaidAmount'] = 0
    updateData.$set['dueAmount'] = 0
  }

  const updatedData = await Invoice.updateOne(findInvoice, updateData);

  res.status(200).json({ success: true, message: 'Invoice status updated successfully' });
})

export const mailInvoice = tryCatch(async (req, res) => {

  let findInvoice = {
    _id: req.params.invoiceId
  }

  let populateInvoice = [
    { path: 'clientId', model: 'clients' },
    { path: 'merchantId', model: 'merchants' },
    { path: 'merchantAccountId', model: 'merchantAccounts' }
  ]
  const invoiceDetail = await Invoice.find(findInvoice).populate(populateInvoice);

  //Todo: handle data for Email Invoice

  res.status(200).json({ success: true, message: 'Email Send successfully' });

})

