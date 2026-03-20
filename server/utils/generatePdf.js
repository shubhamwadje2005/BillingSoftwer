// const PDFDocument = require("pdfkit");
// const axios = require("axios");

// const generateBillPDF = async (bill, res) => {
//     const doc = new PDFDocument({ size: "A4", margin: 40 });

//     res.setHeader("Content-Type", "application/pdf");
//     res.setHeader("Content-Disposition", `attachment; filename=${bill.companyName || "bill"}.pdf`);

//     doc.pipe(res);

//     try {
//         // --- 1. HEADER (Dark Blue) ---
//         doc.rect(0, 0, 595, 120).fill("#1e293b");
//         doc.fillColor("white")
//             .fontSize(24).font("Helvetica-Bold").text(bill.companyName || "shubhagi inter prijes", 0, 40, { align: "center" })
//             .fontSize(12).font("Helvetica").text(bill.companycontact || "9658485968", 0, 75, { align: "center" });

//         // --- 2. PRODUCT & AMOUNT BOXES ---
//         let currentY = 150;

//         // Product Type
//         doc.roundedRect(50, currentY, 500, 60, 10).fill("#eff6ff");
//         doc.fillColor("#3b82f6").fontSize(10).text("Product Type", 70, currentY + 15);
//         doc.fillColor("#1e40af").fontSize(16).font("Helvetica-Bold").text(bill.productType || "cloth", 70, currentY + 30);

//         currentY += 80;

//         // Total Amount
//         doc.roundedRect(50, currentY, 500, 60, 10).fill("#f0fdf4");
//         doc.fillColor("#22c55e").fontSize(10).text("Total Amount", 70, currentY + 15);
//         doc.fillColor("#15803d").fontSize(18).font("Helvetica-Bold").text(`Rs. ${bill.allProducttotalamout || "54,000"}`, 70, currentY + 30);

//         currentY += 100;

//         // --- 3. IMAGES SECTION (Responsive Grid) ---
//         doc.fillColor("#374151").fontSize(14).font("Helvetica-Bold").text("Bill Images", 50, currentY);
//         currentY += 30;

//         let imgX = 50;
//         const imgSize = 130; // इमेजचा आकार
//         const gap = 20;      // दोन इमेजमधील अंतर
//         const maxWidth = 500; // पेजची वापरण्यायोग्य रुंदी

//         if (bill.billphoto && Array.isArray(bill.billphoto)) {
//             for (let i = 0; i < bill.billphoto.length; i++) {

//                 // जर इमेज उजव्या बॉर्डरच्या बाहेर जात असेल, तर नवीन ओळीवर या (Responsive Logic)
//                 if (imgX + imgSize > maxWidth + 50) {
//                     imgX = 50;
//                     currentY += imgSize + gap;
//                 }

//                 // जर पेज संपत आले असेल तर नवीन पेज उघडा
//                 if (currentY + imgSize > 750) {
//                     doc.addPage();
//                     currentY = 50;
//                     imgX = 50;
//                 }

//                 try {
//                     const response = await axios.get(bill.billphoto[i], { responseType: 'arraybuffer', timeout: 8000 });
//                     const buffer = Buffer.from(response.data, 'binary');

//                     // इमेज ड्रॉ करणे (Fit आणि Center)
//                     doc.image(buffer, imgX, currentY, {
//                         fit: [imgSize, imgSize],
//                         align: 'center',
//                         valign: 'center'
//                     });

//                     // इमेजला बॉर्डर
//                     doc.rect(imgX, currentY, imgSize, imgSize).lineWidth(0.5).strokeColor("#d1d5db").stroke();

//                 } catch (err) {
//                     // इमेज लोड झाली नाही तर राखाडी डब्बा दाखवा
//                     doc.rect(imgX, currentY, imgSize, imgSize).fill("#f3f4f6");
//                     doc.fillColor("#9ca3af").fontSize(8).text("Image Error", imgX + 30, currentY + 60);
//                 }

//                 imgX += imgSize + gap; // पुढच्या इमेजसाठी X पोझिशन वाढवा
//             }
//         }

