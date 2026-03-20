const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")

exports.userProtected = asyncHandler(async (req, res, next) => {
    const token = req.cookies.USER

    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    };

    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token", error: err.message })
        };
        // console.log(data);

        req.user = data._id
        next();
    });
});


exports.ProductBill = asyncHandler(async (req, res, next) => {
    const token = req.cookies.USER

    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    };

    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token", error: err.message })
        };
        // console.log(data);

        req.user = data._id
        next();
    });
});

exports.authmiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies.USER

    if (!token) {
        return res.status(401).json({ message: "no cookie found" })
    };

    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) {
            console.log(err)
            return res.status(401).json({ message: "invalid token", error: err.message })
        };
        // console.log(data);

        req.user = { id: data._id }
        next();
    });
});