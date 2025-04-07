import { Router } from "express";
import auth from "../middleware/auth.js";
import { createSubPhase, deleteSubPhase, getSubPhase, updateSubPhase } from "../controllers/subPhase.js";

const SubPhaseRouter = Router();

SubPhaseRouter.post('/', auth, createSubPhase);
SubPhaseRouter.get('/', auth, getSubPhase);
SubPhaseRouter.patch('/:subPhaseId', auth,deleteSubPhase);
SubPhaseRouter.put('/:subPhaseId', auth, updateSubPhase);

export default SubPhaseRouter;