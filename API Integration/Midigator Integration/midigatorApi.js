// import Ethoca from '../models/Ethoca.js';

import EthocaAlerts from "../../models/ethocaAlerts.js";

export const midgatorApi = async(req,res)=>{
    console.log("Midigator req res",req.body);
    await EthocaAlerts.insertMany(req.body).then(function () {
        console.log("Data inserted in Ethoca Alert")  // Success
    }).catch(function (error) {
        console.log(error)      // Failure
    });
    res.status(201).json({ success: true, result: 'midigator hit' });
}