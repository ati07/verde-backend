import EthocaAlert from '../models/ethocaAlerts.js';
import MerchantAccount from '../models/merchantAccount.js';
import RdrAlerts from '../models/rdrAlerts.js';
import { getDisputesPerBrand, merchantAccountsWithAlerts} from './dashboardHelper.js';
import tryCatch from './utils/tryCatch.js';


export const getDashboardDataNew = tryCatch(async (req, res) => {
  // console.log('reqDas', req.query)
  //   req.query.clientIds
  let ethocaAlerts;
  let rdrAlerts;

  let findData = {
    isDeleted:false
  }

  if (req.query.startDate && req.query.endDate) {
    let startDate = req.query.startDate
    let endDate = req.query.endDate
    findData['createdAt'] = { $gte: new Date(startDate), $lte: new Date(endDate) }
  }

  if (req.query.clientIds && req.auth.user.role === 'Admin') {
    let clientIds = JSON.parse(req.query.clientIds)
    findData['clientId'] = { $in: clientIds }
  }
  if (req.query.merchantIds) {
    let merchantIds = JSON.parse(req.query.merchantIds)
    findData['merchantId'] = { $in: merchantIds }
  }
  if (req.query.dbasIds) {
    let dbasIds = JSON.parse(req.query.dbasIds)
    findData['merchantAccountId'] = { $in: dbasIds }
  }
  // console.log('susus',req.auth.user)
  if (req.auth.user.role !== 'Admin') {
    findData['clientId'] = req.auth.user.clientId
  }
  // Find All data accounding to filtered
  if (req.query.rdrAlerts) {
    let findRdrAlerts = {
      ...findData
    }
    rdrAlerts = await RdrAlerts.count(findRdrAlerts).sort({ _id: -1 });

  }

  if (req.query.ethocaAlerts) {
    let findEthocaAlerts = {
      ...findData
    }
    if (req.query.status) {
      findEthocaAlerts['status'] = req.query.status
    }
    ethocaAlerts = await EthocaAlert.count(findEthocaAlerts).sort({ _id: -1 });

  }

  // find out the all Alerts per marchant account
  res.status(200).json({
    success: true, result: {
      rdrAlerts: rdrAlerts,
      ethocaAlerts: ethocaAlerts
    }
  })

})

export const getAlertsAmounts = tryCatch(async (req, res) => {
  let ethocaAlerts;
  let rdrAlerts;
  let merchantAccounts;
  let rdrAmounts;
  let ethocaAlertsAmounts;

  let findData = {
    isDeleted:false
  }

  if (req.query.startDate && req.query.endDate) {
    let startDate = req.query.startDate
    let endDate = req.query.endDate
    findData['createdAt'] = { $gte: new Date(startDate), $lte: new Date(endDate) }
  }
  if (req.query.past7) {
    findData['createdAt'] = { $gte: new Date((new Date().getTime() - (15 * 24 * 60 * 60 * 1000))) }
  }
  if (req.query.clientIds && req.auth.user.role === 'Admin') {
    let clientIds = JSON.parse(req.query.clientIds)
    findData['clientId'] = { $in: clientIds }
  }
  if (req.query.merchantIds) {
    let merchantIds = JSON.parse(req.query.merchantIds)
    findData['merchantId'] = { $in: merchantIds }
  }
  if (req.query.dbasIds) {
    let dbasIds = JSON.parse(req.query.dbasIds)
    findData['merchantAccountId'] ={ $in: dbasIds}
  }
  if (req.auth.user.role !== 'Admin') {
    findData['clientId'] = req.auth.user.clientId
  }

  if (req.query.rdrAlerts) {
    let findRdrAlerts = {
      ...findData
    }
    
    rdrAlerts = await RdrAlerts.find(findRdrAlerts, { _id: 1, createdAt: 1,merchantAccountId:1, caseAmount: 1 }).sort({ _id: -1 });
    rdrAmounts = (rdrAlerts.map((i) => i.caseAmount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0))
   
  }

  if (req.query.ethocaAlerts) {
    let findEthocaAlerts = {
      ...findData
    }
    if (req.query.status) {
      findEthocaAlerts['status'] = req.query.status
    }

    ethocaAlerts = await EthocaAlert.find(findEthocaAlerts, { _id: 1, status: 1, createdAt: 1,merchantAccountId:1, amount: 1 }).sort({ _id: -1 });
    ethocaAlertsAmounts = (ethocaAlerts.map((i) => i.amount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0))
  }
  if (req.query.merchantAccount) {
    let findMerchantAccount = {
      ...findData
    }
    merchantAccounts = await MerchantAccount.find(findMerchantAccount, { _id: 1,dba:1 }).sort({ _id: -1 });
    const top5 = merchantAccountsWithAlerts(merchantAccounts, rdrAlerts, ethocaAlerts)

    // console.log("top5,merchantAccounts", merchantAccounts, top5)

    return res.status(200).json({
      success: true, result: {
        alertsPerMerchantAccount: top5
      }
    })
  }
  if (req.query.disputesPerBrand) {
    let getDisputes = getDisputesPerBrand(rdrAlerts, ethocaAlerts)

    return res.status(200).json({
      success: true, result: {
        disputesPerBrandCount: getDisputes.getDisputesPerBrandCount,
        disputesPerBrandAmounts: getDisputes.getDisputesPerBrandAmounts
      }
    })
  }
  res.status(200).json({
    success: true, result: {
      rdrAlertsAmounts: rdrAmounts,
      ethocaAlertsAmounts: ethocaAlertsAmounts
    }
  })
})







