// const { chromium } = require('playwright');
import { chromium } from 'playwright';
import reader from 'xlsx'
import RdrAlerts from '../models/rdrAlerts.js';
import mongoose from 'mongoose';
import MerchantAccount from '../models/merchantAccount.js';
// const reader = require('xlsx')

export const dateFormate = (date, formate) => {
    const startDate = new Date(date)
    const startdate = startDate.getDate() < 10 ? '0' + startDate.getDate().toString() : startDate.getDate().toString()
    const startMonth = startDate.getMonth() + 1 < 10 ? '0' + (startDate.getMonth() + 1).toString() : (startDate.getMonth() + 1).toString()
    const startYear = startDate.getFullYear()
    let start_date;
    switch (formate) {
        case 'YYYY-MM-DD':
            start_date = startYear + "-" + startMonth + '-' + startdate
            break;
        case 'MM-DD-YYYY':
            start_date = startMonth + '-' + startdate + "-" + startYear
            break;
        case 'MM/DD/YYYY':
            start_date = startMonth + '/' + startdate + "/" + startYear
            break;
        case 'DD/MM/YYYY':
            start_date = startdate + '/' + startMonth + "/" + startYear
            break;
    }
    return start_date
}
export async function verifyScript() {
    console.log('Starting.....');
    const browser = await chromium.launch({ headless: true, slowMo: 50 });
    const context = await browser.newContext();

    // const pageTwo = await context.newPage();
    const pageOne = await context.newPage();
    await pageOne.goto('https://verifi-one.visa.com/vdm/');
    await pageOne.waitForTimeout(5000);
    await pageOne.fill('input#orgId', 'chargebackprolatamincpid');
    await pageOne.fill('input#username', 'atiurrahman');
    await pageOne.fill('input#password', 'Atiur123!');
    await pageOne.click('button[type=submit]');
    await pageOne.click('button#emailButton')
    // get code
    const pageTwo = await context.newPage();
    await pageTwo.goto('https://bh8940.banahosting.com:2096/cpsess9177531799/3rdparty/roundcube/index.php?_task=mail&_mbox=INBOX');
    await pageTwo.waitForTimeout(5000);
    await pageTwo.fill('input#user', 'atiur@chargebackprolatam.com');
    await pageTwo.fill('input#pass', 'Panama2023!');
    await pageTwo.click('button#login_submit');
    await pageTwo.waitForTimeout(100000);
    // await pageTwo.click('a#rcmbtn115')
    await pageTwo.reload()
    await pageTwo.waitForTimeout(5000);
    await pageTwo.waitForSelector('#messagelist')
    let table = await pageTwo.locator('#messagelist').locator('tbody tr').first().click()
    await pageTwo.waitForTimeout(3000);
    let frm = pageTwo.frameLocator('iframe#messagecontframe')

    let txt = await frm.locator('div.rcmBody').textContent()
    let code = txt.split('.')[0]
    console.log('txt', code.substr(code.length - 8))
    await pageOne.fill('input#passcodeField', code.substr(code.length - 8));
    await pageOne.click('button#submitPasscodeButton');
    await pageOne.waitForTimeout(3000)
    await pageOne.goto('https://verifi-one.visa.com/vdm/app/vdmCaseActivity');
    try {
        console.log("Try Starting.....");
        await pageOne.waitForSelector('//*[@id="main"]/div[2]/div[1]/div[1]/div/div/div/div[2]/div[1]/div/div[4]/div/div[1]/div/div/div/button');
        await pageOne.click('//*[@id="main"]/div[2]/div[1]/div[1]/div/div/div/div[2]/div[1]/div/div[4]/div/div[1]/div/div/div/button')
        await pageOne.waitForSelector('#custom-list-item-0-5');

        await pageOne.click('#custom-list-item-0-5');
        await pageOne.waitForSelector("//html/body/div[1]/div[2]/div/main/div[2]/div[1]/div[1]/div/div/div/div[2]/div[3]/div/fieldset/div/div[2]/div/div/div[1]/div/div[1]/div/div/div/div/input");

        await pageOne.fill('//html/body/div[1]/div[2]/div/main/div[2]/div[1]/div[1]/div/div/div/div[2]/div[3]/div/fieldset/div/div[2]/div/div/div[1]/div/div[1]/div/div/div/div/input', dateFormate(new Date(), 'MM/DD/YYYY'))
        await pageOne.dblclick('#main > div:nth-child(3) > div:nth-child(1) > div.css-6x9632-CSS-CSS > div > div > div > div.css-zn1cdn-structPadding-structPadding-structPadding > div > div > button.vds-btn-text--primary.css-118k6bc-smallViewportStyles-highContrastStyles-highContrastStyles-structMargin-structMargin')

        await pageOne.waitForSelector('//*[@id="template-main"]/div/div[1]/div[2]/div/button');
        await pageOne.waitForTimeout(1000); // Add a delay here if necessary
        await pageOne.click('//*[@id="template-main"]/div/div[1]/div[2]/div/button');
        await pageOne.waitForSelector('//*[@id="react-aria-modal-dialog"]/div/div[3]/div/div/div/button[1]');
        await pageOne.waitForTimeout(1000); // Add a delay here if necessary
        await pageOne.click('//*[@id="react-aria-modal-dialog"]/div/div[3]/div/div/div/button[1]');
        await pageOne.on('download', async (download) => {
            await download.saveAs('verifyData.xlsx')
            download.path().then(async (res) => {
                // Reading our test file
                const file = reader.readFile('./verifyData.xlsx')

                let data = []
                const sheets = file.SheetNames

                for (let i = 0; i < sheets.length; i++) {
                    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
                    temp.forEach((res) => {
                        data.push(res)
                    })
                }

                // Printing data
                // console.log("data", data)
                let mappedData = []
                await mongoose.connect('mongodb+srv://testUser:test123@cluster0.bq15jz4.mongodb.net/?retryWrites=true&w=majority').then(() => console.log("db connected"));

                for (let i = 0; i < data.length; i++) {
                    const merchantAccountDetail = await MerchantAccount.find({ dba: data?.[i]?.['Descriptor/SE Number'] })
                    // console.log("mad", merchantAccountDetail)
                    if (merchantAccountDetail.length > 0) {
                        mappedData.push({
                            clientId: merchantAccountDetail?.[0]?.clientId,
                            merchantId: merchantAccountDetail?.[0]?.merchantId,
                            merchantAccountId: merchantAccountDetail?.[0]._id,
                            caseID: data?.[i]?.['Case ID'],
                            caseReceivedDate: data?.[i]?.['Case Received Date'],
                            status: data?.[i]?.['Status'],
                            statusCode: data?.[i]?.['Status Code'],
                            caseCurrencyCode: data?.[i]?.['Case Currency Code'],
                            caseAmount: data?.[i]?.['Case Amount'],
                            descriptorContact: data?.[i]?.['Descriptor Contact'],
                            caseAge: data?.[i]?.['Case Age'],
                            tier: 'rdrTier' + merchantAccountDetail?.[0]?.rdrTier,
                            createdAt: new Date(data?.[i]?.['Case Received Date'])
                        })
                    }
                }
                // console.log('mappedData', mappedData)
                if (mappedData.length > 0) {
                    await RdrAlerts.insertMany(mappedData).then(function () {
                        console.log("Data inserted")  // Success
                    }).catch(function (error) {
                        console.log('rdrError', error)      // Failure
                    });
                }


            }).catch((error) => {
                console.log("error", error)
            })
        }
        )

        // Wait for the download to complete
        await pageOne.waitForTimeout(5000);

        return true;
    } catch (error) {
        console.log('Error:', error);
        return false;
    }
    finally {
        await browser.close();
    }
}
verifyScript()


