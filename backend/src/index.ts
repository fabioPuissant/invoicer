import express from 'express';
import bodyParser from 'body-parser';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/generate_invoice', (req, res) => {
    const {
        invoice_date, delivery_date, invoice_number, company_name, company_address,
        company_email, company_phone, recipient_name, recipient_address, description,
        quantity, unit_price, discount, amount_excl_vat, vat_rate, vat_amount, total_amount,
        place_of_invoice, payment_terms
    } = req.body;

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const filename = `invoice_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, filename);

    doc.pipe(fs.createWriteStream(filePath));

    // // Add company logo and information
    // doc.image('path/to/logo.png', 50, 45, { width: 50 })
    //     .fontSize(20)
    //     .text(company_name, 110, 57)
    //     .fontSize(10)
    //     .text(company_address, 110, 72)
    //     .text(company_email, 110, 87)
    //     .text(company_phone, 110, 102)
    //     .moveDown();

    // Invoice title
    doc.fontSize(20).text('INVOICE', 50, 160);

    // Invoice details
    doc.fontSize(10)
        .text(`Invoice Number: ${invoice_number}`, 50, 200)
        .text(`Invoice Date: ${invoice_date}`, 50, 215)
        .text(`Due Date: ${delivery_date}`, 50, 230)
        .moveDown();

    // Billing and Shipping Information
    doc.text(`BILL TO:`, 50, 260)
        .text(`Name: ${recipient_name}`, 50, 275)
        .text(`Address: ${recipient_address}`, 50, 290)
        .moveDown();

    // Add table headers
    const tableTop = 330;
    const itemDescriptionX = 50;
    const itemQuantityX = 270;
    const itemUnitPriceX = 320;
    const itemTotalX = 400;

    doc.fontSize(10)
        .text('DESCRIPTION', itemDescriptionX, tableTop)
        .text('QTY', itemQuantityX, tableTop)
        .text('UNIT PRICE', itemUnitPriceX, tableTop)
        .text('TOTAL', itemTotalX, tableTop)
        .moveDown();

    // Add table rows
    const itemTotal = parseFloat(unit_price) * parseInt(quantity);
    let y = tableTop + 20;

    doc.text(description, itemDescriptionX, y)
        .text(quantity, itemQuantityX, y)
        .text(unit_price, itemUnitPriceX, y)
        .text(itemTotal.toFixed(2), itemTotalX, y);

    // Add total calculations
    y += 20;
    doc.text('Subtotal:', itemTotalX - 80, y)
        .text(amount_excl_vat, itemTotalX, y)
        .text('Discount:', itemTotalX - 80, y + 20)
        .text(discount, itemTotalX, y + 20)
        .text('Tax Rate:', itemTotalX - 80, y + 40)
        .text(vat_rate, itemTotalX, y + 40)
        .text('Tax Amount:', itemTotalX - 80, y + 60)
        .text(vat_amount, itemTotalX, y + 60)
        .text('Total:', itemTotalX - 80, y + 80)
        .text(total_amount, itemTotalX, y + 80);

    // Add payment terms and footer
    doc.text(`Terms & Instructions`, 50, y + 120)
        .text(payment_terms, 50, y + 140)
        .text('Thank you for your business!', 50, y + 160);

    doc.end();

    doc.on('finish', () => {
        res.download(filePath, filename, (err) => {
            if (err) {
                console.error(err);
            }
            fs.unlinkSync(filePath);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
