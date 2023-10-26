import { jsPDF } from "jspdf";
import 'jspdf-autotable'
import { convertFormate, dateFormate } from "./helper.js";
import fs from 'fs'

// let logo = '../assets/images/invoice.png'
let logo = fs.readFileSync('../assets/images/invoice.png', { encoding: 'base64' })
let email = fs.readFileSync('../assets/images/email.png', { encoding: 'base64' })
let tableHeader = fs.readFileSync('../assets/images/tableHeader.png', { encoding: 'base64' })
let invoiceFooter = fs.readFileSync('../assets/images/invoiceFooter.png', { encoding: 'base64' })

export const exportInvoicePDF = async (pdfData) => {
    console.log('pdf----------->', pdfData)
    const unit = "px";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 170;
    const doc = new jsPDF(orientation, unit, size, true);

    doc.setFontSize(20);

    const title = "Chargeback Pro Latam";
    const headers = [["ITEM DESCRIPTION", "QTY", "PRICE", "TOTAL"]];
    const totalRdr1Price = parseInt(pdfData.numberOfTier1) * parseInt(pdfData.rdrTier1Price)
    const totalRdr2Price = parseInt(pdfData.numberOfTier2) * parseInt(pdfData.rdrTier2Price)
    const totalRdr3Price = parseInt(pdfData.numberOfTier3) * parseInt(pdfData.rdrTier3Price)
    const totalEthocaPrice = parseInt(pdfData.numberOfEthoca) * parseInt(pdfData.ethocaPrice)
    const subTotal = convertFormate(parseFloat(pdfData.amount) + parseFloat(pdfData.clientId.monthlyMinimumFees))
    const data = [
        ['MONTHLY MIN','' ,'$' + convertFormate(parseInt(pdfData.clientId.monthlyMinimumFees)), '$' + convertFormate(parseInt(pdfData.clientId.monthlyMinimumFees))],
        
    ]
    if (pdfData.numberOfTier1) {
        data.push(['RDR ALERTS TIER 1', pdfData.numberOfTier1, '$' + convertFormate(pdfData.rdrTier1Price), "$" + convertFormate(totalRdr1Price)])
    }
    if(pdfData.numberOfTier2){
        data.push(['RDR ALERTS TIER 2', pdfData.numberOfTier2, '$' + convertFormate(pdfData.rdrTier2Price), "$" + convertFormate(totalRdr2Price)])
    }
    if(pdfData.numberOfTier3){
        data.push(['RDR ALERTS TIER 3', pdfData.numberOfTier3, '$' + convertFormate(pdfData.rdrTier3Price ?? 0 ), "$" + convertFormate(totalRdr3Price ?? 0)])
    }
    if(pdfData.numberOfEthoca){
        data.push(['ETHOCA ALERTS', pdfData.numberOfEthoca, '$' + convertFormate(pdfData.ethocaPrice ?? 0), "$" + convertFormate(totalEthocaPrice)])
    }
    let content = {
        startY: 220,
        head: headers,
        body: data,
        showHead: false,
        tableWidth: 370,
        margin: { left: 50 },
        styles: {
            vAlign: "justify",
            hAlign: 'center',
            fillColor: '#fff',
            // lineWidth: 1,
            lineColor: 'black',
            fontSize: 10,
            minCellHeight: 10,
            minCellWidth: 'auto',
            // fontStyle:'normal',
            cellPadding: { top: 5, left: 7, bottom: 5 }
        },
        // headStyles: {
        //     fillColor: '#3f4554',
        //     fontSize: 10,
        //     fontWeight: 900,
        //     lineRadius: 10,
        //   },
        bodyStyles: {
            fillColor: '#fff',
            textColor: '#000',
        },
        alternateRowStyles: {
            fillColor: '#fff',
        },
        columnStyles: {
            0: {
                // fillColor:'#3f4554',
                textColor: '#3f4554',
                cellWidth: 165,
                borderRadius: 10,

            },
            1: {
                // fillColor:'#3f4554',
                textColor: '#3f4554',
                cellWidth: 65
            },
            2: {
                // fillColor:'#3f4554',
                textColor: '#3f4554',
                cellWidth: 65
            },
            3: {
                // fillColor:'#3f4554',
                textColor: '#3f4554',
                cellWidth: 50,
                paddingLeft: 10,
            }
        }
        //   html: '#my-table' 
    };
    // doc.text(title, marginLeft, 30);
    doc.addImage(logo, "PNG", 0, 0, 450, 100, '', 'FAST');
    // doc.setLineWidth(0.3);
    // doc.line(55, 75, 395, 75);helvetica
    doc.setFont("helvetica", 'bold');
    doc.setFontSize(10);
    doc.text("COMPANY:", 50, 125);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(pdfData.company, 105, 125);
    doc.setFont("helvetica", 'bold');
    doc.text("ATT:", 50, 145);
    doc.setFont("helvetica", 'normal');
    doc.text("", 105, 145);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Invoice No:", 280, 125);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${pdfData.invoiceNumber}`, 340, 125);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Period:", 280, 137);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(pdfData.paymentTerms, 340, 137);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Invoice Date:", 280, 149);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(dateFormate(pdfData.createdAt, 'YYYY-MM-DD') ?? "", 340, 149);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Due Date:", 280, 161);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(dateFormate(pdfData.dueDate, 'YYYY-MM-DD') ?? '', 340, 161);
    // table header image
    doc.addImage(tableHeader, "PNG", 40, 180, 360, 40, '', 'FAST'),
        doc.autoTable(content)
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("SUB TOTAL", 280, 350);
    doc.text("$" + subTotal, 355, 350);
    doc.text("ADJUSTMENTS", 265, 370);
    doc.text("$ 00.00 ", 355, 370);
    doc.setLineWidth(0.3);
    doc.line(250, 380, 395, 380);
    doc.text("TOTAL", 300, 390);
    doc.text("$" + subTotal, 355, 390);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Payment Method:", 50, 410);
    doc.setLineWidth(0.2);
    doc.line(50, 411, 122, 411);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Payment (Via Wire Transfer)", 50, 422);
    doc.setFont("helvetica", "bold");
    doc.text('Name on account:', 50, 435)
    doc.setFont("helvetica", "normal");
    doc.text("Innova Tech Marketplace Services", 110, 435);
    doc.setFont("helvetica", "bold");
    doc.text("Bank Institution:", 50, 445);
    doc.setFont("helvetica", "normal");
    doc.text("Banco LAFISE Panama", 105, 445);
    doc.setFont("helvetica", "bold");
    doc.text("Account Number:", 50, 455);
    doc.setFont("helvetica", "normal");
    doc.text("201020008855 - Checkings Account", 110, 455);
    doc.setFont("helvetica", "bold");
    doc.text("SWIFT:", 50, 465);
    doc.setFont("helvetica", "normal");
    doc.text("BCCEPAPA", 80, 465);
    doc.setFont("helvetica", "bold");
    doc.text("Address:", 50, 475);
    doc.setFont("helvetica", "normal");
    doc.text(" Paitilla, Calle Italia, Bal Harbour Ofc M41, Ciudad de Panamá, Republica de Panama ", 80, 475);
    // doc.addImage(phone, "PNG", 50, 480, 18, 18,'','FAST');
    // doc.text("+123-456-7890", 75, 490);
    doc.addImage(email, "PNG", 50, 485, 18, 18, '', 'FAST');
    doc.setFontSize(10);
    doc.text("info@chargebackprolatam.com", 70, 495);

    // doc.addImage(signature, "PNG", 300, 420, 100, 100,'','FAST');

    var pageSize = doc.internal.pageSize
    var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
    // doc.text("str", 0, pageHeight - 10)
    doc.addImage(invoiceFooter, "PNG", 0, pageHeight - 100, 450, 100, '', 'FAST');

    // doc.addPage(); // add new page
    var dataurlstring = doc.output('dataurlstring');
    // console.log("url", dataurlstring);
    return dataurlstring
}

