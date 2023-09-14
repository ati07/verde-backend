import mongoose from "mongoose";

const ethocaAlertSchema = mongoose.Schema(
    {
        clientId:{type:mongoose.Types.ObjectId},
        merchantId:{type:mongoose.Types.ObjectId},
        merchantAccountId:{type:mongoose.Types.ObjectId},
        status:{ type: String, default:'Pending' },
        amount: { type: String},
        arn: { type: String},
        cardBrand: { type: String},
        cardFirst6: { type: String},
        cardLast4: { type: String},
        currency: { type: String},
        mid: { type: String},
        orderGuid: { type: String},
        orderId: { type: String},
        preventionCaseNumber: { type: String},
        preventionGuid: { type: String},
        preventionTimestamp: { type: String},
        preventionType: { type: String},
        transactionTimestamp: { type: String},
        isDelete:{ type: Boolean, default: false}
    },
    { timestamps: true }
)
const EthocaAlert = mongoose.model('ethocaAlerts', ethocaAlertSchema);
export default EthocaAlert;