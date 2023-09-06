import { Router } from 'express';
import {
  deleteUser,
  editUserDetails,
  getUsers,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';

const userRouter = Router();

userRouter.get('/',auth, getUsers);
userRouter.delete('/:userId',auth,deleteUser);
userRouter.patch('/status/:userId',auth,editUserDetails);
userRouter.patch('/edit', auth, editUserDetails);


export default userRouter;
