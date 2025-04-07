import mongoose from 'mongoose';

const inventorySchema = mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    clientId:{ type: mongoose.Types.ObjectId },
    projectId: { type: mongoose.Types.ObjectId },
    statusId:{ type: mongoose.Types.ObjectId },
    userId:{ type: mongoose.Types.ObjectId },
    typeId: { type: mongoose.Types.ObjectId  },
    // clientId:{ type: String,default: '' },
    // projectId: { type: String,default: '' },
    // statusId:{ type: String,default: ''},
    // userId:{ type: String,default: '' },
    code: { type: String },
    unitName:{ type: String },
    met2: { type: String },
    unitArea: { type: Number },
    priceUnit: { type: Number },
    priceList: { type: Number },
    rooms: { type: String },
    // parking: { type: String },
    // bathroom: { type: String },
    // deposit:{ type: String },
    view: { type: String, default: '' },
    signatureDate: { type: Date },
    comment:{ type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},
{ timestamps: true }
)
const Inventory = mongoose.model('inventories', inventorySchema);
export default Inventory;