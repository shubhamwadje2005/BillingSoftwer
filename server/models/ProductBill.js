const mongoose = require("mongoose");

const productBillSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    companyName: { type: String, required: true },
    companycontact: { type: String, required: true },
    productType: { type: String, enum: ["cloth", "footer"], required: true },
    allProducttotalamout: { type: Number, required: true },
    billphoto: { type: [String], required: true },
    isSoftDeleted: { type: Boolean, default: false }
}, { timestamps: true });

// Performance index for fast inward bills filtering and pagination
productBillSchema.index({ adminId: 1, isSoftDeleted: 1, createdAt: -1 });

module.exports = mongoose.model("productbill", productBillSchema);