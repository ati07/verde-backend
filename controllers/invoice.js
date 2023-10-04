import Invoice from '../models/invoice.js';
import tryCatch from './utils/tryCatch.js';

export const createInvoice = tryCatch(async(req, res)=>{

  const invoicePayload = req.body;
  const newInvoice = new Invoice(invoicePayload);
  await newInvoice.save();
  res.status(201).json({ success: true, message: 'Invoice added successfully' });
})

export const getInvoice = tryCatch(async(req, res) => {
    let findInvoice = {
        isDelete: false
      }
      if(req.auth.user._doc.role !=='Admin'){
        findInvoice.clientId = req.auth.user._doc.clientId
      }
      const invoice = await Invoice.find(findInvoice)
                                            .populate([
                                              {path:'clientId',model:'clients'},
                                              { path:'merchantId',model:'merchants'},
                                              { path:'merchantAccountId',model:'merchantAccounts'}
                                            ]).sort({ _id: -1 });
      res.status(200).json({ success: true, result: invoice });
})

export const deleteInvoice = tryCatch(async (req, res) => {
    //Todo: handle data for Invoice
    let updateData = {
        $set: {isDelete:true}
      }
    let findInvoice={
    _id: req.params.invoiceId
    }
    const { _id } = await Invoice.updateOne(findInvoice,updateData);
    res.status(200).json({ success: true, message: 'Invoice deleted successfully' });
});

export const mailInvoice = tryCatch(async(req,res)=>{
    let findInvoice={
        _id: req.params.invoiceId
        }
    const invoiceDetail =  await Invoice.find(findInvoice)
                                        .populate([{path:'clientId',model:'clients'},
                                                   { path:'merchantId',model:'merchants'},
                                                   { path:'merchantAccountId',model:'merchantAccounts'}]);
    console.log('invoiceDetail',invoiceDetail)
    //Todo: handle data for Email Invoice

    res.status(200).json({ success: true, message: 'Email Send successfully' });

})