import { Router } from "express";
import auth from "../middleware/auth.js";
import { createType, deleteType, getType, updateType } from "../controllers/type.js";

const TypeRouter = Router();
// auth,
TypeRouter.post('/', auth, createType);
TypeRouter.get('/', auth, getType);
TypeRouter.patch('/:TypeId', auth,deleteType);
TypeRouter.put('/:TypeId', auth, updateType);

export default TypeRouter;