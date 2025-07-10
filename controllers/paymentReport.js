import PaymentReport from '../models/paymentReport.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createPaymentReport= tryCatch(async (req, res) => {

  //Todo:  error handling

  let PaymentReportPayload = req.body
  PaymentReportPayload.addedBy = req.auth.user._id
  
  const newPaymentReport= new PaymentReport(PaymentReportPayload);

  await newPaymentReport.save()
  res.status(200).json({ success: true, message: 'Payment Report added successfully' });

})

// create getClient
export const getPaymentReport= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  // if (req.query.projectId) {
  //   findData['clientId'] = req.query.clientId
  // }

  // if (req.query.projectId) {
  //   findData['statusId'] = req.query.statusId
  // }

  const PaymentReports = await PaymentReport.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'userId', model: 'users' },
    { path: 'projectCategoryId', model: 'categoryProjects' },
    { path: 'requestedById', model:'requesteds'},
    { path:'providerId',model: 'providers' },
    { path:'codeId',model: 'codes'}
  ]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: PaymentReports});
});

//  delete Client
export const deletePaymentReport= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findPaymentReport={
    _id: req.params.paymentReportId
  }
  const c = await PaymentReport.updateOne(findPaymentReport,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'PaymentReport and all the related data deleted successfully' });
});



export const updatePaymentReport= tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findPaymentReport={
    _id: req.params.paymentReportId
  }
  const updatedPaymentReport = await PaymentReport.updateOne(findPaymentReport,updateData)
  let message = 'PaymentReport edited successfully'

  res.status(200).json({ success: true, message: message })
});

