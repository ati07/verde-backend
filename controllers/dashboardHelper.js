const month = {
    '01': 'JAN',
    '02': 'FEB',
    '03': 'MAR',
    '04': 'APR',
    '05': 'MAY',
    '06': 'JUN',
    '07': 'JUL',
    '08': 'AUG',
    '09': 'SEP',
    '10': 'OCT',
    '11': 'NOV',
    '12': 'DEC'

}
const monthInverse = {
    'JAN': '01',
    'FEB': '02',
    'MAR': '03',
    'APR': '04',
    'MAY': '05',
    'JUN': '06',
    'JUL': '07',
    'AUG': '08',
    'SEP': '09',
    'OCT': '10',
    'NOV': '11',
    'DEC': '12'
}
// const month = {
//     '01': 'January',
//     '02': 'February',
//     '03': 'March',
//     '04': 'April',
//     '05': 'May',
//     '06': 'Jun',
//     '07': 'July',
//     '08': 'August',
//     '09': 'September',
//     '10': 'October',
//     '11': 'November',
//     '12': 'December'

// }
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
    let rdrAlertsYearWisePerMonth = {}
    let rdrAlertsAmountYearWisePerMonth = {}

    rdrAlerts.map((i, j) => {
        let createdAt = new Date(i.createdAt)
        let d = createdAt.getMonth() + 1 < 10
            ? '0' + (createdAt.getMonth() + 1).toString()
            : (createdAt.getMonth() + 1).toString()
        let year = createdAt.getFullYear()

        if (rdrAlertsYearWisePerMonth[year]) {
            if (rdrAlertsYearWisePerMonth[year][month[d]]) {
                rdrAlertsYearWisePerMonth[year][month[d]] += 1
                rdrAlertsAmountYearWisePerMonth[year][month[d]] += parseFloat(i.caseAmount === '' ? 0 : i.caseAmount)
            } else {
                rdrAlertsYearWisePerMonth[year][month[d]] = 1
                rdrAlertsAmountYearWisePerMonth[year][month[d]] = parseFloat(i.caseAmount === '' ? 0 : i.caseAmount)

            }
        } else {
            rdrAlertsYearWisePerMonth[year] = { [month[d]]: 1 }
            rdrAlertsAmountYearWisePerMonth[year] = { [month[d]]: parseFloat(i.caseAmount === '' ? 0 : i.caseAmount) }

        }
        
    })

    let ethocaAlertsYearWisePerMonth = {}
    let ethocaAlertsAmountYearWisePerMonth = {}

    ethocaAlerts.map((i, j) => {
        let createdAt = new Date(i.createdAt)
        let d = createdAt.getMonth() + 1 < 10
            ? '0' + (createdAt.getMonth() + 1).toString()
            : (createdAt.getMonth() + 1).toString()

        let year = createdAt.getFullYear()

        if (ethocaAlertsYearWisePerMonth[year]) {
            if (ethocaAlertsYearWisePerMonth[year][month[d]]) {
                ethocaAlertsYearWisePerMonth[year][month[d]] += 1
                ethocaAlertsAmountYearWisePerMonth[year][month[d]] += parseFloat(i.amount === '' ? 0 : i.amount)
            } else {
                ethocaAlertsYearWisePerMonth[year][month[d]] = 1
                ethocaAlertsAmountYearWisePerMonth[year][month[d]] = parseFloat(i.amount === '' ? 0 : i.amount)

            }
        } else {
            ethocaAlertsYearWisePerMonth[year] = { [month[d]]: 1 }
            ethocaAlertsAmountYearWisePerMonth[year] = { [month[d]]: parseFloat(i.amount === '' ? 0 : i.amount) }

        }

    })
    let monthyDataYearWeise = {}
    let monthyAmountYearWeise = {}
    let monthly = []
    let monthlyAmounts = []

    for(let year in rdrAlertsYearWisePerMonth) {
        for(let key in monthInverse){

            monthly.push({
                month: key,
                "Visa Card": rdrAlertsYearWisePerMonth?.[year]?.[key] ?? 0,
                "Master Card": ethocaAlertsYearWisePerMonth?.[year]?.[key] ?? 0
            })
            monthlyAmounts.push({
                month: key,
                "Visa Card": rdrAlertsAmountYearWisePerMonth?.[year]?.[key] ?? 0,
                "Master Card": ethocaAlertsAmountYearWisePerMonth?.[year]?.[key] ?? 0
            })

        }
        monthyDataYearWeise[year] = monthly
        monthyAmountYearWeise[year] = monthlyAmounts
        monthly = []
        monthlyAmounts = []
    }
    
    return {
        getDisputesPerBrandCount: monthyDataYearWeise,
        getDisputesPerBrandAmounts: monthyAmountYearWeise
    }
}


export const merchantAccountsWithAlerts = (merchantAccounts, rdrAlerts, ethocaAlerts) => {

    let merchantAccountsWithAlerts = {}
    merchantAccounts.map((i, j) => {

        merchantAccountsWithAlerts[i.dba] = rdrAlerts.filter((r, j) => String(r.merchantAccountId) === String(i._id)).length + ethocaAlerts.filter((r, j) => String(r.merchantAccountId) === String(i._id)).length
    })
    const topFiveDBA = pickHighest(merchantAccountsWithAlerts, 5)

    const topFiveDBAData = []
    for (let key in topFiveDBA) {
        topFiveDBAData.push({ name: key, Quantities: topFiveDBA[key] ?? 0 })
    }

    return topFiveDBAData
}

export const top5 = (DBAData) => {
    // console.log('DBAData',DBAData)
    const topFiveDBA = pickHighest(DBAData, 5)
    const topFiveDBAData = []
    for (let key in topFiveDBA) {
        topFiveDBAData.push({ name: key, Quantities: topFiveDBA[key] ?? 0 })
    }

    return topFiveDBAData
}

export const getDiffDay = (dateOne, dateTwo) => {
    var date1 = new Date(dateOne);
    var date2 = new Date(dateTwo);

    // To calculate the time difference of two dates
    var Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    //To display the final no. of days (result)
    return Difference_In_Days
}

export const convertFormate = (number) => {
    let data = new Intl.NumberFormat('en-IN').format(number)
    return data
}