// export const getDashboardData = tryCatch(async (req, res) => {
//   //   console.log('reqDas',req.query)
//   //   req.query.clientIds

//   let ethocaAlerts;
//   let rdrAlerts;
//   let merchantAccounts;
//   let refundedEthocaAlerts;
//   if (req.query.current
//     && req.query.clientIds
//     && req.query.merchantIds
//     && req.query.dbasIds) {
//     let currentDate = JSON.parse(req.query.current)
//     // let endDate = JSON.parse(req.query.previous)
//     let clientIds = JSON.parse(req.query.clientIds)
//     let merchantIds = JSON.parse(req.query.merchantIds)
//     let dbasIds = JSON.parse(req.query.dbasIds)

//     let findMerchants = {
//       createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) }
//     }
//     let findMerchantAccount = {
//       createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) }
//     }
//     let findEthocaAlerts = {
//       createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) }
//     }
//     let findRdrAlerts = {
//       createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) }
//     }
//     // let findExpiredEthocaAlerts = { status: 'Expired', createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) } }
//     // let findPendingEthocaAlerts = { status: 'Pending', createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) } }
//     let findRefundedEthocaAlerts = { status: 'Refunded', createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) } }

//     if (clientIds && clientIds.length > 0 && req.auth.user.role === 'Admin') {
//       findEthocaAlerts['clientId'] = { $in: clientIds }
//       findRdrAlerts['clientId'] = { $in: clientIds }
//       // findExpiredEthocaAlerts['clientId'] = {$in: clientIds }
//       // findPendingEthocaAlerts['clientId'] = {$in: clientIds }
//       findRefundedEthocaAlerts['clientId'] = { $in: clientIds }
//       findMerchantAccount['clientId'] = { $in: clientIds }
//     }
//     if (merchantIds && merchantIds.length > 0) {
//       findEthocaAlerts['merchantId'] = { $in: merchantIds }
//       findRdrAlerts['merchantId'] = { $in: merchantIds }
//       // findExpiredEthocaAlerts['merchantId'] = {$in: merchantIds }
//       // findPendingEthocaAlerts['merchantId'] = {$in: merchantIds }
//       findRefundedEthocaAlerts['merchantId'] = { $in: merchantIds }
//       findMerchantAccount['merchantId'] = { $in: merchantIds }
//     }
//     if (dbasIds && dbasIds.length > 0) {
//       findEthocaAlerts['merchantAccountId'] = { $in: dbasIds }
//       findRdrAlerts['merchantAccountId'] = { $in: dbasIds }
//       // findExpiredEthocaAlerts['merchantAccountId'] = {$in: dbasIds }
//       // findPendingEthocaAlerts['merchantAccountId'] = {$in: dbasIds }
//       findRefundedEthocaAlerts['merchantAccountId'] = { $in: dbasIds }
//       findMerchantAccount['merchantAccountId'] = { $in: dbasIds }
//     }
//     if (req.auth.user.role !== 'Admin') {
//       findEthocaAlerts['clientId'] = req.auth.user.clientId
//       findRdrAlerts['clientId'] = req.auth.user.clientId
//       // findExpiredEthocaAlerts['clientId'] = req.auth.user.clientId
//       // findPendingEthocaAlerts['clientId'] = req.auth.user.clientId
//       findRefundedEthocaAlerts['clientId'] = req.auth.user.clientId
//       findMerchantAccount['clientId'] = req.auth.user.clientId
//     }
//     // Find All data accounding to filtered
//     ethocaAlerts = await EthocaAlert.find(findEthocaAlerts).sort({ _id: -1 });
//     rdrAlerts = await RdrAlerts.find(findRdrAlerts).sort({ _id: -1 });
//     refundedEthocaAlerts = await EthocaAlert.find(findRefundedEthocaAlerts).sort({ _id: -1 });
//     merchantAccounts = await MerchantAccount.find(findMerchantAccount).sort({ _id: -1 })
//     // Calulate Data
//     const totalAlerts = ethocaAlerts.length + rdrAlerts.length // sum of Ethoca Alerts and rdr Alerts
//     const totalclosedDiputes = rdrAlerts.length + refundedEthocaAlerts.length
//     const executedAlertsVsExpired = ((rdrAlerts.length + refundedEthocaAlerts.length) / (rdrAlerts.length + ethocaAlerts.length)).toFixed(2)
//     const DisputesPerBrand = getDisputesPerBrand(rdrAlerts, ethocaAlerts)
//     const DisputesAmountPerBrand = getDisputesAmountsPerBrand(rdrAlerts, ethocaAlerts)
//     // const projectedSavingsForecast = pendingEthocaAlerts.length * 35
//     const alertsPerDBA = merchantAccountsWithAlerts(merchantAccounts, rdrAlerts, ethocaAlerts)
//     const avoidedChargebacks = rdrAlerts.length + refundedEthocaAlerts.length
//     const visaFinesAvoided = (rdrAlerts.map((i) => i.caseAmount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0)) * 35
//     const MastercardFinesAvoided = (refundedEthocaAlerts.map((i) => i.amount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0)) * 35
//     const RevenueSavings = visaFinesAvoided + MastercardFinesAvoided
//     const avoidedFines = visaFinesAvoided + MastercardFinesAvoided

