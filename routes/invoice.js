import { Router } from "express";
import auth from "../middleware/auth.js";
import { createInvoice, deleteInvoice, getInvoice, mailInvoice } from "../controllers/invoice.js";

const invoiceRouter = Router();

invoiceRouter.post('/',auth,createInvoice);
invoiceRouter.get('/',auth,getInvoice);
invoiceRouter.get('/email/:invoiceId',auth,mailInvoice);
invoiceRouter.patch('/:invoiceId',auth, deleteInvoice);

export default invoiceRouter;