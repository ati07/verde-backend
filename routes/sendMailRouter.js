import { Router } from "express";
import { sendMail,sendPdfMail } from "../controllers/mailer.js";
import { pdfMail } from "../helper/pdfMailer.js";

const sendMailRouter = Router();
sendMailRouter.get('/',sendMail)
sendMailRouter.post('/',sendMail)
sendMailRouter.get('/sendpdf',sendPdfMail)
sendMailRouter.post('/sendpdf',sendPdfMail)
// sendMail

export default sendMailRouter;