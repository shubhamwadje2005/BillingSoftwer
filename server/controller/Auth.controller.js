const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const { userPhotoUpload } = require("../utils/uploader")
const User = require("../models/User")
const cloud = require("../utils/cloudinary")
const bcrypt = require("bcryptjs")
const { sendEmail, verifyEmailConnection } = require("../utils/email")
const getEmailTemplate = require("../utils/getEmailTemplate")

exports.checkEmailConfig = asyncHandler(async (req, res) => {
    const hasEmail = Boolean(process.env.EMAIL);
    const hasPass = Boolean(process.env.PASS);

    if (!hasEmail || !hasPass) {
        return res.status(500).json({
            success: false,
            message: "EMAIL or PASS environment variable is MISSING on server (Vercel)!",
            hasEmail,
            hasPass,
            tip: "Please go to Vercel Dashboard -> Project Settings -> Environment Variables and add EMAIL and PASS."
        });
    }

    try {
        await verifyEmailConnection();
        return res.status(200).json({
            success: true,
            message: "SMTP verified successfully! Email can be sent from the server.",
            user: `${process.env.EMAIL.slice(0, 4)}***@gmail.com`
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "SMTP connection failed: " + (err.message || err),
            error: err.message,
            emailConfigured: process.env.EMAIL,
            passLength: process.env.PASS ? process.env.PASS.length : 0,
            passPreview: process.env.PASS ? `${process.env.PASS.slice(0, 2)}***${process.env.PASS.slice(-2)}` : "empty"
        });
    }
});

exports.registeruser = asyncHandler(async (req, res) => {
    userPhotoUpload(req, res, async err => {
        try {
            if (err) {
                return res.status(400).json({ message: err.message || "unable to upload image" })
            }

            if (!req.file) {
                return res.status(400).json({ message: "user image is required" })
            }

            const branchName = String(req.body.branchName || "").trim()
            const name = String(req.body.name || "").trim()
            const email = String(req.body.email || "").trim().toLowerCase()
            const mobile = String(req.body.mobile || "").trim()

            const result = await User.findOne({ $or: [{ email }, { mobile }] })

            if (result) {
                return res.status(400).json({ message: "Email Or Mobile Already Exist !" })
            }

            function generatePassword(ownerName = "", branch = "", mobileNum = "") {
                const cleanBranch = String(branch).trim().replace(/[^a-zA-Z0-9]/g, "");
                const cleanName = String(ownerName).trim().replace(/[^a-zA-Z0-9]/g, "");
                const cleanMobile = String(mobileNum).trim().replace(/[^0-9]/g, "");

                const branchPart = cleanBranch.slice(0, 3).toUpperCase() || "BRA";
                const namePart = cleanName.slice(0, 4).toLowerCase() || "user";
                const mobilePart = cleanMobile.slice(-4) || "1234";

                return `${branchPart}${namePart}@${mobilePart}`;
            }

            const password = generatePassword(name, branchName, mobile)
            const hash = await bcrypt.hash(password, 10)

            const uploaded = await cloud.uploader.upload(req.file.path)
            await User.create({
                ...req.body,
                branchName,
                name,
                email,
                mobile,
                password: hash,
                shopImages: [uploaded.secure_url]
            })

            let emailSent = false
            let emailErrorMsg = null
            try {
                const emailTemplate = getEmailTemplate({
                    name,
                    branchName,
                    email,
                    password
                })

                await sendEmail({
                    to: email,
                    subject: emailTemplate.subject,
                    text: emailTemplate.text,
                    html: emailTemplate.html
                })
                emailSent = true
            } catch (emailErr) {
                emailErrorMsg = emailErr.message || String(emailErr)
                console.error("Email send failed:", emailErrorMsg)
            }

            return res.status(201).json({
                message: emailSent
                    ? "User Register Success. Login credentials sent to your email."
                    : "User Register Success. Warning: Email could not be delivered.",
                emailSent,
                emailError: emailErrorMsg,
                credentials: {
                    email,
                    password
                }
            })
        } catch (error) {
            console.error("Register user error:", error)
            return res.status(500).json({ message: error.message || "Failed to register user" })
        }
    })
})



exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    const result = await User.findOne({ email: String(email).trim().toLowerCase() });
    if (!result) {
        return res.status(401).json({ message: "email or mobile not registerd with us" });
    }
    const verify = await bcrypt.compare(password, result.password);
    if (!verify) {
        return res.status(401).json({ message: "Invalid Password !" });
    }
    const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY);

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("USER", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });
    res.json({
        message: "User Login Success", result: {
            _id: result._id,
            name: result.name,
            email: result.email,
            branchName: result.branchName,
            address: result.address,
            mobile: result.mobile,
            shopImages: result.shopImages,
        }
    });
});



exports.logoutUser = asyncHandler(async (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    res.clearCookie("USER", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax"
    });
    res.json({ message: "User Logout Success" });
});



exports.getProfileUser = asyncHandler(async (req, res) => {
    const userId = req.user?.id || req.user;

    const user = await User.findById(userId).select("-password").lean();

    if (!user) {
        return res.status(401).json({ message: "User Not Found" });
    }

    res.json({ success: true, user });

});

exports.updateProfileUser = asyncHandler(async (req, res) => {
    const userId = req.user?.id || req.user;
    const { branchName, name, address, email, mobile, shopImages } = req.body;

    if (email) {
        const exists = await User.findOne({ email, _id: { $ne: userId } });
        if (exists) {
            return res.status(400).json({ message: "Email already exists" });
        }
    }

    const updateData = {};
    if (branchName) updateData.branchName = branchName;
    if (name) updateData.name = name;
    if (address) updateData.address = address;
    if (email) updateData.email = email;
    if (mobile) updateData.mobile = mobile;
    if (shopImages) updateData.shopImages = shopImages;

    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
    ).select("-password").lean();

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        success: true,
        message: "Profile updated successfully",
        user,
    });
});
