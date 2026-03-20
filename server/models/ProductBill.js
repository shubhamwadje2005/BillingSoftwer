const mongoose = require("mongoose")

module.exports = mongoose.model("productbill", new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true, },
    companyName: { type: String, required: true },
    companycontact: { type: String, required: true },
    productType: { type: String, enum: ["cloth", "footer"], required: true },
    allProducttotalamout: { type: Number, required: true },
    billphoto: { type: [String], required: true },
    isSoftDeleted: { type: Boolean, default: false }
}, { timestamps: true }))