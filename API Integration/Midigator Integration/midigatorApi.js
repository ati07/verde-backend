// import Ethoca from '../models/Ethoca.js';
import EthocaAlerts from "../../models/ethocaAlerts.js";
import MerchantAccount from "../../models/merchantAccount.js";

export const midgatorApi = async (req, res) => {
    console.log("Midigator req res", req.body);
    const reqData = req.body
    const data = {
        "amount": reqData.amount,
        "arn": reqData.arn,
        "cardFirst6": reqData.card_first_6,
        "cardLast4": reqData.card_last_4,
        "currency": reqData.currency,
        "eventGuid": reqData.event_guid,
        "eventTimestamp": reqData.event_timestamp,
        "eventType": reqData.event_type,
        "merchantDescriptor": reqData.merchant_descriptor,
        "mid": reqData.mid,
        "preventionCaseNumber": reqData.prevention_case_number,
        "preventionGuid": reqData.prevention_guid,
        "preventionTimestamp": reqData.prevention_timestamp,
        "preventionType": reqData.prevention_type,
        "transactionTimestamp": reqData.transaction_timestamp
    }
    // const merchantAccount = await MerchantAccount.find({mid:1}).sort({ _id: -1 });
    data.dueDate = new Date(new Date().getTime() + 60 * 60 * 24 * 1000)

    const newEthoca = new EthocaAlerts(data);
    await newEthoca.save();
    res.status(201).json({ success: true, message: 'Ethoca Alerts added successfully' });

    // await EthocaAlerts.insertMany(data).then(function () {
    //     console.log("Data inserted in Ethoca Alert")  // Success
    // }).catch(function (error) {
    //     console.log(error)      // Failure
    // });
    // res.status(201).json({ success: true, result: 'midigator hit' });
}