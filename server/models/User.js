const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    branchName: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    shopImages: { type: [String], required: true },
    inActive: { type: Boolean, default: true },
}, { timestamps: true });

// Performance & uniqueness indexes
userSchema.index({ email: 1 });
userSchema.index({ mobile: 1 });

module.exports = mongoose.model("user", userSchema);