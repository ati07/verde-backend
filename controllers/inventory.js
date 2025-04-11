import Inventory from '../models/inventory.js';
import tryCatch from './utils/tryCatch.js';

// create Client
export const createInventory= tryCatch(async (req, res) => {

  //Todo:  error handling

  let InventoryPayload = req.body
  
  const newInventory= new Inventory(InventoryPayload);

  await newInventory.save()
  res.status(200).json({ success: true, message: 'Inventory added successfully' });

})

// create getClient
export const getInventory= tryCatch(async (req, res) => {

  let findData = {
    isDelete: false
  }

  if (req.query.projectId) {
    findData['projectId'] = req.query.projectId
  }

  if (req.query.statusId) {
    findData['statusId'] = req.query.statusId
  }

  const Inventorys = await Inventory.find(findData).populate([
    { path: 'addedBy', model: 'users' },
    { path: 'clientId', model: 'clients' },
    { path: 'projectId', model: 'projects' },
    { path: 'statusId', model: 'status' },
    { path: 'userId', model: 'users' },
    { path: 'typeId', model: 'types' }]).sort({ name: 1 });

  res.status(200).json({ success: true, result: Inventorys});
});

//  delete Client
export const deleteInventory= tryCatch(async (req, res) => {
 
  let updateData = {
    $set: {isDelete:true}
  }
  let findInventory={
    _id: req.params.inventoryId
  }
  const c = await Inventory.updateOne(findInventory,updateData);
//   let findData={
//     clientId: req.params.clientId
//   }
  
//   const u = await Users.updateMany(findData,updateData);
  // console.log('u ',u );

  res.status(200).json({ success: true, message: 'Inventory and all the related data deleted successfully' });
});



export const updateInventory = tryCatch(async (req, res) => {
  
  let updateData = {
    $set: req.body
  }
  let findInventory={
    _id: req.params.inventoryId
  }
  const updatedInventory = await Inventory.updateOne(findInventory,updateData)
  let message = 'Inventory edited successfully'

  res.status(200).json({ success: true, message: message })
});

