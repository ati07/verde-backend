import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
    {
        clientId: { type: mongoose.Types.ObjectId },
        merchantId: { type: mongoose.Types.ObjectId },
        merchantAccountId: { type: mongoose.Types.ObjectId },
        invoiceNumber: { type: Number },
        amount: { type: String },
        adjustedAmount: { type: String },
        discountAmount: { type: String },
        partialPaidAmount: { type: String },
        monthlyMinimumFees: { type: String },
        dueAmount: { type: String, default: '0' },
        dueDate: { type: Date },
        numberOfTier1: { type: Number },
        numberOfTier2: { type: Number },
        numberOfTier3: { type: Number },
        numberOfEthoca: { type: String },
        rdrTier1Price: { type: String },
        rdrTier2Price: { type: String },
        rdrTier3Price: { type: String },
        ethocaPrice: { type: String },
        status: { type: String, default: 'Issued' },
        paymentTerms: { type: String },
        isDelete: { type: Boolean, default: false },
        isEmailSent: { type: Boolean, default: false },
    },
    { timestamps: true }
)
const Invoice = mongoose.model('invoices', invoiceSchema);
export default Invoice;