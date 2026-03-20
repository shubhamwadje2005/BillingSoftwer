const PDFDocument = require("pdfkit");

const CustomergeneratePdf = (bill, res) => {
    // A4 size page
    const doc = new PDFDocument({ size: "A4", margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=receipt-${bill._id}.pdf`
    );

    doc.pipe(res);

    /* ================= HEADER (Dark Background) ================= */
    doc.rect(0, 0, doc.page.width, 140).fill("#1f2937");

    doc
        .fillColor("#ffffff")
        .fontSize(24)
        .font("Helvetica-Bold")
        .text(bill.createdBy.branchName || 'N/A', 0, 40, { align: "center" });
    // .text("MAITARI MENSWEAR", 0, 40, { align: "center" });

    doc.fontSize(12).font("Helvetica").text("Cash Receipt", { align: "center" });

    doc
        .fontSize(10)
        .fillColor("#d1d5db")
        .text(`Date: ${new Date(bill.createdAt).toLocaleString()}`, {
            align: "center",
        });

    doc.moveDown(4);

    /* ================= CUSTOMER INFO BOX ================= */
    let currentY = 160;
    doc.roundedRect(40, currentY, 515, 70, 8).fill("#f9fafb");

    doc.fillColor("#6b7280").fontSize(10).font("Helvetica");
    doc.text("Customer Name", 60, currentY + 15);
    doc.text("Phone", 420, currentY + 15);

    doc.fillColor("#000").fontSize(12).font("Helvetica-Bold");
    doc.text(bill.customerName.charAt(0).toUpperCase() + bill.customerName.slice(1), 60, currentY + 35);
    doc.text(bill.customerPhone || "N/A", 420, currentY + 35);

    currentY += 90;

    /* ================= ITEMS SECTION ================= */
    const itemBoxHeight = (bill.items.length * 65) + 40;
    doc.roundedRect(40, currentY, 515, itemBoxHeight, 8).fill("#f9fafb");

    doc.fillColor("#000").fontSize(13).font("Helvetica-Bold").text("Items", 60, currentY + 15);
    doc.text("Price", 480, currentY + 15, { width: 50, align: "right" });

    let itemY = currentY + 45;

    bill.items.forEach((item, index) => {
        const itemTotal = item.quantity * item.price;

        // Product Name and Price
        doc.fillColor("#000").fontSize(11).font("Helvetica-Bold");
        doc.text(item.productName, 60, itemY);
        // Note: PDFKit standard fonts may need '₹' symbol or unicode
        doc.text(`Rs ${item.price}`, 480, itemY, { width: 50, align: "right" });

        // Item Details (Qty, Size, Color)
        doc.fillColor("#6b7280").fontSize(9).font("Helvetica");
        const details = `Qty: ${item.quantity || "N/A"} | Size: ${item.size || "N/A"} | Color: ${item.color || "N/A"}`;
        doc.text(details, 60, itemY + 18);
        doc.text(`Total: Rs ${itemTotal}`, 480, itemY + 18, { width: 50, align: "right" });

        itemY += 55;

        // Separator Line
        if (index !== bill.items.length - 1) {
            doc.moveTo(60, itemY - 10).lineTo(535, itemY - 10).lineWidth(0.5).strokeColor("#e5e7eb").stroke();
        }
    });

    currentY += itemBoxHeight + 20;

    /* ================= TOTALS SECTION ================= */
    doc.roundedRect(40, currentY, 515, 150, 8).fill("#f9fafb");

    const renderRow = (label, value, y, color = "#000", isBold = false) => {
        doc.fillColor(color).fontSize(isBold ? 14 : 11).font(isBold ? "Helvetica-Bold" : "Helvetica");
        doc.text(label, 60, y);
        doc.text(value, 450, y, { width: 80, align: "right" });
    };

    let totalY = currentY + 20;
    // renderRow("Sub Total", `Rs ${bill.subTotal}`, totalY);
    // renderRow("Discount", `- Rs ${bill.discount || 0}`, totalY + 25, "#dc2626");
    renderRow("Sub Total", bill.subTotal ? `Rs ${bill.subTotal}` : "N/A", totalY);
    renderRow("Discount", bill.discount ? `Rs  -${bill.discount || 0}` : "N/A", totalY + 25, "#dc2626");
    renderRow("Tax", bill.tax ? `Rs ${bill.tax}` : "N/A", totalY + 50);

    doc.moveTo(60, totalY + 75).lineTo(535, totalY + 75).lineWidth(1).strokeColor("#e5e7eb").stroke();

    renderRow("Total", `Rs ${bill.totalAmount}`, totalY + 90, "#000", true);

    /* ================= PAYMENT STATUS ================= */
    let footerY = currentY + 160;

    doc.fillColor("#6b7280").fontSize(10).font("Helvetica").text("Payment Method", 60, footerY);
    doc.fillColor("#000").fontSize(12).font("Helvetica-Bold").text(bill.paymentMethod, 60, footerY + 18);

    // Active Status Badge
    doc.roundedRect(480, footerY + 10, 60, 22, 11).fill("#dcfce7");
    doc.fillColor("#16a34a").fontSize(9).text("Active", 480, footerY + 16, { width: 60, align: "center" });

    doc.end();
};

module.exports = CustomergeneratePdf;