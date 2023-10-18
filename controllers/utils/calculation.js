// import RdrAlerts from '../models/rdrAlerts.js';
import RdrAlerts from "../../models/rdrAlerts.js"
import EthocaAlerts from "../../models/ethocaAlerts.js"
import MerchantAccount from "../../models/merchantAccount.js"

export const getRdrAmounts = async(filter,payload)=>{
    
    let amount=0
    if(filter.merchantAccountId){
      const numberOfRdrAlerts = await RdrAlerts.count(filter)
      amount += (numberOfRdrAlerts * (payload[`rdrTier1Price`] || payload[`rdrTier2Price`] || payload[`rdrTier3Price`]))
      
      return {numberOfRdrAlerts,amount}
    }
    let rdrTier1 = 0
    let rdrTier2 = 0
    let rdrTier3 = 0
    const rdr = await RdrAlerts.find(filter)
    // console.log('rdr',rdr)

    rdr.forEach(( i,j)=>{
        let rM = payload.allMerchantAccounts.filter((m,j)=>String(m._id) === String(i.merchantAccountId))
        // console.log('rm',rM)
        rM.forEach((r,k)=>{
            if(r.rdrTier ==='1'){
                rdrTier1 += 1
            }
            if(r.rdrTier ==='2'){
                rdrTier2 += 1
            }
            if(r.rdrTier ==='3'){
                rdrTier3 += 1
            }
        })
    })
    
    amount += (rdrTier1 * parseInt(payload.rdrTier1Price)) + (rdrTier2 * parseInt(payload.rdrTier2Price)) + (rdrTier3 * parseInt(payload.rdrTier3Price))
    // console.log('cal',amount,rdrTier1,payload.rdrTier1Price, payload.allMerchantAccounts)
    let numberOfRdrAlerts = rdr.length
    return {numberOfRdrAlerts,amount,rdrTier1,rdrTier2,rdrTier3}
}

export const getEthocaAmounts =async(filter,payload)=>{
    const numberOfEthocaAlerts = await EthocaAlerts.count(filter)
    let amount = numberOfEthocaAlerts * parseInt(payload[`ethocaPrice`])
    return {numberOfEthocaAlerts,amount}
}