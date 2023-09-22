import EthocaAlert from '../models/ethocaAlerts.js';
import MerchantAccount from '../models/merchantAccount.js';
import RdrAlerts from '../models/rdrAlerts.js';
import { getDiffDay, getDisputesAmountsPerBrand, getDisputesPerBrand, merchantAccountsWithAlerts, top5 } from './dashboardHelper.js';
import tryCatch from './utils/tryCatch.js';



export const getDashboardData = tryCatch(async(req,res)=>{
//   console.log('reqDas',req.query)
//   req.query.clientIds

let ethocaAlerts;
let rdrAlerts;
let merchantAccounts;
let expiredEthocaAlerts;
let refundedEthocaAlerts;
let pendingEthocaAlerts;
let ethocaAlertsNoFilter;
let rdrAlertsNoFilter;
if(req.query.current
   && req.query.clientIds
   && req.query.merchantIds
   && req.query.dbasIds)
   {
    let currentDate = JSON.parse(req.query.current)
    let endDate = JSON.parse(req.query.previous)
    let clientIds = JSON.parse(req.query.clientIds)
    let merchantIds = JSON.parse(req.query.merchantIds)
    let dbasIds = JSON.parse(req.query.dbasIds)


    let findMerchants = {
        createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) }
      }
    let findMerchantAccount = {
        createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) }
    }
    let findEthocaAlerts = {
        createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) }
      }
    let findRdrAlerts = {
        createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) }
    }
    let findExpiredEthocaAlerts = { status: 'Expired', createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) } }
    let findRefundedEthocaAlerts = { status: 'Refunded', createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) } }
    let findPendingEthocaAlerts = { status: 'Pending', createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) } }
    
    if(clientIds && clientIds.length > 0 && req.auth.user._doc.role ==='Admin'){
        findEthocaAlerts['clientId'] = {$in: clientIds }
        findRdrAlerts['clientId'] = {$in: clientIds }
        findExpiredEthocaAlerts['clientId'] = {$in: clientIds }
        findRefundedEthocaAlerts['clientId'] = {$in: clientIds }
        findPendingEthocaAlerts['clientId'] = {$in: clientIds }
        findMerchantAccount['clientId'] = {$in: clientIds }
    }
    if(merchantIds && merchantIds.length > 0){
        findEthocaAlerts['merchantId'] = {$in: merchantIds }
        findRdrAlerts['merchantId'] = {$in: merchantIds }
        findExpiredEthocaAlerts['merchantId'] = {$in: merchantIds }
        findRefundedEthocaAlerts['merchantId'] = {$in: merchantIds }
        findPendingEthocaAlerts['merchantId'] = {$in: merchantIds }
        findMerchantAccount['merchantId'] = {$in: merchantIds }
    }
    if(dbasIds && dbasIds.length > 0){
        findEthocaAlerts['merchantAccountId'] = {$in: dbasIds }
        findRdrAlerts['merchantAccountId'] = {$in: dbasIds }
        findExpiredEthocaAlerts['merchantAccountId'] = {$in: dbasIds }
        findRefundedEthocaAlerts['merchantAccountId'] = {$in: dbasIds }
        findPendingEthocaAlerts['merchantAccountId'] = {$in: dbasIds }
        findMerchantAccount['merchantAccountId'] = {$in: dbasIds }
    }
    if(req.auth.user._doc.role !=='Admin'){
        findEthocaAlerts['clientId'] = req.auth.user._doc.clientId
        findRdrAlerts['clientId'] = req.auth.user._doc.clientId
        findExpiredEthocaAlerts['clientId'] = req.auth.user._doc.clientId
        findRefundedEthocaAlerts['clientId'] = req.auth.user._doc.clientId
        findPendingEthocaAlerts['clientId'] = req.auth.user._doc.clientId
        findMerchantAccount['clientId'] = req.auth.user._doc.clientId
      }
    // Find All data accounding to filtered

    ethocaAlerts = await EthocaAlert.find(findEthocaAlerts).sort({ _id: -1 });
    rdrAlerts = await RdrAlerts.find(findRdrAlerts).sort({ _id: -1 });
    ethocaAlertsNoFilter = await EthocaAlert.find().sort({ _id: -1 });
    rdrAlertsNoFilter = await RdrAlerts.find().sort({ _id: -1 });
    expiredEthocaAlerts = await EthocaAlert.find(findExpiredEthocaAlerts).sort({ _id: -1 });
    refundedEthocaAlerts = await EthocaAlert.find(findRefundedEthocaAlerts).sort({ _id: -1 });
    let refundedEthocaAlertsNoFilter = await EthocaAlert.find({status:'Refunded'}).sort({ _id: -1 });
    pendingEthocaAlerts = await EthocaAlert.find(findPendingEthocaAlerts).sort({ _id: -1 });
    merchantAccounts = await MerchantAccount.find(findMerchantAccount).sort({ _id: -1 })
