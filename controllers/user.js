import User from '../models/user.js';
import tryCatch from './utils/tryCatch.js';


export const addUser= tryCatch(async (req, res) => {
  let userClient = req.body
  const newUser = new User(userClient);
  await newUser.save()
  res.status(200).json({ success: true, message: 'User added successfully' });
});

export const getUsers = tryCatch(async (req, res) => {

  const users = await User.find().populate({path:'clientId',model:'clients'}).sort({ _id: -1 });
  
  res.status(200).json({ success: true, result: users });
});

export const deleteUser= tryCatch(async (req, res) => {
  const { _id } = await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ success: true, message: 'User deleted successfully' });
});

export const editUserDetails = tryCatch(async (req, res) => {
 
  await User.updateOne(
    {_id : req.params.userId}, 
    { $set : req.body }
    );
  let message = 'User edited successfully'
  if(req.body.isActive  || !req.body.isActive){
    message = 'User status update successfully'
  }else if(req.body.isBlock || !req.body.isBlock){
    message = 'User status update successfully'
  }
  res.status(200).json({ success: true, message: message  });
});