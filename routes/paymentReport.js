import { Router } from "express";
import auth from "../middleware/auth.js";
import { createPaymentReport, deletePaymentReport, getPaymentReport, updatePaymentReport } from "../controllers/paymentReport.js";

const PaymentReportRouter = Router();

PaymentReportRouter.post('/', auth, createPaymentReport);
PaymentReportRouter.get('/', auth, getPaymentReport);
PaymentReportRouter.patch('/:paymentReportId', auth,deletePaymentReport);
PaymentReportRouter.put('/:paymentReportId', auth, updatePaymentReport);

export default PaymentReportRouter;