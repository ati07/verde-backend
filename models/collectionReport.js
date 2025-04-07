import mongoose from 'mongoose';


const CollectionReportSchema = new mongoose.Schema({
    addedBy: { type: mongoose.Types.ObjectId },
    projectId: { type: mongoose.Types.ObjectId },
    bankId: { type: mongoose.Types.ObjectId },
    clientId: { type: mongoose.Types.ObjectId },
    userId: { type: mongoose.Types.ObjectId },
    reportDate: { type: Date },
    unitName: { type: String },
    collectionReportDate: { type: Date },
    entryDate: { type: Date },
    totalCollection: { type: Number },
    reserve: { type: Number },
    pass: { type: Number },
    interest: { type: Number },
    disbursements: { type: Number },
    arrangements: { type: Date },
    paymentDate: { type: Date },
    observation: { type: Number },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const CollectionReport = mongoose.model('collectionReports', CollectionReportSchema);

export default CollectionReport