// Calulate Data
    const totalAlerts = ethocaAlerts.length + rdrAlerts.length // sum of Ethoca Alerts and rdr Alerts
    const pendingEthocaRefunds = pendingEthocaAlerts.length // sum of pending Ethoca Alerts
    const lostRevenue = expiredEthocaAlerts.length * 35  // 
    const potentialRevenueLoss = pendingEthocaAlerts.length * 35
    const totalclosedDiputes = rdrAlerts.length + refundedEthocaAlerts.length
    const executedAlertsVsExpired = ((rdrAlerts.length + refundedEthocaAlerts.length) / (rdrAlerts.length + ethocaAlerts.length)).toFixed(2)
    const DisputesPerBrand  = getDisputesPerBrand(rdrAlerts,ethocaAlerts)
    const DisputesAmountPerBrand= getDisputesAmountsPerBrand(rdrAlerts,ethocaAlerts) 
    // const projectedSavingsForecast = pendingEthocaAlerts.length * 35
    const alertsPerDBA = merchantAccountsWithAlerts(merchantAccounts,rdrAlerts,ethocaAlerts)
    const avoidedChargebacks = rdrAlerts.length + refundedEthocaAlerts.length
    const visaFinesAvoided = (rdrAlerts.map((i)=>i.caseAmount).reduce((total, num) => total + parseInt(num===''?0:num), 0)) * 35
    const MastercardFinesAvoided = (refundedEthocaAlerts.map((i)=>i.amount).reduce((total, num) => total + parseInt(num===''?0:num), 0)) * 35
    const RevenueSavings = visaFinesAvoided + MastercardFinesAvoided
    const avoidedFines = visaFinesAvoided + MastercardFinesAvoided
    const totalSavedRevenue = (rdrAlertsNoFilter.map((i)=>i.caseAmount).reduce((total, num) => total + parseInt(num===''?0:num), 0)) * 35 + (refundedEthocaAlertsNoFilter.map((i)=>i.amount).reduce((total, num) => total + parseInt(num===''?0:num), 0)) * 35
    
    // last 7 days data
    let ethocaAlertsLast7 = await EthocaAlert.find({createdAt: { $gte: new Date((new Date().getTime() - (15 * 24 * 60 * 60 * 1000))) }}).sort({ _id: -1 });
    let rdrAlertsLast7 = await RdrAlerts.find({createdAt: { $gte: new Date((new Date().getTime() - (15 * 24 * 60 * 60 * 1000))) }}).sort({ _id: -1 });

    const projectedSaving = rdrAlertsLast7.map((i)=>i.caseAmount).reduce((total, num) => total + parseInt(num===''?0:num), 0) + ethocaAlertsLast7.map((i)=>i.amount).reduce((total, num) => total + parseInt(num===''?0:num), 0)
    const avgProjectedSavingLast7days = (projectedSaving * 4 / 7).toFixed(2)
  

    // Avg transaction Alerts
    const avgRdrAlerts = (rdrAlerts.map((i)=>i.caseAmount).reduce((total, num) => total + parseInt(num===''?0:num), 0) / getDiffDay(currentDate.start_date,currentDate.end_date)).toFixed(2)
    const avgEthocaAlerts = (ethocaAlerts.map((i)=>i.amount).reduce((total, num) => total + parseInt(num===''?0:num), 0) / getDiffDay(currentDate.start_date,currentDate.end_date)).toFixed(2)

   // find out the all Alerts per marchant account
  res.status(200).json({success: true,result:{
        totalAlerts:totalAlerts,
        pendingEthocaRefunds:pendingEthocaRefunds,
        lostRevenue:lostRevenue,
        potentialRevenueLoss:potentialRevenueLoss,
        totalclosedDiputes:totalclosedDiputes,
        executedAlertsVsExpired:executedAlertsVsExpired,
        avoidedChargebacks:avoidedChargebacks,
        visaFinesAvoided:visaFinesAvoided,
        mastercardFinesAvoided:MastercardFinesAvoided,
        disputesPerBrand: DisputesPerBrand,
        disputesAmountPerBrand: DisputesAmountPerBrand,
        projectedSaving: avgProjectedSavingLast7days,
        totalSavedRevenue:totalSavedRevenue,
        avoidedFines:avoidedFines,
        revenueSavings:RevenueSavings,
        // avgTransactionAlerts:avgTransactionAlerts,
        avgRdrAlerts:avgRdrAlerts,
        avgEthocaAlerts:avgEthocaAlerts,
        alertsPerDBA:top5(alertsPerDBA)
    }})
  }
  
})