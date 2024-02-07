import mongoose from 'mongoose';

const crmSchema = mongoose.Schema({
    company:{ type: String },
    website: { type: String },
    addedBy:{ type: String },
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