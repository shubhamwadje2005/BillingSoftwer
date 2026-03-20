const asyncHandler = require("express-async-handler")
const fs = require("fs")
const cloud = require("../utils/cloudinary");
const ProductBill = require("../models/ProductBill");
const { count } = require("console");
const generateBillPDF = require("../utils/generatePdf");
const { default: mongoose } = require("mongoose");

// exports.AddallBill = asyncHandler(async (req, res) => {
//     const { companyName, companycontact, productType, allProducttotalamout } = req.body

//     if (!companyName || !companycontact || !productType || !allProducttotalamout) {
//         return res.status(400).json({ message: "All field are required" });
//     }

//     // if (!req.files || req.files.length === 0) {
//     //     return res.status(400).json({ message: "Bill images are required" });
//     // }
//     if (!req.files) {
//         return res.status(400).json({ message: "Bill image is required" });
//     }
//     // const uploadedImages = [];

//     // for (const file of req.files) {
//     //     const result = await cloud.uploader.upload(file.path, {
//     //         folder: "Product-bills"
//     //     });

//     //     uploadedImages.push(result.secure_url);

//     //     fs.unlinkSync(file.path);
//     // };

//     const result = await cloud.uploader.upload(req.files.path, {
//         folder: "Product-bills",
//     });

//     fs.unlinkSync(req.file.path);

//     const bill = await ProductBill.create({
//         adminId: req.user,
//         companyName,
//         companycontact,
//         productType,
//         allProducttotalamout,
//         billphoto: [result.secure_url],
//     });

//     res.json({ message: "Bill added Successfully", bill })

// });

exports.AddallBill = asyncHandler(async (req, res) => {
    const { companyName, companycontact, productType, allProducttotalamout } = req.body;

    if (!companyName || !companycontact || !productType || !allProducttotalamout) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "Bill images are required" });
    }

    const uploadedImages = [];

    for (const file of req.files) {
        const result = await cloud.uploader.upload(file.path, {
            folder: "Product-bills",
        });

        uploadedImages.push(result.secure_url);
        fs.unlinkSync(file.path);
    }

    const bill = await ProductBill.create({
        adminId: req.user,
        companyName,
        companycontact,
        productType,
        allProducttotalamout,
        billphoto: uploadedImages,
    });

    res.status(201).json({
        message: "Bill added successfully",
        bill,
    });
});


exports.getallBill = asyncHandler(async (req, res) => {
    const { productType, start, limit } = req.query

    const filter = { isSoftDeleted: false, adminId: req.user };

    if (productType) filter.productType = productType

    const total = await ProductBill.countDocuments(filter)
    const bill = await ProductBill.find(filter).lean()
        .populate("adminId", "name email")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)

    res.json({ count: bill.length, bill, total })

});

exports.isSoftDeleteallBill = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid bill ID" });
    }

    const bill = await ProductBill.findOne({
        _id: id,
        adminId: req.user,
        isSoftDeleted: false
    })

    if (!bill) {
        return res.status(400).json({ message: "Bill not Found" });
    };

    bill.isSoftDeleted = true
    await bill.save();

    res.json({ message: "Bill soft delete successfully" });


});


exports.getDeletedBill = asyncHandler(async (req, res) => {
    const { start, limit } = req.query

    const total = await ProductBill.countDocuments({ isSoftDeleted: true, adminId: req.user })
    const bills = await ProductBill.find({ isSoftDeleted: true, adminId: req.user })
        .populate("adminId", "name email")
        .sort({ createdAt: -1 })
        .skip(start)
        .limit(limit)
    res.json({ message: "ProductBill Fecth Successfully", bills, total })
})

exports.restoreallBill = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const bill = await ProductBill.findOne({ _id: id, isSoftDeleted: true, adminId: req.user, });
    if (!bill) {
        return res.status(400).json({ message: "Bill not found" });
    };

    bill.isSoftDeleted = false
    await bill.save();

    res.json({ message: "Bill restored successfully" })

});




// pdf 
exports.downloadBillPDF = asyncHandler(async (req, res) => {

    const bill = await ProductBill.findById(req.params.id).lean();
    if (!bill) return res.status(400).json({ message: "Bill not found" });

    await generateBillPDF(bill, res);
});

// exports.getallBill = asyncHandler(async (req, res) => {

// })