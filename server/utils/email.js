const nodemailer = require("nodemailer");

const createTransporter = () => {
    if (!process.env.EMAIL || !process.env.PASS) {
        throw new Error("EMAIL or PASS environment variables are missing on the server.");
    }

    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // SSL port 465 is the most reliable for serverless/cloud environments
        auth: {
            user: (process.env.EMAIL || "").trim(),
            pass: (process.env.PASS || "").trim().replace(/\s+/g, ""),
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        tls: {
            rejectUnauthorized: false
        }
    });
};

exports.sendEmail = ({ to, subject, html, text }) => new Promise((resolve, reject) => {
    try {
        const transport = createTransporter();
        const cleanTo = (to || "").trim().toLowerCase();

        transport.sendMail({
            from: `"Shubham Wadje" <${(process.env.EMAIL || "").trim()}>`,
            to: cleanTo,
            replyTo: (process.env.EMAIL || "").trim(),
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
                console.error("Email send error:", err.message);
                return reject(err);
            }
            console.log("Email sent successfully to:", cleanTo);
            resolve(info);
        });
    } catch (error) {
        console.error("Nodemailer setup error:", error.message);
        reject(error);
    }
});

exports.verifyEmailConnection = () => new Promise((resolve, reject) => {
    try {
        const transport = createTransporter();
        transport.verify((err, success) => {
            if (err) {
                return reject(err);
            }
            resolve(success);
        });
    } catch (error) {
        reject(error);
    }
});