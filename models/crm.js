import mongoose from 'mongoose';

const crmSchema = mongoose.Schema({
    company:{ type: String },
    website: { type: String },
    addedBy:{ type: String },
    rdrTier1Price: { type: Number },
    rdrTier2Price: { type: Number },
    rdrTier3Price: { type: Number },
    ethocaPrice: { type: Number },
    monthlyMinimumFees: { type: Number, default: 0 },
    paymentTerms: { type: String },
    integrationFee:{ type: Number },
    status: { type: String },
    dueDate: { type: String },
    contacts:[{}],
    history:[{}],
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},
{ timestamps: true }
)
const Crm = mongoose.model('crms', crmSchema);
export default Crm;