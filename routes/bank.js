import { Router } from "express";
import auth from "../middleware/auth.js";
import { createBank, deleteBank, getBank, updateBank } from "../controllers/bank.js";

const BankRouter = Router();
// auth,
BankRouter.post('/', auth, createBank);
BankRouter.get('/', auth, getBank);
BankRouter.patch('/:bankId', auth,deleteBank);
BankRouter.put('/:bankId', auth, updateBank);

export default BankRouter;