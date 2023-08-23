import mongoose from "mongoose";

const chargebacksSchema = mongoose.Schema(
    {
        dba: { type: String },
        merchant: { type: String },
        client: { type: String },
        card_holder: { type: String },
        file_date: { type: String },
        mid: { type: String },
        cb_code: { type: String },
        transaction_id: { type: String },
        transaction_date: { type: String },
        cb_fee: { type: String },
        due_date: { type: String },
        card_number: { type: String },
        amount: { type: String },
        status: { type: String },
        country: { type: String }
    },
    { timestamps: true }
)
const Chargebacks = mongoose.model('chargebacks', chargebacksSchema);
export default Chargebacks;