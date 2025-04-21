import { Router } from "express";
import auth from "../middleware/auth.js";
import { createStatus, deleteStatus, getStatus, updateStatus } from "../controllers/status.js";

const StatusRouter = Router();
// auth,
StatusRouter.post('/', auth, createStatus);
StatusRouter.get('/', auth, getStatus);
StatusRouter.patch('/:statusId', auth,deleteStatus);
StatusRouter.put('/:statusId', auth, updateStatus);

export default StatusRouter;