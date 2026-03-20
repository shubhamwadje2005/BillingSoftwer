const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const { userPhotoUpload } = require("../utils/uploader")
const User = require("../models/User")
const cloud = require("../utils/cloudinary")
const bcrypt = require("bcryptjs")
const { sendEmail } = require("../utils/email")
const getEmailTemplate = require("../utils/getEmailTemplate ")



exports.registeruser = asyncHandler(async (req, res) => {
    userPhotoUpload(req, res, async err => {
        if (err) {
            return res.status(400).json({ message: err.message || "unable to upload image" })
        }

        if (!req.file) {
            return res.status(400).json({ message: "user image is required" })
        }

        const { branchName, name, email, mobile } = req.body

        const result = await User.findOne({ $or: [{ email }, { mobile }] })

        if (result) {
            return res.status(401).json({ message: "Email Or Mobile Already Exist !" })
        }

        function generatePassword(name, branchName, mobile) {
            const branchPart = branchName.slice(0, 3).toUpperCase();
            const namePart = name.slice(0, 4).toLowerCase();
            const mobilePart = mobile.slice(-3);

            return `${branchPart}${namePart}@${mobilePart}`;
        }

        const password = generatePassword(name, branchName, mobile)
        const hash = await bcrypt.hash(password, 10)
        // console.log(password)

        // const shopImages = []

        // if (req.files && req.files.shopImages)
        //     for (const item of req.files.shopImages) {
        //         const { Secure_url } = await cloud.uploader.upload(item.path)
        //         shopImages.push(Secure_url)
        //     }

        const uploaded = await cloud.uploader.upload(req.file.path)
        await User.create({ ...req.body, password: hash, shopImages: uploaded.secure_url })

        // await sendEmail({
        //     to: email,
        //     subject: "Your Account Password",
        //     html: `
        //         <h2>Welcome ${name}</h2>
        //         <p>Your account has been created successfully.</p>
        //         <p><b>Password:</b> ${password}</p>
        //         <p>Please change your password after first login.</p>
        //     `
        // })
        const emailTemplate = getEmailTemplate({
            name,
            branchName,
            email,
            password
        })

        await sendEmail({
            to: email,
            subject: emailTemplate.subject,
            html: emailTemplate.html
        })
        res.json({ message: "User Register Success" })
    })
})


exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const result = await User.findOne({ email })
    if (!result) {
        return res.status(401).json({ message: "email or mobile not registerd with us" })
    }
    const verify = await bcrypt.compare(password, result.password)
    if (!verify) {
        res.status(401).json({ message: "Invalid Password !" })
    }
    const token = jwt.sign({ _id: result._id, name: result.name }, process.env.JWT_KEY)

    res.cookie("USER", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
        secure: true,
        sameSite: "none"
    })
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
    })
})



exports.logoutUser = asyncHandler(async (req, res) => {
    res.clearCookie("USER", { httpOnly: true, secure: true, sameSite: "none" })
    res.json({ message: "User Logout Success" })
})



exports.getProfileUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password")

    if (!user) {
        return res.status(401).json({ message: "User Not Found" })
    }

    res.json({ success: true, user })

})

exports.updateProfileUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
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
    ).select("-password");

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({
        success: true,
        message: "Profile updated successfully",
        user,
    });
});
