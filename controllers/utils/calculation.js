// import RdrAlerts from '../models/rdrAlerts.js';
import RdrAlerts from "../../models/rdrAlerts.js"
import EthocaAlerts from "../../models/ethocaAlerts.js"
import MerchantAccount from "../../models/merchantAccount.js"

export const getRdrAmounts = async(filter,payload)=>{
    // console.log('filter',filter)
    console.log('payload',payload)
    let amount = 0
    let rdrTier1 = 0
    let rdrTier2 = 0
    let rdrTier3 = 0
    const rdr = await RdrAlerts.find(filter)
    // console.log('rdr',rdr)
    rdr.forEach((r,k)=>{
        if(r.tier ==='rdrTier1'){
            rdrTier1 += 1
        }
        if(r.tier ==='rdrTier2'){
            rdrTier2 += 1
        }
        if(r.tier ==='rdrTier3'){
            rdrTier3 += 1
        }
    })
    // console.log('rdrTier1 * parseInt(payload.rdrTier1Price',amount,rdrTier1 , parseInt(payload.rdrTier1Price))

    // amount = amount + ((rdrTier1 * parseInt(payload.rdrTier1Price)) + (rdrTier2 * parseInt(payload.rdrTier2Price)) + (rdrTier3 * parseInt(payload.rdrTier3Price)))
    let rdr1p = payload.rdrTier1Price ? rdrTier1 * parseInt(payload.rdrTier1Price):0
    let rdr2p = payload.rdrTier2Price ? rdrTier2 * parseInt(payload.rdrTier2Price):0
    let rdr3p = payload.rdrTier3Price ? rdrTier3 * parseInt(payload.rdrTier3Price):0

    amount += rdr1p
    amount += rdr2p
    amount += rdr3p
    // console.log('cal',amount,rdrTier1,payload.rdrTier1Price, payload.allMerchantAccounts)
    let numberOfRdrAlerts = rdr.length
    console.log('amount,rdrTier1,rdrTier2,rdrTier3',amount,rdr1p,rdr2p,rdr3p,rdrTier1,rdrTier2,rdrTier3)
    return {numberOfRdrAlerts,amount,rdrTier1,rdrTier2,rdrTier3}
}

export const getEthocaAmounts =async(filter,payload)=>{
    const numberOfEthocaAlerts = await EthocaAlerts.count(filter)
    let amount = payload[`ethocaPrice`] ? numberOfEthocaAlerts * parseInt(payload[`ethocaPrice`]):0
    return {numberOfEthocaAlerts,amount}
}