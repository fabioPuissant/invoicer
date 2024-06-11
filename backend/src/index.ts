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
        place_of_invoice, payment_terms, vat_number, client_number
    } = req.body;

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const filename = `invoice_${Date.now()}.pdf`;
    const filePath = path.join(__dirname, filename);

    doc.pipe(fs.createWriteStream(filePath));

    // Calculate dynamic spacing based on text length
    const addressLines: Array<string> = company_address.split(' ');
    const maxLength = Math.max(
        company_name.length,
        ...addressLines.map(line => line.length),
        company_email.length,
        company_phone.length,
        `VAT Number: ${vat_number}`.length
    );

    // Add extra spacing if the length of any line is more than 30 characters
    const spacing = maxLength > 30 ? 20 : 15;

    // Client Information (moved to left)
    doc.fontSize(10)
       .text(`Name: ${recipient_name}`, 50, 45)
       .text(`Address: ${recipient_address}`, 50, 60)
       .text(`Client Number: ${client_number}`, 50, 75)
       .moveDown();

    // Company Logo and Information (moved to right and adjusted positioning)
    doc.image('src/assets/images/logo.png',  400, 45, { width: 50 })
       .fontSize(20)
       .text(company_name, 460, 45)
       .fontSize(10);

    // Adjust positions dynamically to prevent overlap
    let currentY = 70;
    for (let line of addressLines) {
        doc.text(line, 460, currentY);
        currentY += spacing;
    }
    doc.text(company_email, 460, currentY);
    currentY += spacing;
    doc.text(company_phone, 460, currentY);
    currentY += spacing;
    doc.text(`VAT Number: ${vat_number}`, 460, currentY);

    // Invoice Title and Information
    doc.fontSize(20).text('INVOICE', 50, 160);
    doc.fontSize(10)
       .text(`Invoice Number: ${invoice_number}`, 50, 200)
       .text(`Invoice Date: ${invoice_date}`, 50, 215)
       .text(`Due Date: ${delivery_date}`, 50, 230)
       .moveDown();

    // Add table headers with light blue background
    const tableTop = 260;
    const itemDescriptionX = 50;
    const itemQuantityX = 270;
    const itemUnitPriceX = 320;
    const itemTotalX = 400;

    doc.rect(itemDescriptionX - 2, tableTop - 10, 500, 20).fillOpacity(0.5).fill('#dce6f1').stroke();

    doc.fillColor('#000').fontSize(10)
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
