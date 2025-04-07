import { Router } from "express";
import auth from "../middleware/auth.js";
import { createCode, deleteCode, getCode, updateCode } from "../controllers/code.js";

const CodeRouter = Router();

CodeRouter.post('/', auth, createCode);
CodeRouter.get('/', auth, getCode);
CodeRouter.patch('/:codeId', auth,deleteCode);
CodeRouter.put('/:codeId', auth, updateCode);

export default CodeRouter;