//         // --- 4. FOOTER ---
//         doc.fillColor("#9ca3af").fontSize(10).text("Generated via Billing System", 50, doc.page.height - 50);

//     } catch (mainErr) {
//         console.error("PDF Error:", mainErr);
//     }

//     doc.end();
// };

// module.exports = generateBillPDF;

const PDFDocument = require("pdfkit");
const axios = require("axios");

const generateBillPDF = async (bill, res) => {
    const doc = new PDFDocument({ size: "A4", margin: 40 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${bill.companyName || "bill"}.pdf`
    );

    doc.pipe(res);

    try {
        /* ================= HEADER ================= */
        doc.rect(0, 0, 595, 120).fill("#1f2937");

        doc
            .fillColor("#ffffff")
            .font("Helvetica-Bold")
            .fontSize(24)
            .text(bill.companyName || "shubhagi inter prijes", 0, 40, {
                align: "center",
            });

        doc
            .fillColor("#cbd5e1")
            .fontSize(12)
            .text(bill.companycontact || "9658485968", 0, 75, {
                align: "center",
            });

        let y = 150;

        /* ================= PRODUCT TYPE ================= */
        doc.roundedRect(50, y, 495, 70, 16).fill("#e0edff");

        doc
            .fillColor("#2563eb")
            .fontSize(12)
            .font("Helvetica-Bold")
            .text("Product Type", 80, y + 18);

        doc
            .fillColor("#1e40af")
            .fontSize(18)
            .text(bill.productType || "cloth", 80, y + 40);

        y += 95;

        /* ================= TOTAL AMOUNT ================= */
        doc.roundedRect(50, y, 495, 70, 16).fill("#dcfce7");

        doc
            .fillColor("#15803d")
            .fontSize(12)
            .font("Helvetica-Bold")
            .text("Total Amount", 80, y + 18);

        doc
            .fillColor("#166534")
            .fontSize(20)
            .font("Helvetica-Bold")
            .text(`Rs. ${bill.allProducttotalamout || "54000"}`, 80, y + 40);

        y += 110;

        /* ================= IMAGES TITLE ================= */
        doc
            .fillColor("#111827")
            .fontSize(14)
            .font("Helvetica-Bold")
            .text("Bill Images", 50, y);

        y += 25;

        /* ================= IMAGES GRID ================= */
        let imgX = 50;
        const imgSize = 130;
        const gap = 20;

        if (Array.isArray(bill.billphoto)) {
            for (let i = 0; i < bill.billphoto.length; i++) {
                if (imgX + imgSize > 545) {
                    imgX = 50;
                    y += imgSize + gap;
                }

                if (y + imgSize > 760) {
                    doc.addPage();
                    y = 50;
                    imgX = 50;
                }

                try {
                    const response = await axios.get(bill.billphoto[i], {
                        responseType: "arraybuffer",
                    });

                    const buffer = Buffer.from(response.data);

                    /* ---- IMAGE COVER INSIDE BOX ---- */
                    doc.save();
                    doc.roundedRect(imgX, y, imgSize, imgSize, 18).clip();

                    doc.image(buffer, imgX, y, {
                        width: imgSize,
                        height: imgSize,
                    });

                    doc.restore();

                    /* ---- BORDER ---- */
                    doc
                        .roundedRect(imgX, y, imgSize, imgSize, 18)
                        .lineWidth(0.8)
                        .strokeColor("#d1d5db")
                        .stroke();
                } catch (err) {
                    /* ---- NO IMAGE BOX ---- */
                    doc.roundedRect(imgX, y, imgSize, imgSize, 18).fill("#f3f4f6");

                    doc
                        .fillColor("#9ca3af")
                        .fontSize(10)
                        .text("No Image", imgX + 35, y + 60);
                }

                imgX += imgSize + gap;
            }
        }

        /* ================= FOOTER ================= */
        doc
            .fillColor("#9ca3af")
            .fontSize(10)
            .text(
                "Generated via Billing System",
                0,
                doc.page.height - 45,
                { align: "center" }
            );
    } catch (err) {
        console.error("PDF ERROR:", err);
    }

    doc.end();
};

module.exports = generateBillPDF;
