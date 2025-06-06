import Administrator from '../models/administrator.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createAdministrator= tryCatch(async (req, res) => {

  //Todo:  error handling

  let administratorPayload = req.body
  administratorPayload.addedBy = req.auth.user._id
  
  const newAdministrator= new Administrator(administratorPayload);

  await newAdministrator.save()
  res.status(200).json({ success: true, message: 'Administrator added successfully' });

})

// create getClient
export const getAdministrator= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  // if (req.query.projectId) {
  //   findData['clientId'] = req.query.clientId
  // }

  // if (req.query.projectId) {
  //   findData['statusId'] = req.query.statusId
  // }

  const Administrators = await Administrator.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'projectId', model: 'projects' },
    { path: 'userId', model: 'users' },
    { path: 'categoryInTheFlowId', model: 'categoryInTheFlows' },
    { path:'providerId',model: 'providers' }]).sort({ _id: -1 });

  res.status(200).json({ success: true, result: Administrators});
});

//  delete Client
export const deleteAdministrator= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findAdministrator={
    _id: req.params.administratorId
  }
  const c = await Administrator.updateOne(findAdministrator,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Administrator and all the related data deleted successfully' });
});



export const updateAdministrator= tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findAdministrator={
    _id: req.params.administratorId
  }
  const updatedAdministrator = await Administrator.updateOne(findAdministrator,updateData)
  let message = 'Administrator edited successfully'

  res.status(200).json({ success: true, message: message })
});

