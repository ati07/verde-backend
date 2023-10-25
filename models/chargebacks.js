import mongoose from "mongoose";

const chargebackSchema = mongoose.Schema(
    {
        clientId:{type:mongoose.Types.ObjectId},
        merchantId:{type:mongoose.Types.ObjectId},
        merchantAccountId:{type:mongoose.Types.ObjectId},
        cardHolder: { type: String },
        fileDate: { type: Date },
        mid: { type: String },
        cbCode: { type: String },
        transactionId: { type: String },
        transactionDate: { type: Date },
        cbFee: { type: String },
        dueDate: { type: Date },
        cardNumber: { type: String },
        amount: { type: String },
        status: { type: String },
        country: { type: String },
        isDelete: { type: Boolean, default: false},
    },
    { timestamps: true }
)
const Chargebacks = mongoose.model('chargebacks', chargebackSchema);
export default Chargebacks;