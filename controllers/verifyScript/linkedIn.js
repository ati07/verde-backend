import { chromium } from 'playwright';
import { parse } from 'node-html-parser';

export async function linkedIn() {
    console.log('Starting.....');
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://www.linkedin.com/uas/login?session_redirect=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2Ffeed%2F&fromSignIn=true&trk=cold_join_sign_in');
    await page.waitForTimeout(5000);
    await page.fill('input#username', 'atiurrahman.ansari@gmail.com');
    await page.fill('input#password', 'rah123@gmail.com');
    await page.click('button[type=submit]');
    await page.waitForTimeout(5000);
    await page.fill('input.search-global-typeahead__input', 'high risk merchants');
    await page.keyboard.press('Enter');
    await page.waitForTimeout(5000);
    // await page.waitForSelector('button.vds-input-bar')
    // await page.getByRole('button').and(page.getByTitle('Companies')).click()
    await page.getByRole('button', { name: 'Companies' }).click()
    await page.isVisible('main.scaffold-layout__main')
    let html = await page.innerHTML('div.search-marvel-srp')
    const parsed = parse(html)
    console.log('parsed', parsed.getElementsByTagName('app-aware-link'))
    // await expect(page.get_by_role("listitem"))
    // const found_elements = await page.locator('//html/body/div[4]/div[3]/div[2]/div/div[1]/main/div/div/div[2]').filter({has:page.getByRole('a')}).getAttribute('href')
    // const found_elements = await page.getByRole('listitem').innerHTML()
    // let link = found_elements.get_attribute('href')
    // console.log('found_elements',found_elements)
    //*[@id="kk7N7wM4RdiXpJJ/RQ8ScQ=="]/div/ul
    // await page.waitForSelector('//*[@id="kk7N7wM4RdiXpJJ/RQ8ScQ=="]/div/ul')
    // console.log("ulTag",await page.getByRole('ul'))

    // await page.getByText('Companies').click()
    // console.log("btn",page.getByRole('button').and(page.getByTitle('Companies')))
    // await page.click('//*[@id="search-reusables__filters-bar"]/ul/li[5]/button')
    //
    // await page.waitForSelector('div.vds-input-bar');
    // await page.waitForTimeout(5000);
    // await page.goto('https://verifi-one.visa.com/vdm/app/vdmCaseActivity');
    // try {
    //     console.log("Try Starting.....");
    //     // button.vds-btn-icon.vds-btn-icon--light-tiny.css-1pf6dds
    //     //*[@id="main"]/div[2]/div[1]/div[1]/div/div/div/div[2]/div[1]/div/div[3]/div/div[1]/div/div/div/button
    //     await page.waitForSelector('//*[@id="main"]/div[2]/div[1]/div[1]/div/div/div/div[2]/div[1]/div/div[3]/div/div[1]/div/div/div/button');
    //     await page.click('#main > div:nth-child(3) > div:nth-child(1) > div.css-6x9632-CSS-CSS > div > div > div > div.css-xa13nd-CSS-CSS-structPadding-dark > div.css-1f6bywb-CSS-CSS > div > div:nth-child(3) > div > div:nth-child(1) > div > div > div > button')
    //     await page.waitForSelector('#custom-list-item-0-5');

    //     await page.click('#custom-list-item-0-5');
    //     await page.waitForSelector("//html/body/div[1]/div[2]/div/div[2]/main/div[2]/div[1]/div[1]/div/div/div/div[2]/div[3]/div/fieldset/div/div[2]/div/div/div[1]/div/div[1]/div/div/div/div/input");

    //     await page.fill('//html/body/div[1]/div[2]/div/div[2]/main/div[2]/div[1]/div[1]/div/div/div/div[2]/div[3]/div/fieldset/div/div[2]/div/div/div[1]/div/div[1]/div/div/div/div/input', dateFormate(new Date(), 'MM/DD/YYYY'))
    //     await page.dblclick('#main > div:nth-child(3) > div:nth-child(1) > div.css-6x9632-CSS-CSS > div > div > div > div.css-zn1cdn-structPadding-structPadding-structPadding > div > div > button.vds-btn-text--primary.css-118k6bc-smallViewportStyles-highContrastStyles-highContrastStyles-structMargin-structMargin')


    //     await page.waitForSelector('//*[@id="template-main"]/div/div[1]/div[2]/div/button');
    //     await page.waitForTimeout(1000); // Add a delay here if necessary
    //     await page.click('//*[@id="template-main"]/div/div[1]/div[2]/div/button');
    //     await page.waitForSelector('//*[@id="react-aria-modal-dialog"]/div/div[3]/div/div/div/button[1]');
    //     await page.waitForTimeout(1000); // Add a delay here if necessary
    //     await page.click('//*[@id="react-aria-modal-dialog"]/div/div[3]/div/div/div/button[1]');
    //     // await download.saveAs('newData1.xlsx')
    //     // await page.on('download', async (download) => {
    //     //     await download.saveAs('newData1.xlsx')
    //     //     console.log('Download done.....');
    //     // });
    //     await page.on('download', async (download) => {
    //         await download.saveAs('verifyData.xlsx')
    //         download.path().then(async (res) => {
    //             // console.log('res', res)
    //             // Reading our test file
    //             const file = reader.readFile('./verifyData.xlsx')

    //             let data = []

    //             const sheets = file.SheetNames

    //             for (let i = 0; i < sheets.length; i++) {
    //                 const temp = reader.utils.sheet_to_json(
    //                     file.Sheets[file.SheetNames[i]])
    //                 temp.forEach((res) => {
    //                     data.push(res)
    //                 })
    //             }

    //             // Printing data
    //             // console.log("dataverify", data)
    //             await Rdr.insertMany(data).then(function () {
    //                 console.log("Data inserted")  // Success
    //             }).catch(function (error) {
    //                 console.log(error)      // Failure
    //             });

    //         }).catch((error) => {
    //             console.log("error", error)
    //         })
    //     }
    //     )

    //     // Wait for the download to complete
    //     await page.waitForTimeout(5000);

    //     return true;
    // } catch (error) {
    //     console.log('Error:', error);
    //     return false;
    // }
    // finally {
    //     await browser.close();
    // }
    // browser.close()
}
linkedIn()