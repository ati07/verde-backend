import CollectionReport from '../models/collectionReport.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createCollectionReport= tryCatch(async (req, res) => {

  //Todo:  error handling

  let CollectionReportPayload = req.body
  
  const newCollectionReport= new CollectionReport(CollectionReportPayload);

  await newCollectionReport.save()
  res.status(200).json({ success: true, message: 'Collection Report added successfully' });

})

// create getClient
export const getCollectionReport= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  const CollectionReports = await CollectionReport.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ _id: -1 });

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
  
  let updateData = {
    $set: req.body
  }
  let findCollectionReport={
    _id: req.params.collectionReportId
  }
  const updatedCollectionReport = await CollectionReport.updateOne(findCollectionReport,updateData)
  let message = 'Collection Report edited successfully'

  res.status(200).json({ success: true, message: message })
});

