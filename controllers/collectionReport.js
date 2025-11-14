import CollectionReport from '../models/collectionReport.js';
import computeIsComplete from './utils/checkComplete.js';
import tryCatch from './utils/tryCatch.js';

const REQUIRED_FIELDS = [
  'projectId',
  'bankId',
  'clientId',
  'userId',
  'reportDate',
  'unitName',
  'collectionReportDate',
  'entryDate',
  'totalCollection',
  'typeOfPayment',
  'paymentDate',
  'observation'
];


// create Client
export const createCollectionReport= tryCatch(async (req, res) => {

  //Todo:  error handling

  let CollectionReportPayload = req.body
  CollectionReportPayload.addedBy = req.auth.user._id
  

  // compute completeness before saving
  CollectionReportPayload.isComplete = computeIsComplete(CollectionReportPayload,REQUIRED_FIELDS);

  const newCollectionReport= new CollectionReport(CollectionReportPayload);

  await newCollectionReport.save()
  res.status(200).json({ success: true, message: 'Collection Report added successfully' });

})

// create getClient
export const getCollectionReport= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.projectId) {
    findData['projectId'] = req.query.projectId
  }

  const CollectionReports = await CollectionReport.find(findData).populate([
    // { path: 'addedBy', model: 'users' },
    { path: 'projectId', model: 'projects'},
    { path: 'bankId', model: 'banks' },
    { path:'clientId',model:'clients'},
    { path: 'userId', model: 'users' },

  ]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: CollectionReports});
});

//  delete Client
export const deleteCollectionReport= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findCollectionReport={
    _id: req.params.collectionReportId
  }
  const c = await CollectionReport.updateOne(findCollectionReport,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Collection Report and all the related data deleted successfully' });
});



export const updateCollectionReport= tryCatch(async (req, res) => {
  
  // fetch existing document to compute final completeness
  const existing = await CollectionReport.findById(req.params.collectionReportId).lean() || {};
  const merged = { ...existing, ...req.body };

  // compute isComplete based on merged values
  merged.isComplete = computeIsComplete(merged,REQUIRED_FIELDS);

  let updateData = {
    $set: { ...req.body, isComplete: merged.isComplete }
  }

  // let updateData = {
  //   $set: req.body
  // }
  let findCollectionReport={
    _id: req.params.collectionReportId
  }
  const updatedCollectionReport = await CollectionReport.updateOne(findCollectionReport,updateData)
  let message = 'Collection Report edited successfully'

  res.status(200).json({ success: true, message: message })
});

