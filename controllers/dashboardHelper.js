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
export function inverse(obj) {
    var retobj = {};
    for (var key in obj) {
        retobj[obj[key]] = key;
    }
    return retobj;
}

export const pickHighest = (obj, num = 1) => {
    const requiredObj = {};
    Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, ind) => {
        if (ind < num) {
            requiredObj[key] = obj[key];
        }
    });
    return requiredObj;
};

export const getDisputesPerBrand = (rdrAlerts, ethocaAlerts) => {
    let rdrAlertsPerMonth = {}

    rdrAlerts.map((i, j) => {
        let createdAt = new Date(i.createdAt)
        let d = createdAt.getMonth() + 1 < 10
            ? '0' + (createdAt.getMonth() + 1).toString()
            : (createdAt.getMonth() + 1).toString()

        if (rdrAlertsPerMonth[month[d]]) {
            rdrAlertsPerMonth[month[d]] += 1
        } else {
            rdrAlertsPerMonth[month[d]] = 1
        }
    })

    let ethocaAlertsPerMonth = {}
    ethocaAlerts.map((i, j) => {
        let createdAt = new Date(i.createdAt)
        let d = createdAt.getMonth() + 1 < 10
            ? '0' + (createdAt.getMonth() + 1).toString()
            : (createdAt.getMonth() + 1).toString()

        if (ethocaAlertsPerMonth[month[d]]) {
            ethocaAlertsPerMonth[month[d]] += 1
        } else {
            ethocaAlertsPerMonth[month[d]] = 1
        }
    })
    let monthlyData = []
    let inverseMonth = inverse(month)
    for (let key in inverseMonth) {
     monthlyData.push({
      month: key,
      "Visa Card": rdrAlertsPerMonth[key] ?? 0,
      "Master Card": ethocaAlertsPerMonth[key] ?? 0
    })
    }
    return monthlyData
}

export const merchantAccountsWithAlerts = (merchantAccounts,rdrAlerts,ethocaAlerts)=>{
    // console.log('Alerts',merchantAccounts, rdrAlerts, ethocaAlerts)
    
    let merchantAccountsWithAlerts = {}
    merchantAccounts.map((i,j)=>{

        merchantAccountsWithAlerts[i.dba] = rdrAlerts.filter((r,j)=>String(r.merchantAccountId) === String(i._id) ).length + ethocaAlerts.filter((r,j)=>String(r.merchantAccountId) === String(i._id) ).length
    })
    return merchantAccountsWithAlerts
}

export const top5 = (DBAData)=>{
    // console.log('DBAData',DBAData)
    const topFiveDBA = pickHighest(DBAData, 5)
    const topFiveDBAData = []
    for (let key in topFiveDBA) {
        topFiveDBAData.push({ name: key, Quantities: topFiveDBA[key] ?? 0 })
    }

    return topFiveDBAData
}

export const getDiffDay = (dateOne,dateTwo)=>{
    var date1 = new Date(dateOne);
    var date2 = new Date(dateTwo);
      
    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();
      
    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
      
    //To display the final no. of days (result)
    // console.log("Total number of days between dates  <br>"
    //            + date1 + "<br> and <br>" 
    //            + date2 + " is: <br> " 
    //            + Difference_In_Days);
    return Difference_In_Days
}
