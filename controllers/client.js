import Client from '../models/client.js';
import Merchant from '../models/merchant.js';
import MerchantAccount from '../models/merchantAccount.js';
import RdrAlerts from '../models/rdrAlerts.js';
import EthocaAlerts from '../models/ethocaAlerts.js';
import Users from '../models/user.js';
import tryCatch from './utils/tryCatch.js';
import Chargebacks from '../models/chargebacks.js';

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
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findClient={
    _id: req.params.clientId
  }
  const c = await Client.updateOne(findClient,updateData);
  let findData={
    clientId: req.params.clientId
  }
  // console.log('fu',findData,updateData);
  const M = await Merchant.updateMany(findData,updateData);
  // console.log('uM',M);
  const mA = await MerchantAccount.updateMany(findData,updateData);
  // console.log('mA',mA);

  const rdr= await RdrAlerts.updateMany(findData,updateData);
  // console.log('rdr',rdr);

  const e = await EthocaAlerts.updateMany(findData,updateData);
  // console.log('e',e);
  
  const ch = await Chargebacks.updateMany(findData,updateData);
  // console.log('ch',ch);

  const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Client and all the related data deleted successfully' });
});



export const updateClient = tryCatch(async (req, res) => {
  
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

