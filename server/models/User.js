const mongoose = require("mongoose")

module.exports = mongoose.model("user", new mongoose.Schema({
    branchName: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    shopImages: { type: [String], required: true },
    inActive: { type: Boolean, default: true },
}, { timestamps: true }))