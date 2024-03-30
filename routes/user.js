import { Router } from 'express';
import { deleteUser, getUsers, editUserDetails, addUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';
import authenticateRoles from '../middleware/authenticateRole.js';

const allowedRoles = ["Admin", "Client", "Partner", "CRM_Admin"]

const userRouter = Router();

userRouter.post('/', auth, authenticateRoles(allowedRoles), addUser)
userRouter.get('/', auth, authenticateRoles(allowedRoles), getUsers);
userRouter.patch('/:userId', auth, authenticateRoles(allowedRoles), deleteUser);
userRouter.put('/:userId', auth, authenticateRoles(allowedRoles), editUserDetails);
// userRouter.patch('/status/:userId', auth, editUserDetails);


export default userRouter;
