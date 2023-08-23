import Chargebacks from '../models/Chargebacks.js';
import Client from '../models/Client.js';
import DBA from '../models/DBA.js';
import Ethoca from '../models/Ethoca.js';
import Merchant from '../models/Merchant.js';
import Rdr from '../models/Rdr.js';
import tryCatch from './utils/tryCatch.js';

const month = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'Jun',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'

}


export const pickHighest = (obj, num = 1) => {
  const requiredObj = {};
  // if(num > Object.keys(obj).length){
  //    return false;
  // };
  Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, ind) => {
    if (ind < num) {
      requiredObj[key] = obj[key];
    }
  });
  return requiredObj;
};

export const getDashboardData = tryCatch(async (req, res) => {
  // console.log('reqDash', JSON.parse(req.body.current))
  // console.log('reqDash', JSON.parse(req.body.current))
  const data = JSON.parse(req.body.current)
  // console.log('chargebacksDarre', new Date(data.end_date))
  let client;
  let merchant;
  let dba;
  let chargebacks;
  let wonChargebacks
  let inProcessChargebacks
  let openCases;
  let urgentActionRequired;
  let closedCases;
  let expired;
  let ethoca;
  let rdr
  // console.log('dataD',req.body,data)
  if (data.start_date
    && data.end_date
    && req.body.client
    && req.body.merchants
    && req.body.dbas
  ) {
    
    let findChargebackData = {
      createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
    }
    let findMerchants = {
      createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
    }
    let findDbas = {
      createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
    }
    let findwonChargebacks = { status: 'Won', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
    let findinProcessChargebacks = { status: 'In process', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
    let findopenCases = { status: 'Open', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
    let findclosedCases = { status: 'Closed', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
    let findurgentActionRequired = { status: 'Due', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
    let findexpired = { status: 'Expired', createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) } }
    let findethoca = {
      createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
    }
    let findrdr = {
      createdAt: { $gte: new Date(data.start_date), $lte: new Date(data.end_date) }
    }
    if (!req.body.client.includes('All')) {
      findChargebackData['client'] = { $in: req.body.client }
      findwonChargebacks['client'] = { $in: req.body.client }
      findinProcessChargebacks['client'] = { $in: req.body.client }
      findopenCases['client'] = { $in: req.body.client }
      findclosedCases['client'] = { $in: req.body.client }
      findurgentActionRequired['client'] = { $in: req.body.client }
      findexpired['client'] = { $in: req.body.client }
      findethoca['client'] = { $in: req.body.client }
      findrdr['client'] = { $in: req.body.client }
      findMerchants['client'] = { $in: req.body.client }
      findDbas['client'] = { $in: req.body.client }
    }
    if (!req.body.merchants.includes('All')) {
      findChargebackData['merchant'] = { $in: req.body.merchants }
      findwonChargebacks['merchant'] = { $in: req.body.merchants }
      findinProcessChargebacks['merchant'] = { $in: req.body.merchants }
      findopenCases['merchant'] = { $in: req.body.merchants }
      findclosedCases['merchant'] = { $in: req.body.merchants }
      findurgentActionRequired['merchant'] = { $in: req.body.merchants }
      findexpired['merchant'] = { $in: req.body.merchants }
      findethoca['merchant'] = { $in: req.body.merchants }
      findrdr['merchant'] = { $in: req.body.merchants }
    }
    if (!req.body.dbas.includes('All')) {
      findChargebackData['dba'] = { $in: req.body.dbas }
      findwonChargebacks['dba'] = { $in: req.body.dbas }
      findinProcessChargebacks['dba'] = { $in: req.body.dbas }
      findopenCases['dba'] = { $in: req.body.dbas }
      findclosedCases['dba'] = { $in: req.body.dbas }
      findurgentActionRequired['dba'] = { $in: req.body.dbas }
      findexpired['dba'] = { $in: req.body.dbas }
      findethoca['dba'] = { $in: req.body.dbas }
      findrdr['dba'] = { $in: req.body.dbas }
    }
    // if(!req.body.dbas==='all') {
    //   findChargebackData['dba'] = req.body.dbas
    //   findwonChargebacks['dba'] = req.body.dbas
    //   findinProcessChargebacks['dba'] = req.body.dbas
    //   findopenCases['dba'] = req.body.dbas
    //   findclosedCases['dba'] = req.body.dbas
    //   findurgentActionRequired['dba'] = req.body.dbas
    //   findexpired['dba'] = req.body.dbas
    //   findethoca['dba'] = req.body.dbas
    //   findrdr['dba'] = req.body.dbas
    // }
    client = await Client.find().sort({ _id: -1 });
    merchant = await Merchant.find(findMerchants).sort({ _id: -1 });
    dba = await DBA.find(findDbas).sort({ _id: -1 });
    chargebacks = await Chargebacks.find(findChargebackData).sort({ _id: -1 });
    // console.log('chargebacksIf', chargebacks,findChargebackData)
    wonChargebacks = await Chargebacks.find(findwonChargebacks);
    inProcessChargebacks = await Chargebacks.find(findinProcessChargebacks);
    openCases = await Chargebacks.find(findopenCases);
    urgentActionRequired = await Chargebacks.find(findurgentActionRequired)
    closedCases = await Chargebacks.find(findclosedCases)
    expired = await Chargebacks.find(findexpired)
    ethoca = await Ethoca.find(findethoca).sort({ _id: -1 });
    rdr = await Rdr.find(findrdr).sort({ _id: -1 });

  }
  // console.log('wonChargebacks,inProcessChargebacks,openCases,urgentActionRequired,closedCases,expired',wonChargebacks,inProcessChargebacks,openCases,urgentActionRequired,closedCases,expired)
  
  // console.log("openCases,urgentActionRequired",openCases,urgentActionRequired)
  // Find out the number of CB's per DBA
  const numberOfDBA = chargebacks.map((i) => i.dba).filter((i) => i !== '' && i !== null && i !== undefined)
  const DBAData = {}
  const removedDuplicatsDBA = [...new Set(numberOfDBA)]
  for (let i = 0; i < removedDuplicatsDBA.length; i++) {
    DBAData[removedDuplicatsDBA[i]] = chargebacks.filter((obj) => obj.dba === removedDuplicatsDBA[i]).length
  }
  // console.log('DBAData', DBAData,numberOfDBA)
  const topFiveDBA = pickHighest(DBAData, 5)
  const topFiveDBAData = []
  for (let key in topFiveDBA) {
    topFiveDBAData.push({ name: key, Quantity: topFiveDBA[key] })
  }
  // Find out chargebacks as per country


  // console.log('chargebacks',chargebacks)
  const numberOfCountry = chargebacks.map((i) => i.country).filter((i) => i !== '' && i !== null && i !== undefined)
  // console.log('numberOfCountry',numberOfCountry)

  const countryData = {}
  const removedDuplicats = [...new Set(numberOfCountry)]
  for (let i = 0; i < removedDuplicats.length; i++) {
    countryData[removedDuplicats[i]] = chargebacks.filter((obj) => obj.country === removedDuplicats[i]).length
  }
  // console.log("countryData",countryData)


  // Find out number of cb_code 


  const numberOfCode = chargebacks.map((i) => i.cb_code).filter((i) => i !== '' && i !== null && i !== undefined)
  const codeData = {}
  const removedDuplicatsCode = [...new Set(numberOfCode)]
  for (let i = 0; i < removedDuplicatsCode.length; i++) {
    codeData[removedDuplicatsCode[i]] = chargebacks.filter((obj) => obj.cb_code === removedDuplicatsCode[i]).length
  }

  const topCode = pickHighest(codeData, 5)
  const topCodeData = []
  for (let key in topCode) {
    topCodeData.push({ name: `Code ${key}`, Quantities: topCode[key] })
  }
  //  console.log('topCode',topCode)
  // find out the all DBA in ethoca and RDR alerts

  const totalCB = chargebacks.length
  const projectedSavings = Number(inProcessChargebacks.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0) * (65 / 100)).toFixed(2)
  const savedRevenue = Number(wonChargebacks.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0)).toFixed(2)
  const Percentage = {
    totalStatus: chargebacks.length,
    expired: expired.length
  }
  // Lost Revenue & Fines: (sum of amount of chargeback with status "expired") + (sum of number of chargebacks with all status) * 35.00 (two decimals and symbol $)
  const lostRevenueAndFines = Number(expired.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0) + (chargebacks.length * 35.00)).toFixed(2)

  //  Total Cases: sum of chargebacks with status "closed"
  const TotalClosedCases = closedCases.length
  
  // Urgent Action Required: Sum of chargebacks with status "due
  const totalUrgentActionRequired = urgentActionRequired.length

  // Potential Revenue Loss: Sum of amount on chargebacks with status " open" and "due"
  const potentialRevenueLoss = Number(openCases.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0)
                                      + urgentActionRequired.map((i) => i.amount).reduce((total, num) => total + parseInt(num), 0)
                                      ).toFixed(2)
  // console.log('potentialRevenueLoss',potentialRevenueLoss)
  // Open Cases: Sum of chargebacks with status "open"
  const totalOpencases = openCases.length

  // In Process: Sum of chargebacks with status "in process
  const totalInprocess = inProcessChargebacks.length

  // Revenue Savings: Sum of chargebacks with status "won" (two decimals and symbol $)
  const totalWonChargebacks = wonChargebacks.length

  // Cases Won: Sum of chargebacks with status "won"
  const casesWon = wonChargebacks.length

  // Avoided Fines : Sum of RDR + ETHOCA alerts * 35.00 (two decimals and symbol $)
  const avoidedFines = Number(ethoca.length + (rdr.length * 35.00)).toFixed(2)

  // Avoided Chargebacks: Sum of RDR + ETHOCA alerts
  const avoidedChargebacks = ethoca.length + rdr.length
  //   console.log("wonChargebacks",wonChargebacks,totalWonChargebacks)
  // console.log("object",typeof savedRevenue,typeof avoidedFines,typeof projectedSavings,typeof lostRevenueAndFines,typeof potentialRevenueLoss);
  // const sR = parseFloat(new Intl.NumberFormat('en-IN').format(savedRevenue)).toFixed(2)
  // const aV = parseFloat(new Intl.NumberFormat('en-IN').format(avoidedFines)).toFixed(2)
  // const pS = parseFloat(new Intl.NumberFormat('en-IN').format(projectedSavings)).toFixed(2)
  // const lR = parseFloat(new Intl.NumberFormat('en-IN').format(lostRevenueAndFines)).toFixed(2)
  const sR = new Intl.NumberFormat('en-IN').format(savedRevenue)
  const aV = new Intl.NumberFormat('en-IN').format(avoidedFines)
  const pS = new Intl.NumberFormat('en-IN').format(projectedSavings)
  const lR = new Intl.NumberFormat('en-IN').format(lostRevenueAndFines)
  const pL = new Intl.NumberFormat('en-IN').format(potentialRevenueLoss)

  // console.log('PL',pL)
  const monthlyData = []

  // savedRevenueMonthly for charts
  const savedRevenueMonthly = {}

  wonChargebacks.map((i, j) => {
    let createdAt = new Date(i.createdAt)
    let d = createdAt.getMonth() + 1 < 10 ? '0' + (createdAt.getMonth() + 1).toString() : (createdAt.getMonth() + 1).toString()
    // console.log('d',d)
    if (savedRevenueMonthly[month[d]]) {
      savedRevenueMonthly[month[d]] += parseFloat(i.amount)
    } else {
      savedRevenueMonthly[month[d]] = parseFloat(i.amount)
    }
    // if(d)
  })

  // console.log('wonChargebacks',wonChargebacks)
  // lostRevenueAndFines for charts

  const lostRevenueMonthly = {}

  expired.map((i, j) => {
    let createdAt = new Date(i.createdAt)
    let d = createdAt.getMonth() + 1 < 10 ? '0' + (createdAt.getMonth() + 1).toString() : (createdAt.getMonth() + 1).toString()
    // console.log('d', d)
    if (lostRevenueMonthly[month[d]]) {
      lostRevenueMonthly[month[d]] += parseFloat(i.amount)
    } else {
      lostRevenueMonthly[month[d]] = parseFloat(i.amount)
    }
    // if(d)
  })

  function inverse(obj) {
    var retobj = {};
    for (var key in obj) {
      retobj[obj[key]] = key;
    }
    return retobj;
  }
  let inverseMonth = inverse(month)
  for (let key in inverseMonth) {
    monthlyData.push({
      month: key,
      "Saved Revenue": savedRevenueMonthly[key] ?? 0,
      "Lost Revenue": lostRevenueMonthly[key] ?? 0
    })
  }
  // end of monthly data
  res.status(200).json({
    success: true,
    result: {
      monthlyData: monthlyData,
      RevenueSavings: totalWonChargebacks,
      AvoidedFines: aV,
      AvoidedChargebacks: avoidedChargebacks,
      TotalCB: totalCB,
      InProcess: totalInprocess,
      ProjectedSavings: pS,
      CasesWon: casesWon,
      SavedRevenue: sR,
      OpenCases: totalOpencases,
      UrgentActionRequired: totalUrgentActionRequired,
      PotentialRevenueLoss: pL,
      TotalCases: TotalClosedCases,
      Percentage: Percentage,
      LostRevenueAndFines: lR,
      clients: client,
      merchants: merchant,
      dbas: dba,
      countryData: countryData,
      topCbCode: topCodeData,
      topFiveDBAData: topFiveDBAData
    }
  });

})

