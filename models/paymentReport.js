import mongoose from 'mongoose';


const PaymentReportSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    providerId : { type: mongoose.Types.ObjectId },
    projectCategoryId: { type: mongoose.Types.ObjectId },
    codeId: { type: mongoose.Types.ObjectId },
    subPhaseId: { type: mongoose.Types.ObjectId },
    userId: { type: mongoose.Types.ObjectId },
    week: {type: String},
    date: {type: Date},
    contractor: {type: String},
    requestedBy: {type: String},
    total: {type: Number},
    invoiceDescription: {type: Number},
    comment: {type: String},
    orderNo: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const PaymentReport = mongoose.model('paymentReports', PaymentReportSchema);

export default PaymentReport
