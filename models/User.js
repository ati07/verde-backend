import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    clientId: {type: mongoose.Types.ObjectId},
    name: {type: String},
    email: {type: String,required: true,unique: true},
    role: {type: String},
    password: {type: String},
    image: {type: String},
    isDelete: {type: Boolean},
    isBlock: {type: Boolean},
    isActive: {type: Boolean}
},
{ timestamps: true }
)
const Users = mongoose.model('users', userSchema);
export default Users;