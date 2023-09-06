import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import tryCatch from './utils/tryCatch.js';


export const login = tryCatch(async (req, res) => {
    console.log('req.body',req.body)
    const { email, password } = req.body;
  
    const emailLowerCase = email.toLowerCase();
    const existedUser = await User.findOne({ email: emailLowerCase });
    if (!existedUser)
      return res
        .status(404)
        .json({ success: false, message: 'User does not exist!' });
    const correctPassword = await bcrypt.compare(password, existedUser.password);
    if (!correctPassword)
      return res
        .status(400)
        .json({ success: false, message: 'Invalid credentials' });
  
    const { _id: id, name, photoURL, role, active, dateCreated, client } = existedUser;
    // if (!active)
    //   return res.status(400).json({
    //     success: false,
    //     message: 'This account has been suspended! Try to contact the admin',
    //   });
    const token = jwt.sign({ id, name, role, email }, process.env.JWT_SECRET, {
      expiresIn: '48h',
    });
    res.status(200).json({
      success: true,
      result: { id, name, email: emailLowerCase, photoURL, token, role, active,dateCreated,client },
    });
  });



// export const blockUser = tryCatch(async (req, res) => {
//   const { role, isActive } = req.body;
//   await User.findByIdAndUpdate(req.params.userId, { isActive });
//   res.status(200).json({ success: true, message: 'user edited successfully' });
// });