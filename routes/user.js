import { Router } from 'express';
import { deleteUser, getUsers, editUserDetails } from '../controllers/user.js';
import auth from '../middleware/auth.js';

const userRouter = Router();

userRouter.get('/', auth, getUsers);
userRouter.delete('/:userId', auth, deleteUser);
userRouter.patch('/status/:userId', auth, editUserDetails);
userRouter.patch('/edit', auth, editUserDetails);
// userRouter.put('/:userId',auth,updateUser)


export default userRouter;
