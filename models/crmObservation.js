import mongoose from 'mongoose';

const crmObservationSchema = mongoose.Schema({
    leadId: { type: mongoose.Types.ObjectId },
    addedBy:{ type: mongoose.Types.ObjectId },
    message:{ type: String },
    isDelete:{ type: Boolean, default: false },
    isActive:{ type: Boolean, default: true }, 
},
{ timestamps: true }
)
const CrmObservation = mongoose.model('crmObservations', crmObservationSchema);
export default CrmObservation;