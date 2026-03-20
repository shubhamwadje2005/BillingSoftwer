const mongoose = require("mongoose")

module.exports = mongoose.model("bill", new mongoose.Schema({
    // customer: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    customerName: { type: String, required: true, },
    customerPhone: { type: String, required: false, },
    items: [
        {
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            size: { type: String, required: false },
            color: { type: String, required: false },
        }
    ],
    subTotal: { type: Number, required: true, },
    discount: { type: Number, default: 0, },
    tax: { type: Number, default: 0, },
    totalAmount: { type: Number, required: true, },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Other'], default: 'Cash' },
    date: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    isDeleted: { type: Boolean, default: false },

}, { timestamps: true }))