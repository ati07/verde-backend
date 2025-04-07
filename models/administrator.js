import mongoose from 'mongoose';


const AdministratorSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    providerId: { type: mongoose.Types.ObjectId },
    userId: { type: mongoose.Types.ObjectId },
    projectId: { type: mongoose.Types.ObjectId },
    categoryInTheFlowId: { type: mongoose.Types.ObjectId },
    week: { type: String },
    date: { type: Date },
    bin: { type: String },
    total: { type: Number },
    invoiceDescription: { type: Number },
    commentDate: { type: Date },
    observation: { type: Date },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const Administrator = mongoose.model('administrators', AdministratorSchema);
export default Administrator;