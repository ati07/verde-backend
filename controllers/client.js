import Client from '../models/client.js';
import Merchant from '../models/merchant.js';
import MerchantAccount from '../models/merchantAccount.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createClient = tryCatch(async (req, res) => {

  //Todo:  error handling

  let clientPayload = req.body
  const newClient = new Client(clientPayload);
  await newClient.save()
  res.status(200).json({ success: true, message: 'Client added successfully' });

})

// create getClient
export const getClient = tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }
  const client = await Client.find(findData).sort({ _id: -1 });

  res.status(200).json({ success: true, result: client });
});

//  delete Client
export const deleteClient = tryCatch(async (req, res) => {
  //Todo: handle data for client 
  let updateData = {
    $set: {isDelete:true}
  }
  let findClient={
    _id: req.params.clientId
  }
  const { _id } = await Client.updateOne(findClient,updateData);

  res.status(200).json({ success: true, message: 'Client and all the related data deleted successfully' });
});



export const updateClient = tryCatch(async (req, res) => {
  //Todo: handle client data for status
  let updateData = {
    $set: req.body
  }
  let findClient={
    _id: req.params.clientId
  }
  const updatedClient = await Client.updateOne(findClient,updateData)
  let message = 'Client edited successfully'
 
  if (req.body.isActive) {
    let findData = {
      clientId : req.params.clientId
    }
    const updatedMerchant = await Merchant.updateMany(findData,updateData)
    const updatedMerchantAccount = await MerchantAccount.updateMany(findData,updateData)

    message = "Client status updated successfully and all its data are updated"
  }
  res.status(200).json({ success: true, message: message })
});

