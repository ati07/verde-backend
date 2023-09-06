import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  try {
    //todo: handle authentication
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id, name, photoURL, role } = decodedToken;
    req.user = { id, name, photoURL, role };
    next();
  } catch (error) {
    console.log("errorauth",error);
    res.status(401).json({
      success: false,
      message: 'Something is wrong with your authorization!',
    });
  }
};

export default auth;
