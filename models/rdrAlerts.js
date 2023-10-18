import mongoose from 'mongoose';

const rdrAlertSchema = mongoose.Schema({

    clientId:{type:mongoose.Types.ObjectId},
    merchantId:{type:mongoose.Types.ObjectId},
    merchantAccountId:{type:mongoose.Types.ObjectId},
    caseID: {type:String},
    caseReceivedDate: {type:String},
    status: {type:String},
    tier: {type:String},
    statusCode: {type:String},
    caseCurrencyCode: {type:String},
    caseAmount: {type:String},
    descriptorContact: {type:String},
    caseAge: {type:String},
    isDelete:{ type: Boolean,default:false},
},
{ timestamps: true }
)
const RdrAlerts = mongoose.model('rdrAlerts', rdrAlertSchema);
export default RdrAlerts;