import { Router } from "express";
import auth from "../middleware/auth.js";
import { createInvoice, deleteInvoice, getInvoice, getPartialAmounts, mailInvoice, updateInvoice } from "../controllers/invoice.js";

const invoiceRouter = Router();

invoiceRouter.post('/', auth, createInvoice);
invoiceRouter.get('/', auth, getInvoice);
invoiceRouter.get('/amount', auth, getPartialAmounts)
invoiceRouter.get('/email/:invoiceId', auth, mailInvoice);
invoiceRouter.patch('/:invoiceId', auth, deleteInvoice);
invoiceRouter.put('/:invoiceId', auth, updateInvoice)

export default invoiceRouter;