import mongoose from 'mongoose';
// enum: ['basic', 'editor', 'admin'],
// 
const userSchema = mongoose.Schema(
  {
    name: { type: String, min: 2, max: 50, required: true },
    email: {
      type: String,
      min: 5,
      max: 50,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    photoURL: { type: String, default: '' },
    role: {
      type: String,
      default: 'User',
      enum: ['User','Admin','Client'],
    },
    active: { type: Boolean, default: true },
    dateCreated: {type:String,default: ''},
    client: {type:String,default:''}

  },
  { timestamps: true }
);

const User = mongoose.model('users', userSchema);
export default User;
