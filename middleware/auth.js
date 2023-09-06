import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const validateUser = async (data) => {
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


const auth = async (req, res, next) => {
  try {
    req.auth = {}

    const token = req?.headers?.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token found!',
      });
    }

    const verifyOptions = {
      issuer: "Authorization",
      subject: "iam@user.me",
      audience: "cbpro",
      expiresIn: "36h", // 36 hrs validity
      algorithm: "HS256"
    };

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET, verifyOptions);

    const { id, name, role, email } = decodedToken;

    let userData = await validateUser(decodedToken, res);

    if (!userData.success) {
      console.log("Errroooooo....", userData.message);
      return res.status(401).json({
        success: false,
        message: "Authentication failed at Lv1!",
      });
    }

    req.auth.user = {...userData}
    delete req.auth.user.password

    console.log("Authentication successful!");
    next();
  } catch (error) {
    console.log("errorauth", error);
    res.status(401).json({
      success: false,
      message: 'Authentication failed at Lv2!',
    });
  }
};

export default auth;