//     // Avg transaction Alerts
//     const avgRdrAlerts = (rdrAlerts.map((i) => i.caseAmount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0) / getDiffDay(currentDate.start_date, currentDate.end_date)).toFixed(2)
//     const avgEthocaAlerts = (ethocaAlerts.map((i) => i.amount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0) / getDiffDay(currentDate.start_date, currentDate.end_date)).toFixed(2)

//     // find out the all Alerts per marchant account
//     res.status(200).json({
//       success: true, result: {
//         totalAlerts: totalAlerts,
//         totalclosedDiputes: totalclosedDiputes,
//         executedAlertsVsExpired: executedAlertsVsExpired,
//         avoidedChargebacks: avoidedChargebacks,
//         visaFinesAvoided: visaFinesAvoided,
//         mastercardFinesAvoided: MastercardFinesAvoided,
//         disputesPerBrand: DisputesPerBrand,
//         disputesAmountPerBrand: DisputesAmountPerBrand,
//         avoidedFines: avoidedFines,
//         revenueSavings: RevenueSavings,
//         // avgTransactionAlerts:avgTransactionAlerts,
//         avgRdrAlerts: avgRdrAlerts,
//         avgEthocaAlerts: avgEthocaAlerts,
//         alertsPerDBA: top5(alertsPerDBA)
//       }
//     })
//   }

// })


// export const getPast7DaysData = tryCatch(async (req, res) => {
//   // console.log('Past7',req.query)
//   // last 7 days data
//   let ethocaAlertsLast7 = await EthocaAlert.find({ createdAt: { $gte: new Date((new Date().getTime() - (15 * 24 * 60 * 60 * 1000))) } }).sort({ _id: -1 });
//   let rdrAlertsLast7 = await RdrAlerts.find({ createdAt: { $gte: new Date((new Date().getTime() - (15 * 24 * 60 * 60 * 1000))) } }).sort({ _id: -1 });

//   const projectedSaving = rdrAlertsLast7.map((i) => i.caseAmount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0) + ethocaAlertsLast7.map((i) => i.amount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0)
//   const avgProjectedSavingLast7days = ((projectedSaving * 4) / 7).toFixed(2)
//   res.status(200).json({
//     success: true,
//     result: {
//       projectedSaving: avgProjectedSavingLast7days,
//     }
//   })
// })

