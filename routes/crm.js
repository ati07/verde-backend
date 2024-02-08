import { Router } from "express";
import { createCrm, deleteCrm, getCrm, updateCrm } from "../controllers/crm.js";
import auth from "../middleware/auth.js";



const crmRouter = Router();

crmRouter.post('/', auth, createCrm);
crmRouter.get('/', auth, getCrm);
crmRouter.patch('/:crmId', auth,deleteCrm);
crmRouter.put('/:crmId', auth, updateCrm);

export default crmRouter;
