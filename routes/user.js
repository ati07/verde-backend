import { Router } from 'express';
import { deleteUser, getUsers, editUserDetails, addUser } from '../controllers/user.js';
import auth from '../middleware/auth.js';
import authenticateRoles from '../middleware/authenticateRole.js';

const allowedRoles = ["Admin", "Client", "Super Admin", "CRM_Admin"]

const userRouter = Router();
// auth, authenticateRoles(allowedRoles),
// auth, authenticateRoles(allowedRoles)
// userRouter.post('/',  addUser)
userRouter.post('/', auth, authenticateRoles(allowedRoles), addUser)
userRouter.get('/', auth, authenticateRoles(allowedRoles), getUsers);
userRouter.patch('/:userId', auth, authenticateRoles(allowedRoles), deleteUser);
userRouter.put('/:userId', auth, authenticateRoles(allowedRoles), editUserDetails);
// userRouter.patch('/status/:userId', auth, editUserDetails);


export default userRouter;
