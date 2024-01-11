import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    company:{ type: String },
    name: { type: String },
    email:{ type: String, required: true },
    phoneNumber:{ type: String },
    addedBy: { type: mongoose.Types.ObjectId },
    partnerId: { type: mongoose.Types.ObjectId },
    invoiceEmail: { type: String },
    rdrTier1Price: { type: Number },
    rdrTier2Price: { type: Number },
    rdrTier3Price: { type: Number },
    ethocaPrice: { type: Number },
    monthlyMinimumFees: { type: Number, default: 0 },
    paymentTerms: { type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},
{ timestamps: true }
)
const Client = mongoose.model('clients', clientSchema);
export default Client;