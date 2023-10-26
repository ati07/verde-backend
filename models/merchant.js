import mongoose from 'mongoose';

const merchantSchema = mongoose.Schema({
    clientId: { type:mongoose.Types.ObjectId }, 
    merchant: { type: String}, 
    dba:{ type: String},
    email:{ type: String},
    isDelete:{ type: Boolean, default: false}
},
{ timestamps: true }
)
const Merchant = mongoose.model('merchants', merchantSchema);
export default Merchant;