import mongoose from "mongoose";

const chargebackSchema = mongoose.Schema(
    {
        merchantAccountId: { type: String },
        merchantId: { type: String },
        clientId: { type: String },
        cardHolder: { type: String },
        fileDate: { type: String },
        mid: { type: String },
        cbCode: { type: String },
        transactionId: { type: String },
        transactionDate: { type: String },
        cbFee: { type: String },
        dueDate: { type: String },
        cardNumber: { type: String },
        amount: { type: String },
        status: { type: String },
        country: { type: String }
    },
    { timestamps: true }
)
const Chargebacks = mongoose.model('chargebacks', chargebackSchema);
export default Chargebacks;