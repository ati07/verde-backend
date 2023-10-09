import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema(
    {
        clientId:{type:mongoose.Types.ObjectId},
        merchantId:{type:mongoose.Types.ObjectId},
        merchantAccountId:{type:mongoose.Types.ObjectId},
        amount:{ type:String, default:'500' },
        adjustedAmount:{ type:String },
        discountAmount:{ type:String },
        partialPaidAmount:{ type:String },
        dueAmount:{ type:String },
        numberOfRDR:{ type:String },
        numberOfEthoca:{ type:String },
        rdrTier1Price:{ type: String },
        rdrTier2Price:{ type: String },
        rdrTier3Price:{ type: String },
        ethocaPrice:{ type: String },
        status:{ type: String },
        paymentTerms:{ type: String },
        isDelete:{ type: Boolean, default: false},
        isEmailSent:{ type: Boolean, default: false},
    },
    { timestamps: true }
)
const  Invoice = mongoose.model('invoices', invoiceSchema);
export default Invoice;