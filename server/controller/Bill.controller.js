const asyncHandler = require("express-async-handler");
const Bills = require("../models/Bills");
const { default: mongoose } = require("mongoose");
const CustomergeneratePdf = require("../utils/CustomergeneratePdf");



// exports.addbillProduct = asyncHandler(async (req, res) => {
//     const { customerName, customerPhone, items, discount = 0, tax = 0, paymentMethod } = req.body;
//     if (!items || items.length === 0) {
//         return res.status(400).json({ message: "item cannnot be empty" })
//     }

//     const subTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     const totalAmount = subTotal - discount + tax;

//     const newBill = new Bills({
//         customerName, customerPhone, items, subTotal, discount, tax, totalAmount, paymentMethod, createdBy: req.user
//     })

//     const savedBill = await newBill.save();
//     res.status(201).json({ message: "New Bill add successfuly", savedBill })
//     // res.status(201).json(savedBill)
// });

exports.addbillProduct = asyncHandler(async (req, res) => {
    const {
        customerName,
        customerPhone,
        items,
        discount = 0, // percent
        tax = 0,      // percent
        paymentMethod,
    } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ message: "Item cannot be empty" });
    }

    const subTotal = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const discountAmount = (subTotal * Number(discount)) / 100;
    const taxableAmount = subTotal - discountAmount;
    const taxAmount = (taxableAmount * Number(tax)) / 100;

    const totalAmount = Number((taxableAmount + taxAmount).toFixed(2));

    const bill = await Bills.create({
        customerName,
        customerPhone,
        items,
        subTotal,
        discount,
        tax,
        totalAmount,
        paymentMethod,
        createdBy: req.user,
    });

    res.status(201).json({ message: "Bill Added Successfully", bill });
});


exports.getBillProduct = asyncHandler(async (req, res) => {
    const bills = await Bills.find({ isDeleted: false, createdBy: req.user }).populate("createdBy");
    if (bills.length === 0) {
        return res.status(400).json({ message: "NO Bills found" })
    }
    res.json({ message: "Bills Fetched Successfully", bills })
})



// exports.updateBillProduct = asyncHandler(async (req, res) => {
//     const { id } = req.params;

//     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(400).json({ message: "Invalid bill ID" });
//     }

//     const bill = await Bills.findOne({ _id: id, isDeleted: false, createdBy: req.user, })

//     if (!bill) {
//         return res.status(400).json({ message: "Bill not Found" })
//     }

//     const {
//         customerName,
//         customerPhone,
//         items,
//         discount = bill.discount,
//         tax = bill.tax,
//         paymentMethod,
//     } = req.body;

//     if (items && items.length > 0) {
//         bill.items = items;
//         bill.subTotal = items.reduce(
//             (sum, item) => sum + item.price * item.quantity,
//             0
//         );
//     }

//     bill.customerName = customerName ?? bill.customerName;
//     bill.customerPhone = customerPhone ?? bill.customerPhone;
//     bill.discount = discount;
//     bill.tax = tax;
//     bill.totalAmount = bill.subTotal - discount + tax;
//     bill.paymentMethod = paymentMethod ?? bill.paymentMethod;

//     if (paymentMethod) {
//         bill.paymentMethod = paymentMethod;
//     }

//     if (!bill.createdBy && req.user) {
//         bill.createdBy = req.user
//     }

//     const updatebill = await bill.save();

//     res.json({ message: "Bill Updated successfully", updatebill })
// })

exports.updateBillProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Bill ID" });
    }

    const bill = await Bills.findOne({
        _id: id,
        isDeleted: false,
        createdBy: req.user,
    });

    if (!bill) {
        return res.status(404).json({ message: "Bill not found" });
    }

    const {
        customerName,
        customerPhone,
        items,
        discount = bill.discount,
        tax = bill.tax,
        paymentMethod,
    } = req.body;

    if (items && items.length > 0) {
        bill.items = items;
        bill.subTotal = items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }

    const discountAmount = (bill.subTotal * Number(discount)) / 100;
    const taxableAmount = bill.subTotal - discountAmount;
    const taxAmount = (taxableAmount * Number(tax)) / 100;

    bill.totalAmount = Number((taxableAmount + taxAmount).toFixed(2));

    bill.customerName = customerName ?? bill.customerName;
    bill.customerPhone = customerPhone ?? bill.customerPhone;
    bill.discount = discount;
    bill.tax = tax;
    bill.paymentMethod = paymentMethod ?? bill.paymentMethod;

    await bill.save();

    res.json({ message: "Bill Updated Successfully", bill });
});

exports.deleteBillProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid bill ID" });
    }

    // const bill = await Bills.findById(id)
    // if (!bill || bill.isDeleted) {
    //     return res.status(400).json({ message: "Bill not Found" })
    // }
    const bill = await Bills.findOne({
        _id: id,
        createdBy: req.user,
        isDeleted: false
    });
    if (!bill) {
        return res.status(400).json({ message: "Bill not Found" });
    }

    bill.isDeleted = true;
    await bill.save();

    res.json({ message: "Bill Deleted Successfully" })
})

exports.getPagination = asyncHandler(async (req, res) => {
    const { start, limit } = req.query

    const total = await Bills.countDocuments({ isDeleted: false, createdBy: req.user })

    const result = await Bills.find({ isDeleted: false, createdBy: req.user })
        .skip(start)
        .limit(limit)

    res.json({ message: "Pagination Fetch Successfully", result, total })

})

exports.restoreBillProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const bill = await Bills.findOne({ _id: id, isDeleted: true, createdBy: req.user, })

    if (!bill) {
        return res.status(400).json({ message: "Deleted bill not found" })
    }

    bill.isDeleted = false;

    await bill.save()

    res.json({ message: "Bill restored Successfully" })

})

