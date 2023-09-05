import { Router } from 'express';
import {
  login,
} from '../controllers/auth.js';
import auth from '../middleware/auth.js';
// import { updateUser } from '../controllers/user.js';


const authRouter = Router();

authRouter.post('/login', login);


export default authRouter;