// export const getTotalSavingRevenue = tryCatch(async (req, res) => {
//   // console.log('getTotalSavingRevenue',req.query)
//   let ethocaAlertsNoFilter = await EthocaAlert.find().sort({ _id: -1 });
//   let refundedEthocaAlertsNoFilter = await EthocaAlert.find({ status: 'Refunded' }).sort({ _id: -1 });
//   let rdrAlertsNoFilter = await RdrAlerts.find().sort({ _id: -1 });
//   const totalSavedRevenue = (rdrAlertsNoFilter.map((i) => i.caseAmount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0)) * 35 + (refundedEthocaAlertsNoFilter.map((i) => i.amount).reduce((total, num) => total + parseInt(num === '' ? 0 : num), 0)) * 35

//   res.status(200).json({
//     success: true,
//     result: { totalSavedRevenue: totalSavedRevenue }
//   })
// })

// export const getLostRevenue = tryCatch(async (req, res) => {
//   // console.log('getLostRevenue',req.query)

//   if (req.query.current
//     && req.query.clientIds
//     && req.query.merchantIds
//     && req.query.dbasIds) {
//     let currentDate = JSON.parse(req.query.current)
//     let endDate = JSON.parse(req.query.previous)
//     let clientIds = JSON.parse(req.query.clientIds)
//     let merchantIds = JSON.parse(req.query.merchantIds)
//     let dbasIds = JSON.parse(req.query.dbasIds)

//     let findExpiredEthocaAlerts = { status: 'Expired', createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) } }

//     if (clientIds && clientIds.length > 0 && req.auth.user.role === 'Admin') {
//       findExpiredEthocaAlerts['clientId'] = { $in: clientIds }
//     }
//     if (merchantIds && merchantIds.length > 0) {
//       findExpiredEthocaAlerts['merchantId'] = { $in: merchantIds }
//     }
//     if (dbasIds && dbasIds.length > 0) {
//       findExpiredEthocaAlerts['merchantAccountId'] = { $in: dbasIds }
//     }
//     if (req.auth.user.role !== 'Admin') {
//       findExpiredEthocaAlerts['clientId'] = req.auth.user.clientId
//     }

//     let expiredEthocaAlerts = await EthocaAlert.find(findExpiredEthocaAlerts).sort({ _id: -1 });

//     const lostRevenue = expiredEthocaAlerts.length * 35  // 
//     res.status(200).json({
//       success: true,
//       result: { lostRevenue: lostRevenue, }
//     })


//   }

// })

// export const getPendingEthocaAlerts = tryCatch(async (req, res) => {
//   // console.log('getPendingEthocaAlerts',req.query)

//   if (req.query.current
//     && req.query.clientIds
//     && req.query.merchantIds
//     && req.query.dbasIds) {

//     let currentDate = JSON.parse(req.query.current)
//     let endDate = JSON.parse(req.query.previous)
//     let clientIds = JSON.parse(req.query.clientIds)
//     let merchantIds = JSON.parse(req.query.merchantIds)
//     let dbasIds = JSON.parse(req.query.dbasIds)
//     let findPendingEthocaAlerts = { status: 'Pending', createdAt: { $gte: new Date(currentDate.start_date), $lte: new Date(currentDate.end_date) } }

//     if (clientIds && clientIds.length > 0 && req.auth.user.role === 'Admin') {
//       findPendingEthocaAlerts['clientId'] = { $in: clientIds }
//     }
//     if (merchantIds && merchantIds.length > 0) {
//       findPendingEthocaAlerts['merchantId'] = { $in: merchantIds }
//     }
//     if (dbasIds && dbasIds.length > 0) {
//       findPendingEthocaAlerts['merchantAccountId'] = { $in: dbasIds }
//     }
//     if (req.auth.user.role !== 'Admin') {
//       findPendingEthocaAlerts['clientId'] = req.auth.user.clientId
//     }

//     let pendingEthocaAlerts = await EthocaAlert.find(findPendingEthocaAlerts).sort({ _id: -1 });

//     const pendingEthocaRefunds = pendingEthocaAlerts.length // sum of pending Ethoca Alerts
//     const potentialRevenueLoss = pendingEthocaAlerts.length * 35

//     res.status(200).json({
//       success: true,
//       result: {
//         pendingEthocaRefunds: pendingEthocaRefunds,
//         potentialRevenueLoss: potentialRevenueLoss,
//       }
//     })

//   }

// })