import { Router } from "express";
import { createCrm, deleteCrm, getCrm, updateCrm } from "../controllers/crm.js";
import auth from "../middleware/auth.js";
import { createCrmObservation,getCrmObservation } from "../controllers/crmObservation.js";



const crmRouter = Router();

crmRouter.post('/', auth, createCrm);
crmRouter.post('/observation', auth, createCrmObservation);
crmRouter.get('/observation/:leadId', auth, getCrmObservation);
crmRouter.get('/', auth, getCrm);
crmRouter.patch('/:crmId', auth,deleteCrm);
crmRouter.put('/:crmId', auth, updateCrm);

export default crmRouter;
