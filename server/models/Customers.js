const mongoose = require("mongoose")

module.exports = mongoose.model("customer", new mongoose.Schema({
    billId: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: "", required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'SUCCESS' },
    date: { type: Date, default: Date.now },
    items: [
        {
            productName: String,
            quantity: Number,
            price: Number
        }
    ],
}, { timestamps: true }))
