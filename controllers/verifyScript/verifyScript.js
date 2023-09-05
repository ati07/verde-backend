// const { chromium } = require('playwright');
import { chromium } from 'playwright';
import reader from 'xlsx'
import RdrAlerts from '../../models/rdrAlerts.js';
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
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    
    // const pageTwo = await context.newPage();
    const pageOne = await context.newPage();
    await pageOne.goto('https://verifi-one.visa.com/vdm/');
    await pageOne.waitForTimeout(5000);
    await pageOne.fill('input#orgId', 'chargebackprolatamincpid');
    await pageOne.fill('input#username', 'atiurrahman');
    await pageOne.fill('input#password', 'Atiur123');
    await pageOne.click('button[type=submit]');
    await pageOne.click('button#emailButton')
    
    // await pageOne.waitForTimeout(5000);
    // get code
    const pageTwo = await context.newPage();
    // await pageTwo.waitForTimeout(20000);
    await pageTwo.goto('https://bh8940.banahosting.com:2096/cpsess9177531799/3rdparty/roundcube/index.php?_task=mail&_mbox=INBOX');
    await pageTwo.waitForTimeout(5000);
    // await page.fill('input#orgId', 'chargebackprolatamincpid');
    await pageTwo.fill('input#user', 'atiur@chargebackprolatam.com');
    await pageTwo.fill('input#pass', 'Panama2023!');
    await pageTwo.click('button#login_submit');
    await pageTwo.waitForTimeout(120000);
    // await pageTwo.click('a#rcmbtn115')
    await pageTwo.reload()
    await pageTwo.waitForTimeout(5000);
    await pageTwo.waitForSelector('#messagelist')
    let table = await pageTwo.locator('#messagelist').locator('tbody tr').first().click()
    // table.locator('tr').first().click()
    // await pageTwo.click('tr.message unread');.locator('tbody tr').first().click()
    await pageTwo.waitForTimeout(3000);
    // await page.waitForSelector('iframe.messagecontframe');
    let frm = pageTwo.frameLocator('iframe#messagecontframe')
  
    let txt = await frm.locator('div.rcmBody').textContent()
    let code = txt.split('.')[0]
    // let txt= await page.locator('//*[@id="message-htmlpart1"]/div/div/table[2]/tbody/tr/td/table/tbody/tr/td/p[2]').innerText()
    console.log('txt',code.substr(code.length - 8))
    await pageOne.fill('input#passcodeField', code.substr(code.length - 8));
    await pageOne.click('button#submitPasscodeButton');
    await pageOne.waitForTimeout(3000)
    await pageOne.goto('https://verifi-one.visa.com/vdm/app/vdmCaseActivity');
    try {
        console.log("Try Starting.....");
        // button.vds-btn-icon.vds-btn-icon--light-tiny.css-1pf6dds
        //*[@id="main"]/div[2]/div[1]/div[1]/div/div/div/div[2]/div[1]/div/div[3]/div/div[1]/div/div/div/button
        await pageOne.waitForSelector('//*[@id="main"]/div[2]/div[1]/div[1]/div/div/div/div[2]/div[1]/div/div[3]/div/div[1]/div/div/div/button');
        await pageOne.click('#main > div:nth-child(3) > div:nth-child(1) > div.css-6x9632-CSS-CSS > div > div > div > div.css-xa13nd-CSS-CSS-structPadding-dark > div.css-1f6bywb-CSS-CSS > div > div:nth-child(3) > div > div:nth-child(1) > div > div > div > button')
        await pageOne.waitForSelector('#custom-list-item-0-5');

        await pageOne.click('#custom-list-item-0-5');
        await pageOne.waitForSelector("//html/body/div[1]/div[2]/div/div[2]/main/div[2]/div[1]/div[1]/div/div/div/div[2]/div[3]/div/fieldset/div/div[2]/div/div/div[1]/div/div[1]/div/div/div/div/input");

        await pageOne.fill('//html/body/div[1]/div[2]/div/div[2]/main/div[2]/div[1]/div[1]/div/div/div/div[2]/div[3]/div/fieldset/div/div[2]/div/div/div[1]/div/div[1]/div/div/div/div/input', dateFormate(new Date(), 'MM/DD/YYYY'))
        await pageOne.dblclick('#main > div:nth-child(3) > div:nth-child(1) > div.css-6x9632-CSS-CSS > div > div > div > div.css-zn1cdn-structPadding-structPadding-structPadding > div > div > button.vds-btn-text--primary.css-118k6bc-smallViewportStyles-highContrastStyles-highContrastStyles-structMargin-structMargin')


        await pageOne.waitForSelector('//*[@id="template-main"]/div/div[1]/div[2]/div/button');
        await pageOne.waitForTimeout(1000); // Add a delay here if necessary
        await pageOne.click('//*[@id="template-main"]/div/div[1]/div[2]/div/button');
        await pageOne.waitForSelector('//*[@id="react-aria-modal-dialog"]/div/div[3]/div/div/div/button[1]');
        await pageOne.waitForTimeout(1000); // Add a delay here if necessary
        await pageOne.click('//*[@id="react-aria-modal-dialog"]/div/div[3]/div/div/div/button[1]');
        // await download.saveAs('newData1.xlsx')
        // await pageOne.on('download', async (download) => {
        //     await download.saveAs('newData1.xlsx')
        //     console.log('Download done.....');
        // });
        await pageOne.on('download', async (download) => {
            await download.saveAs('verifyData.xlsx')
            download.path().then(async (res) => {
                // console.log('res', res)
                // Reading our test file
                const file = reader.readFile('./verifyData.xlsx')

                let data = []
                

                function convertTocamelCase(key) {
                    let newKey = key.replaceAll(' ','')
                    return newKey.charAt(0).toLowerCase() + newKey.slice(1);
                }
                
                
                const sheets = file.SheetNames

                for (let i = 0; i < sheets.length; i++) {
                    const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]])
                    temp.forEach((res) => {
                        newObject = {};
                        for(var camel in res) {
                            newObject[convertTocamelCase(camel)] = original[camel];
                        }
                        data.push(newObject)
                    })
                }

                // Printing data
                console.log("dataverify", data)
                await RdrAlerts.insertMany(data).then(function () {
                    console.log("Data inserted")  // Success
                }).catch(function (error) {
                    console.log(error)      // Failure
                });

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
// export async function verifyScript() {
//     console.log('Starting.....');
//     const browser = await chromium.launch({ headless: true, slowMo: 50 });
//     const context = await browser.newContext();
//     const page = await context.newPage();

//     await page.goto('https://verifi-one.visa.com/vdm/');
//     await page.waitForTimeout(5000);
//     await page.fill('input#orgId', 'chargebackprolatamincpid');
//     await page.fill('input#username', 'jeankra');
//     await page.fill('input#password', 'Panama!2023');
//     await page.click('button[type=submit]');
//     await page.waitForSelector('div.vds-input-bar');
//     await page.waitForTimeout(5000);
//     await page.goto('https://verifi-one.visa.com/vdm/app/vdmCaseActivity');
//     try {
//         console.log("Try Starting.....");
//         // button.vds-btn-icon.vds-btn-icon--light-tiny.css-1pf6dds
//         //*[@id="main"]/div[2]/div[1]/div[1]/div/div/div/div[2]/div[1]/div/div[3]/div/div[1]/div/div/div/button
//         await page.waitForSelector('//*[@id="main"]/div[2]/div[1]/div[1]/div/div/div/div[2]/div[1]/div/div[3]/div/div[1]/div/div/div/button');
//         await page.click('#main > div:nth-child(3) > div:nth-child(1) > div.css-6x9632-CSS-CSS > div > div > div > div.css-xa13nd-CSS-CSS-structPadding-dark > div.css-1f6bywb-CSS-CSS > div > div:nth-child(3) > div > div:nth-child(1) > div > div > div > button')
//         await page.waitForSelector('#custom-list-item-0-5');

//         await page.click('#custom-list-item-0-5');
//         await page.waitForSelector("//html/body/div[1]/div[2]/div/div[2]/main/div[2]/div[1]/div[1]/div/div/div/div[2]/div[3]/div/fieldset/div/div[2]/div/div/div[1]/div/div[1]/div/div/div/div/input");

//         await page.fill('//html/body/div[1]/div[2]/div/div[2]/main/div[2]/div[1]/div[1]/div/div/div/div[2]/div[3]/div/fieldset/div/div[2]/div/div/div[1]/div/div[1]/div/div/div/div/input', dateFormate(new Date(), 'MM/DD/YYYY'))
//         await page.dblclick('#main > div:nth-child(3) > div:nth-child(1) > div.css-6x9632-CSS-CSS > div > div > div > div.css-zn1cdn-structPadding-structPadding-structPadding > div > div > button.vds-btn-text--primary.css-118k6bc-smallViewportStyles-highContrastStyles-highContrastStyles-structMargin-structMargin')


//         await page.waitForSelector('//*[@id="template-main"]/div/div[1]/div[2]/div/button');
//         await page.waitForTimeout(1000); // Add a delay here if necessary
//         await page.click('//*[@id="template-main"]/div/div[1]/div[2]/div/button');
//         await page.waitForSelector('//*[@id="react-aria-modal-dialog"]/div/div[3]/div/div/div/button[1]');
//         await page.waitForTimeout(1000); // Add a delay here if necessary
//         await page.click('//*[@id="react-aria-modal-dialog"]/div/div[3]/div/div/div/button[1]');
//         // await download.saveAs('newData1.xlsx')
//         // await page.on('download', async (download) => {
//         //     await download.saveAs('newData1.xlsx')
//         //     console.log('Download done.....');
//         // });
//         await page.on('download', async (download) => {
//             await download.saveAs('verifyData.xlsx')
//             download.path().then(async (res) => {
//                 // console.log('res', res)
//                 // Reading our test file
//                 const file = reader.readFile('./verifyData.xlsx')

//                 let data = []

//                 const sheets = file.SheetNames

//                 for (let i = 0; i < sheets.length; i++) {
//                     const temp = reader.utils.sheet_to_json(
//                         file.Sheets[file.SheetNames[i]])
//                     temp.forEach((res) => {
//                         data.push(res)
//                     })
//                 }

//                 // Printing data
//                 // console.log("dataverify", data)
//                 await RdrAlerts.insertMany(data).then(function () {
//                     console.log("Data inserted")  // Success
//                 }).catch(function (error) {
//                     console.log(error)      // Failure
//                 });

//             }).catch((error) => {
//                 console.log("error", error)
//             })
//         }
//         )

//         // Wait for the download to complete
//         await page.waitForTimeout(5000);

//         return true;
//     } catch (error) {
//         console.log('Error:', error);
//         return false;
//     }
//     finally {
//         await browser.close();
//     }
// }
// main()
// verifyScript()