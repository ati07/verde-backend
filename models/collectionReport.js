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
    totalCollection: { type: String },
    typeOfPayment: { type: String },
    paymentDate: { type: Date },
    observation: { type: String },
    isComplete:{ type: Boolean },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
});

const CollectionReport = mongoose.model('collectionReports', CollectionReportSchema);

export default CollectionReport
