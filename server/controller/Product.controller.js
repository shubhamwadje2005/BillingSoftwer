const asyncHandler = require("express-async-handler");
const fs = require("fs");
const mongoose = require("mongoose");
const cloud = require("../utils/cloudinary");
const Product = require("../models/Product");

// Add new cloth product / item
exports.addProduct = asyncHandler(async (req, res) => {
    const {
        itemName,
        unit,
        itemCode,
        category,
        hsnCode,
        salePrice,
        salePriceTaxType,
        discountOnSalePrice,
        discountType,
        purchasePrice,
        purchasePriceTaxType,
        taxRate,
        openingStock,
        asOfDate,
        atPriceUnit,
        minStockQty,
        itemLocation,
        companyName,
        companyContact,
        productType,
    } = req.body;

    if (!itemName) {
        return res.status(400).json({ message: "Item Name is required" });
    }

    if (salePrice === undefined || salePrice === null || salePrice === "") {
        return res.status(400).json({ message: "Sale Price is required" });
    }

    const uploadedImages = [];
    if (req.files && req.files.length > 0) {
        for (const file of req.files) {
            try {
                const result = await cloud.uploader.upload(file.path, {
                    folder: "Product-items",
                });
                uploadedImages.push(result.secure_url);
            } catch (uploadErr) {
                console.error("Cloudinary upload error:", uploadErr.message);
            } finally {
                if (file.path && fs.existsSync(file.path)) {
                    fs.unlinkSync(file.path);
                }
            }
        }
    }

    const parsedOpeningStock = Number(openingStock) || 0;

    const product = await Product.create({
        adminId: req.user,
        itemName: itemName.trim(),
        unit: unit || "PCS",
        itemCode: itemCode ? itemCode.trim() : "",
        category: category || "Cloth",
        hsnCode: hsnCode || "",
        salePrice: Number(salePrice) || 0,
        salePriceTaxType: salePriceTaxType || "Without Tax",
        discountOnSalePrice: Number(discountOnSalePrice) || 0,
        discountType: discountType || "Percentage",
        purchasePrice: Number(purchasePrice) || 0,
        purchasePriceTaxType: purchasePriceTaxType || "Without Tax",
        taxRate: taxRate || "None",
        openingStock: parsedOpeningStock,
        currentStock: parsedOpeningStock,
        asOfDate: asOfDate ? new Date(asOfDate) : new Date(),
        atPriceUnit: Number(atPriceUnit) || 0,
        minStockQty: Number(minStockQty) || 0,
        itemLocation: itemLocation || "",
        companyName: companyName || "",
        companyContact: companyContact || "",
        productType: productType || "cloth",
        images: uploadedImages,
    });

    res.status(201).json({
        message: "Product added successfully",
        product,
    });
});

const escapeRegex = (str) => String(str || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Get all active products for the user (supports search, filter, pagination, or all)
exports.getAllProducts = asyncHandler(async (req, res) => {
    const { search, category, productType, start, limit, all } = req.query;

    const filter = {
        adminId: req.user,
        isSoftDeleted: false,
    };

    if (category && category !== "All") {
        filter.category = category;
    }

    if (productType && productType !== "All") {
        filter.productType = productType;
    }

    if (search && search.trim()) {
        const safeSearch = escapeRegex(search.trim());
        filter.$or = [
            { itemName: { $regex: safeSearch, $options: "i" } },
            { itemCode: { $regex: safeSearch, $options: "i" } },
            { category: { $regex: safeSearch, $options: "i" } },
            { companyName: { $regex: safeSearch, $options: "i" } },
        ];
    }

    const total = await Product.countDocuments(filter);

    let query = Product.find(filter).sort({ createdAt: -1 });

    if (all !== "true" && limit) {
        const skipCount = Number(start) || 0;
        const limitCount = Number(limit) || 10;
        query = query.skip(skipCount).limit(limitCount);
    }

    const products = await query.lean();

    res.json({
        message: "Products fetched successfully",
        products,
        total,
    });
});

// Get single product
exports.getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findOne({
        _id: id,
        adminId: req.user,
        isSoftDeleted: false,
    });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product });
});

// Update product
exports.updateProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const allowedFields = [
        "itemName", "unit", "itemCode", "category", "hsnCode",
        "salePrice", "salePriceTaxType", "discountOnSalePrice", "discountType",
        "purchasePrice", "purchasePriceTaxType", "taxRate",
        "openingStock", "currentStock", "asOfDate", "atPriceUnit",
        "minStockQty", "itemLocation", "companyName", "companyContact", "productType"
    ];

    const updates = {};
    for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
            updates[key] = req.body[key];
        }
    }

    if (updates.salePrice !== undefined) updates.salePrice = Number(updates.salePrice);
    if (updates.purchasePrice !== undefined) updates.purchasePrice = Number(updates.purchasePrice);
    if (updates.currentStock !== undefined) updates.currentStock = Number(updates.currentStock);
    if (updates.openingStock !== undefined) updates.openingStock = Number(updates.openingStock);
    if (updates.itemName) updates.itemName = updates.itemName.trim();

    const updatedProduct = await Product.findOneAndUpdate(
        { _id: id, adminId: req.user },
        { $set: updates },
        { new: true, runValidators: true }
    );

    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found or unauthorized" });
    }

    res.json({
        message: "Product updated successfully",
        product: updatedProduct,
    });
});

// Soft delete product
exports.deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findOne({
        _id: id,
        adminId: req.user,
    });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    product.isSoftDeleted = true;
    await product.save();

    res.json({ message: "Product deleted successfully" });
});

// Get deleted products
exports.getDeletedProducts = asyncHandler(async (req, res) => {
    const { start = 0, limit = 10 } = req.query;

    const filter = { isSoftDeleted: true, adminId: req.user };
    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
        .sort({ updatedAt: -1 })
        .skip(Number(start))
        .limit(Number(limit));

    res.json({
        message: "Deleted products fetched successfully",
        products,
        total,
    });
});

// Restore deleted product
exports.restoreProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await Product.findOne({
        _id: id,
        adminId: req.user,
        isSoftDeleted: true,
    });

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    product.isSoftDeleted = false;
    await product.save();

    res.json({ message: "Product restored successfully", product });
});
