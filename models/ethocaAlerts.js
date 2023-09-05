import mongoose from "mongoose";

const ethocaAlertSchema = mongoose.Schema(
    {
        merchantAccountId: { type: String },
        merchantId: { type: String },
        clientId: { type: String },
        descriptor: { type: String },
        issuer: { type: String },
        created: { type: String },
        transDate: { type: String },
        ethocaId: { type: String },
        midLive: { type: String },
        acquirer: { type: String },
        bin: { type: String },
        alertDate: { type: String },
        cardNumber: { type: String },
        transactionId: { type: String },
        alertType: { type: String },
        alertDateTime: { type: String },
        cbCode: { type: String },
        mid:{ type: String },
        amount: { type: String },
        arn: { type: String },
        cardFirst6: { type: String },
        cardLast4: { type: String },
        currency: { type: String },
        eventGuid: { type: String },
        eventTimestamp: { type: String },
        eventType: { type: String },
        merchantDescriptor: { type: String },
        preventionCaseNumber: { type: String },
        preventionGuid: { type: String },
        preventionTimestamp: { type: String },
        preventionType: { type: String },
        transactionTimestamp: { type: String }
    },
    { timestamps: true }
)
const EthocaAlert = mongoose.model('ethocaAlerts', ethocaAlertSchema);
export default EthocaAlert;