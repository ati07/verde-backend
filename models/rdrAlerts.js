import mongoose from 'mongoose';

const rdrAlertSchema = mongoose.Schema({

    clientId:{type:mongoose.Types.ObjectId},
    merchantId:{type:mongoose.Types.ObjectId},
    merchantAccountId:{type:mongoose.Types.ObjectId},
    status:{ type: String},
    statusCode:{ type: String},
    currency:{ type: String},
    amount:{ type: String},
    isDelete:{ type: Boolean},
    caseDate:{ type: Date},
    lookupSourceType:{ type: String},
    descriptor:{ type: String},
    issuer:{ type: String},
    reportStartDate:{ type: Date},
    reportEndDate:{ type: Date},
    acquirerBin:{ type: String},
    caid:{ type: String},
    authorizationCode:{ type: String},
    acquirer:{ type: String},
    mid:{ type: String},
    orderMatchFlag:{ type: String},
    issueIntName:{ type: String},
    insightId:{ type: String},
    oiDigitalFlag:{ type: String},
    lookupDate:{ type: Date},
    deflectionSettledDate:{ type: Date},
    transactionType:{ type: String},
    orderId:{ type: String},
    delfectionEligibleFlag:{ type: String},
    transactionRequestId:{ type: String},
    cardBin:{ type: String},
    cardLastFour:{ type: String},
},
{ timestamps: true }
)
const RdrAlerts = mongoose.model('rdrAlerts', rdrAlertSchema);
export default RdrAlerts;