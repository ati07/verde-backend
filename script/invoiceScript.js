import moment from 'moment';
import mongoose from 'mongoose';
import Client from "../models/client.js";
import RdrAlerts from "../models/rdrAlerts.js";
import EthocaAlert from '../models/ethocaAlerts.js';
import Invoice from '../models/invoice.js';
import { exportInvoicePDF } from './invoicePDF.js';
import { pdfMail } from '../helper/pdfMailer.js';
const today = moment();
const startOfMonday = today.clone().subtract(7, 'days').startOf('day').toDate();
const endOfSunday = today.clone().subtract(-1, 'days').endOf('day').toDate();
const main = async function () {
    try {
        console.log('Starting');
        let findClient = {
            isDelete: false,
            paymentTerms: { $nin: ['Monthly Net 3', 'Bi-weekly Net 3'], $exists: true }
        }
        console.log("🚀 ~ file: invoiceScript.js:20 ~ main ~ findClient:", findClient)
        let finalInsertInvoice = [];
        let clients = await Client.find(findClient)
        console.log("🚀 ~ file: invoiceScript.js:22 ~ main ~ clients:", clients)
        let invoice = await Invoice.findOne({ isDelete: false }).sort({ invoiceNumber: -1 })
        console.log("🚀 ~ file: invoiceScript.js:24 ~ main ~ invoice:", invoice)
        let currentInvoiceNumber = invoice ? invoice.invoiceNumber : 999
        console.log("🚀 ~ file: invoiceScript.js:24 ~ main ~ currentInvoiceNumber:", currentInvoiceNumber)
        let clientMapping = {}
        for (let i in clients) {
            let insertInvoice = {}
            clientMapping[clients[i]._id] = {
                company: clients[i].company,
                monthlyMinimumFees: clients[i].monthlyMinimumFees,
                email: clients[i].invoiceEmail
            }
            let rdrDetails = await getRdrDetails(clients[i]);
            let ethocaDetails = await getEthocaDetails(clients[i]);
            insertInvoice = { ...rdrDetails, ...ethocaDetails }
            console.log("🚀 ~ file: invoiceScript.js:45 ~ main ~ insertInvoice:", insertInvoice)
            insertInvoice["amount"] = 0
            if (rdrDetails["totalRdrPrice"]) {
                insertInvoice["amount"] += rdrDetails["totalRdrPrice"]
            }
            if (ethocaDetails["totalEthocaPrice"]) {
                insertInvoice["amount"] += ethocaDetails["totalEthocaPrice"]
            }
            console.log("🚀 ~ file: invoiceScript.js:47 ~ main ~ insertInvoicemount", insertInvoice["amount"])
            if (insertInvoice["amount"]) {
                insertInvoice["amount"] = (insertInvoice["amount"] <= clients[i].monthlyMinimumFees) ? clients[i].monthlyMinimumFees : insertInvoice["amount"]
                insertInvoice["clientId"] = clients[i]._id
                insertInvoice["paymentTerms"] = clients[i].paymentTerms
                insertInvoice["dueDate"] = await getDueDate(clients[i].paymentTerms)
                insertInvoice["invoiceNumber"] = currentInvoiceNumber + 1
                console.log("🚀 ~ file: invoiceScript.js:51 ~ main ~ insertInvoice:", insertInvoice)
                currentInvoiceNumber++
                finalInsertInvoice.push(insertInvoice);
            }
        }
        console.log("🚀 ~ file: invoiceScript.js:52 ~ main ~ finalInsertInvoice:", finalInsertInvoice)
        let invoiceResult = await Invoice.create(finalInsertInvoice)
        console.log("🚀 ~ file: invoiceScript.js:49 ~ main ~ invoiceResult:", invoiceResult)
        await generateInvoiceSendAndUpdateInDB(clientMapping, invoiceResult)
    } catch (e) {
        console.log("🚀 ~ file: invoiceScript.js:54 ~ main ~ e:", e)
    }
}
const getRdrDetails = async function (clientDetail) {
    let clientId = clientDetail._id
    let findRdr = {
        isDelete: false,
        clientId,
        createdAt: {
            $gte: new Date(startOfMonday),
            $lte: new Date(endOfSunday)
        }
    }
    let rdrDetails = await RdrAlerts.aggregate([
        { $match: findRdr },
        { $group: { _id: "$tier", totalRdr: { $sum: 1 } } }
    ]);
    console.log("🚀 ~ file: invoiceScript.js:75 ~ getRdrDetails ~ rdrDetails:", rdrDetails)
    let sendRes = {
        totalRdrPrice: 0
    }
    for (let i in rdrDetails) {
        console.log("🚀 ~ file: invoiceScript.js:80 ~ getRdrDetails ~ rdrDetails:", rdrDetails[i])
        if (['rdrTier1', 'rdrTier2', 'rdrTier3'].includes(rdrDetails[i]._id)) {
            console.log("🚀 ~ file: invoiceScript.js:85670 ~ getRdrDetails ~ rdrDetails:", rdrDetails[i])
            sendRes[`${rdrDetails[i]._id}Price`] = parseFloat(clientDetail[`${rdrDetails[i]._id}Price`])
            sendRes[`numberOfTier${rdrDetails[i]._id.replace('rdrTier', '')}`] = rdrDetails[i].totalRdr
            sendRes["totalRdrPrice"] += (rdrDetails[i].totalRdr * parseFloat(clientDetail[`${rdrDetails[i]._id}Price`]))
        }
    }
    console.log("🚀 ~ file: invoiceScript.js:85 ~ getRdrDetails ~ sendRes:", sendRes)
    return sendRes;
    // [
    //     { "_id": "rdrTier1", "totalRdr": 10 },
    //     { "_id": "rdrTier2", "totalRdr": 5 },
    //     { "_id": "rdrTier3", "totalRdr": 8 }
    // ]
}
const getEthocaDetails = async function (clientDetail) {
    let clientId = clientDetail._id
    let findEthoca = {
        isDelete: false,
        clientId,
        createdAt: {
            $gte: new Date(startOfMonday),
            $lte: new Date(endOfSunday)
        }
    }
    let ethocaCount = await EthocaAlert.count(findEthoca);
    let sendRes = {}
    if (ethocaCount > 0) {
        sendRes.totalEthocaPrice = (ethocaCount * parseFloat(clientDetail["ethocaPrice"])),
            sendRes.numberOfEthoca = ethocaCount
        sendRes.ethocaPrice = clientDetail["ethocaPrice"]
    }
    return sendRes;
    // [
    //     { "_id": "rdrTier1", "totalRdr": 10 },
    //     { "_id": "rdrTier2", "totalRdr": 5 },
    //     { "_id": "rdrTier3", "totalRdr": 8 }
    // ]
}
const getDueDate = async function (paymentTerms) {
    let dueDate = new Date()
    switch (paymentTerms.toLowerCase()) {
        case 'weekly net 1':
            dueDate = today.clone().add(1, 'days').endOf('day').format('YYYY-MM-DD');
            break;
        case 'weekly net 3':
            dueDate = today.clone().add(3, 'days').endOf('day').format('YYYY-MM-DD');
            break;
        case 'weekly net 5':
            dueDate = today.clone().add(5, 'days').endOf('day').format('YYYY-MM-DD');
            break;
        case 'monthly net 3':
            dueDate = today.clone().add(3, 'days').endOf('day').format('YYYY-MM-DD');
            break;
        default:
            dueDate = null;
    }
    return dueDate
}
const generateInvoiceSendAndUpdateInDB = async function (clientMapping, invoices) {
    // todo: handle Email service and send to client
    console.log('Generating invoice send and update...........');
    let sentInvoiceIds = [];
    for (let i in invoices) {
        let invoiceData = JSON.parse(JSON.stringify(invoices[i]));
        invoiceData['company'] = clientMapping[invoiceData.clientId].company
        let invoicePdfString = await exportInvoicePDF(invoiceData);
        await pdfMail({ invoicePdfString })
        sentInvoiceIds.push(invoiceData._id);
    }
    let updateInvoice = await Invoice.updateMany({ _id: { $in: sentInvoiceIds } }, { $set: { isEmailSent: true } })
    console.log("🚀 ~ file: invoiceScript.js:140 ~ generateInvoiceSendAndUpdateInDB ~ updateInvoice:", updateInvoice)
    console.log("Done")
}
console.log("Weekly Net 5", today.clone().add(6, 'days').endOf('day').format('YYYY-MM-DD HH:mm:ss.SSS'));
await mongoose.connect('mongodb://127.0.0.1/cbpro-db').then(() => console.log("db connected"));
main()