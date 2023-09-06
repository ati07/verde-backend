import Client from '../models/client.js';
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
  const { _id } = await Client.findByIdAndDelete(req.params.clientId);

  res.status(200).json({ success: true, message: 'Client deleted successfully' });
});



export const updateClient = tryCatch(async (req, res) => {
  //Todo: handle client data for status
  const updatedClient = await Client.updateOne(
    { _id: req.params.clientId },
    {
      $set: req.body
    })
  let message = 'Client edited successfully'
  if (req.body.isActive) {
    message = 'Client status updated successfully'
  }
  res.status(200).json({ success: true, message: message })
});

