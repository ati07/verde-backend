import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';

export const login = tryCatch(async (req, res) => {

  const { email, password } = req.body;

  const existedUser = await User.findOne({ email: email.toLowerCase() });

  if (!existedUser) {
    return res.status(404).json({ success: false, message: 'User does not exist!' });
  }

  const correctPassword = await bcrypt.compare(password, existedUser.password);

  if (!correctPassword) {
    return res.status(400).json({ success: false, message: 'Invalid credentials' });
  }

  const { _id: id, name, photoURL, role, isActive, createdAt, client, userEmail } = existedUser;

  const signOptions = {
    issuer: "Authorization",
    subject: "iam@user.me",
    audience: "cbpro",
    expiresIn: "36h", // 36 hrs validity
    algorithm: "HS256"
  };

  const token = jwt.sign({ id, name, role, email }, process.env.JWT_SECRET, signOptions);

  res.status(200).json({
    success: true,
    result: { id, name, email: userEmail, photoURL, token, role, isActive, createdAt, client },
  });
});

export const validateUser = async (data) => {
  let sendRes = {
    success: false
  }

  try {
    let findUser = {
      email: data.email
    }
    const userData = await User.findOne(findUser);
  
    if(!userData) {
      return {...sendRes, message: 'User not found'}
    }
  
    if(!userData.isActive || !userData.isBlock){
      return {...sendRes, message: 'User is not allowed to access, contact administrator.'}
    }
    return userData;
    
  } catch (error) {
    return {...sendRes, message: "Error in validating user..."}
  }
  

}



// export const blockUser = tryCatch(async (req, res) => {
//   const { role, isActive } = req.body;
//   await User.findByIdAndUpdate(req.params.userId, { isActive });
//   res.status(200).json({ success: true, message: 'user edited successfully' });
// });