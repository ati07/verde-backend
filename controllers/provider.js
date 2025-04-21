import Provider from '../models/provider.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createProvider= tryCatch(async (req, res) => {

  //Todo:  error handling

  let ProviderPayload = req.body
  ProviderPayload.addedBy = req.auth.user._id
  
  const newProvider= new Provider(ProviderPayload);

  await newProvider.save()
  res.status(200).json({ success: true, message: 'Provider added successfully' });

})

// create getClient
export const getProvider= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }
  // if (req.query.snName) {
  //   findData['snName'] = req.query.snName
  // }
  
  const { snName } = req.query;
  // Add regex for partial matching if snName is provided
  if (snName) {
    findData['snName'] = { $regex: snName, $options: 'i' }; // 'i' = case-insensitive
  }
  
  const Providers = await Provider.find(findData).populate([{ path: 'addedBy', model: 'users' }]).sort({ snName: 1 });


  res.status(200).json({ success: true, result: Providers});
});

//  delete Client
export const deleteProvider= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findProvider={
    _id: req.params.providerId
  }
  const c = await Provider.updateOne(findProvider,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Provider and all the related data deleted successfully' });
});



export const updateProvider= tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findProvider={
    _id: req.params.providerId
  }
  const updatedProvider = await Provider.updateOne(findProvider,updateData)
  let message = 'Provider edited successfully'

  res.status(200).json({ success: true, message: message })
});