exports.getDeleteBillProducts = asyncHandler(async (req, res) => {
    const { start, limit } = req.query

    const total = await Bills.countDocuments({ isDeleted: true, createdBy: req.user })
    const bills = await Bills.find({ isDeleted: true, createdBy: req.user, })
        .populate("createdBy", "name email")
        .skip(start)
        .limit(limit)
    res.json({ message: "DeleteBill Fetch Successfully", bills, total });
})


exports.downloadBillProductPdf = asyncHandler(async (req, res) => {

    const bill = await Bills.findById(req.params.id).populate("createdBy").lean();
    if (!bill) {
        return res.status(400).json({ message: "customer Bill Not Found" })
    }
    console.log("billdata", bill)
    await CustomergeneratePdf(bill, res)
})






// dashbord cha code 
// exports.getDashboardTotals = async (req, res) => {
//     try {
//         const year = Number(req.query.year) || new Date().getFullYear();
//         const month = Number(req.query.month) || new Date().getMonth() + 1;
//         const day = Number(req.query.day) || new Date().getDate();

//         // Overall Total Income
//         const overall = await Bills.aggregate([
//             { $match: { isDeleted: false } },
//             { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }
//         ]);

//         // Yearly Total
//         const yearly = await Bills.aggregate([
//             {
//                 $match: {
//                     isDeleted: false,
//                     date: {
//                         $gte: new Date(`${year}-01-01`),
//                         $lte: new Date(`${year}-12-31T23:59:59.999Z`)
//                     }
//                 }
//             },
//             { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }
//         ]);

//         // Monthly Total
//         const monthly = await Bills.aggregate([
//             {
//                 $match: {
//                     isDeleted: false,
//                     date: {
//                         $gte: new Date(`${year}-${month}-01`),
//                         $lte: new Date(`${year}-${month}-31T23:59:59.999Z`)
//                     }
//                 }
//             },
//             { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }
//         ]);

//         // Daily Total
//         const daily = await Bills.aggregate([
//             {
//                 $match: {
//                     isDeleted: false,
//                     date: {
//                         $gte: new Date(`${year}-${month}-${day}T00:00:00.000Z`),
//                         $lte: new Date(`${year}-${month}-${day}T23:59:59.999Z`)
//                     }
//                 }
//             },
//             { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }
//         ]);

//         // Total Bills Count
//         const totalBills = await Bills.countDocuments({ isDeleted: false });

//         // Recent Bills (latest 5)
//         const recentBills = await Bill.find({ isDeleted: false })
//             .sort({ createdAt: -1 })
//             .limit(5)
//             .select("customerName customerPhone totalAmount paymentMethod date");

//         res.json({
//             overall: overall[0]?.totalIncome || 0,
//             yearly: yearly[0]?.totalIncome || 0,
//             monthly: monthly[0]?.totalIncome || 0,
//             daily: daily[0]?.totalIncome || 0,
//             totalBills,
//             recentBills
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };
exports.getDashboardTotals = asyncHandler(async (req, res) => {
    const year = Number(req.query.year) || new Date().getFullYear();
    const month = Number(req.query.month) || new Date().getMonth() + 1;
    const day = Number(req.query.day) || new Date().getDate();

    const userId = new mongoose.Types.ObjectId(req.user);

    // Helper function to get last day of month
    const getLastDayOfMonth = (y, m) => new Date(y, m, 0); // month 1-indexed

    // Overall Total Income
    const overall = await Bills.aggregate([
        { $match: { isDeleted: false, createdBy: userId } },
        { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }
    ]);

    // Yearly Total
    const yearly = await Bills.aggregate([
        {
            $match: {
                isDeleted: false,
                createdBy: userId,
                date: {
                    $gte: new Date(`${year}-01-01T00:00:00.000Z`),
                    $lte: new Date(`${year}-12-31T23:59:59.999Z`)
                }
            }
        },
        { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }
    ]);

    // Monthly Total
    const monthStart = new Date(`${year}-${month}-01T00:00:00.000Z`);
    const monthEnd = getLastDayOfMonth(year, month);
    monthEnd.setHours(23, 59, 59, 999);

    const monthly = await Bills.aggregate([
        {
            $match: {
                isDeleted: false,
                createdBy: userId,
                date: {
                    $gte: monthStart,
                    $lte: monthEnd
                }
            }
        },
        { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }
    ]);

    // Daily Total
    const dayStart = new Date(year, month - 1, day, 0, 0, 0, 0); // month 0-indexed
    const dayEnd = new Date(year, month - 1, day, 23, 59, 59, 999);

    const daily = await Bills.aggregate([
        {
            $match: {
                isDeleted: false,
                createdBy: userId,
                date: {
                    $gte: dayStart,
                    $lte: dayEnd
                }
            }
        },
        { $group: { _id: null, totalIncome: { $sum: "$totalAmount" } } }
    ]);

    // Total Bills Count
    const totalBills = await Bills.countDocuments({ isDeleted: false, createdBy: userId });

    // Recent Bills (latest 5)
    const recentBills = await Bills.find({ isDeleted: false, createdBy: userId })
        .sort({ createdAt: -1 })
        .limit(5)
        .select("customerName customerPhone totalAmount paymentMethod date");

    res.json({
        overall: overall[0]?.totalIncome || 0,
        yearly: yearly[0]?.totalIncome || 0,
        monthly: monthly[0]?.totalIncome || 0,
        daily: daily[0]?.totalIncome || 0,
        totalBills,
        recentBills
    });
});