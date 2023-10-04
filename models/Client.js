import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    company:{ type: String },
    name: { type: String },
    email:{ type: String, required: true },
    phoneNumber:{ type: String },
    addedBy: { type: mongoose.Types.ObjectId },
    invoiceEmail: { type: String },
    rdrTier1Price: { type: String },
    rdrTier2Price: { type: String },
    rdrTier3Price: { type: String },
    rdrPrice: { type: String },
    ethocaPrice: { type: String },
    monthlyMinimumFees: { type: String },
    paymentTerms: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: false }, 
},
{ timestamps: true }
)
const Client = mongoose.model('clients', clientSchema);
export default Client;