// let data = {
//     amount: "205",
//     clientId: {
//         company: "charg-innova",
//         createdAt: "2023-09-06T21:51:11.294Z",
//         email: "google@gmail.com",
//         ethocaPrice: "42",
//         invoiceEmail: "ase@gmail.com",
//         isActive: true,
//         isDelete: false,
//         monthlyMinimumFees: "25",
//         name: "Google",
//         paymentTerms: "Weekly Net 3",
//         phoneNumber: "7654433222",
//         rdrPrice: "23",
//         rdrTier1Price: "121",
//         rdrTier2Price: "7",
//         rdrTier3Price: "1",
//         rdrTierPrice: "12",
//         updatedAt: "2023-10-09T18:54:14.745Z",
//         __v: 0,
//         _id: "64f8f44f02c986ee7918d880"
//     },
//     createdAt: "2023-10-17T19:56:45.798Z",
//     dueAmount: "0",
//     dueDate: "2023-10-19T00:00:00.000Z",
//     ethocaPrice: "42",
//     id: "652ee6fdcd2e074f17389fba",
//     isDelete: false,
//     isEmailSent: false,
//     numberOfEthoca: "2",
//     numberOfTier1: "1",
//     numberOfTier2: "0",
//     numberOfTier3: "0",
//     paymentTerms: "Weekly Net 3",
//     rdrTier1Price: "121",
//     rdrTier2Price: "7",
//     rdrTier3Price: "1",
//     status: "Issued",
//     updatedAt: "2023-10-17T19:56:45.798Z",
//     __v: 0,
//     _id: "652ee6fdcd2e074f17389fba",
// }

// exportInvoicePDF(data)