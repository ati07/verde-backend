import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';
// import Room from '../models/Room.js';
import Client from '../models/client.js';

// export const register = tryCatch(async (req, res) => {
//   const { name, email, password, client, role } = req.body;
//   if (password.length < 6)
//     return res.status(400).json({
//       success: false,
//       message: 'Password must be 6 characters or more',
//     });
//   const emailLowerCase = email.toLowerCase();
//   const existedUser = await User.findOne({ email: emailLowerCase });
//   if (existedUser)
//     return res
//       .status(400)
//       .json({ success: false, message: 'User already exists!' });
//   const hashedPassword = await bcrypt.hash(password, 12);

//   const user = await User.create({
//     name,
//     email: emailLowerCase,
//     password: hashedPassword,
//     client,
//     role
//   });
//   const { _id: id, photoURL, active, } = user;
//   const token = jwt.sign({ id, name, photoURL, role }, process.env.JWT_SECRET, {
//     expiresIn: '48h',
//   });
//   res.status(201).json({
//     success: true,
//     result: { id, name, email: user.email, photoURL, token, role, active, user:user.client },
//   });
// });



export const updateProfile = tryCatch(async (req, res) => {
  const fields = req.body?.photoURL
    ? { name: req.body.name, photoURL: req.body.photoURL }
    : { name: req.body.name };
  const updatedUser = await User.findByIdAndUpdate(req.user.id, fields, {
    new: true,
  });
  const { _id: id, name, photoURL, role } = updatedUser;

  // await Room.updateMany({ uid: id }, { uName: name, uPhoto: photoURL });

  const token = jwt.sign({ id, name, photoURL, role }, process.env.JWT_SECRET, {
    expiresIn: '48h',
  });
  res.status(200).json({ success: true, result: { name, photoURL, token } });
});
export const getUsers = tryCatch(async (req, res) => {
  const users = await User.find().sort({ _id: -1 });
  res.status(200).json({ success: true, result: users });
});

export const deleteUser= tryCatch(async (req, res) => {
  const { _id } = await User.findByIdAndDelete(req.params.userId);
  res.status(200).json({ success: true, message: 'User deleted successfully' });
});

export const updateStatus = tryCatch(async (req, res) => {
 
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