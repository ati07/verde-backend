import { Router } from "express";
import auth from "../middleware/auth.js";
import { createAdministrator, deleteAdministrator, getAdministrator, updateAdministrator } from "../controllers/administrator.js";

const AdministratorRouter = Router();

AdministratorRouter.post('/', auth, createAdministrator);
AdministratorRouter.get('/', auth, getAdministrator);
AdministratorRouter.patch('/:administratorId', auth,deleteAdministrator);
AdministratorRouter.put('/:administratorId', auth, updateAdministrator);

export default AdministratorRouter;