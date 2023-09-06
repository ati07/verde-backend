import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    company:{ type: String },
    name: { type: String },
    email:{ type: String, required: true },
    phoneNumber:{ type: String },
    addedBy: { type: mongoose.Types.ObjectId },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: false }, 
},
{ timestamps: true }
)
const Client = mongoose.model('clients', clientSchema);
export default Client;