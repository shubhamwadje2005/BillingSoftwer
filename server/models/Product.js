const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    // Basic Item Details (Image 2)
    itemName: {
        type: String,
        required: [true, "Item name is required"],
        trim: true
    },
    unit: {
        type: String,
        default: "PCS",
        trim: true
    },
    itemCode: {
        type: String,
        default: "",
        trim: true
    },
    category: {
        type: String,
        default: "Cloth",
        trim: true
    },
    hsnCode: {
        type: String,
        default: "",
        trim: true
    },

    // Pricing (Image 3)
    salePrice: {
        type: Number,
        required: [true, "Sale price is required"],
        default: 0
    },
    salePriceTaxType: {
        type: String,
        enum: ["Without Tax", "With Tax"],
        default: "Without Tax"
    },
    discountOnSalePrice: {
        type: Number,
        default: 0
    },
    discountType: {
        type: String,
        enum: ["Percentage", "Amount"],
        default: "Percentage"
    },
    purchasePrice: {
        type: Number,
        default: 0
    },
    purchasePriceTaxType: {
        type: String,
        enum: ["Without Tax", "With Tax"],
        default: "Without Tax"
    },
    taxRate: {
        type: String,
        default: "None"
    },

    // Stock (Image 2)
    openingStock: {
        type: Number,
        default: 0
    },
    currentStock: {
        type: Number,
        default: 0
    },
    totalSold: {
        type: Number,
        default: 0
    },
    asOfDate: {
        type: Date,
        default: Date.now
    },
    atPriceUnit: {
        type: Number,
        default: 0
    },
    minStockQty: {
        type: Number,
        default: 0
    },
    itemLocation: {
        type: String,
        default: "",
        trim: true
    },

    // Optional / Supplier details
    companyName: {
        type: String,
        default: "",
        trim: true
    },
    companyContact: {
        type: String,
        default: "",
        trim: true
    },
    productType: {
        type: String,
        enum: ["cloth", "footer", "other"],
        default: "cloth"
    },
    images: {
        type: [String],
        default: []
    },

    isSoftDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Performance indexes for inventory catalog and tenant lookups
productSchema.index({ adminId: 1, isSoftDeleted: 1, createdAt: -1 });
productSchema.index({ adminId: 1, itemName: 1 });

module.exports = mongoose.model("Product", productSchema);
