import mongoose from 'mongoose';

const merchantSchema = mongoose.Schema({
    clientId: { type:mongoose.Types.ObjectId }, 
    merchant: { type: String}, 
    typeOfBusiness:{ type: String},
    email:{ type: String},
    isDelete:{ type: Boolean, default: false},
    isActive:{ type: Boolean, default: true},
},
{ timestamps: true }
)
const Merchant = mongoose.model('merchants', merchantSchema);
export default Merchant;