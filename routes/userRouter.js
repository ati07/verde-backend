import { Router } from 'express';
import {
  deleteUser,
  getUsers,
  login,
  register,
  updateProfile,
  updateStatus,
  updateUser,
} from '../controllers/user.js';
import auth from '../middleware/auth.js';
import checkAccess from '../middleware/checkAccess.js';
import userPermissions from '../middleware/permissions/user/userPermissions.js';

const userRouter = Router();

userRouter.get('/',auth, getUsers);
userRouter.delete('/:userId',auth,deleteUser);
userRouter.patch('/status/:userId',auth,updateStatus);
userRouter.patch('/updateProfile', auth, updateProfile);
// userRouter.put('/:userId',auth,updateUser)


export default userRouter;
