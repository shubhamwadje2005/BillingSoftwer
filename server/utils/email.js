const nodemailer = require("nodemailer")

exports.sendEmail = ({ to, subject, html, text }) => new Promise((resolve, reject) => {
    try {
        const transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
            }
        })

        const cleanTo = (to || "").trim().toLowerCase()

        transport.sendMail({
            from: `"Shubham Wadje" <${process.env.EMAIL}>`,
            to: cleanTo,
            replyTo: process.env.EMAIL,
            subject: subject,
            priority: "high",
            headers: {
                "X-Priority": "1",
                "X-MSMail-Priority": "High",
                "Importance": "high"
            },
            text: text || "Your account has been successfully created.",
            html: html
        }, (err, info) => {
            if (err) {
                console.error("Email send error:", err.message)
                return reject(err)
            }
            resolve(info)
        })
    } catch (error) {
        console.error("Nodemailer setup error:", error.message)
        reject(error)
    }
})