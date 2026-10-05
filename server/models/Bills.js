const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: false },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: false },
            productName: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            size: { type: String, required: false },
            color: { type: String, required: false },
        }
    ],
    subTotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ['Cash', 'Card', 'UPI', 'Other'], default: 'Cash' },
    date: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

// Performance Indexes for fast multi-tenant queries & aggregations
billSchema.index({ createdBy: 1, isDeleted: 1, date: -1 });
billSchema.index({ createdBy: 1, createdAt: -1 });

module.exports = mongoose.model("bill", billSchema);