const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const extractToken = (req) => {
    if (req.cookies && req.cookies.USER) {
        return req.cookies.USER;
    }
    if (req.headers && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
        return req.headers.authorization.split(" ")[1];
    }
    return null;
};

exports.userProtected = asyncHandler(async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({ message: "Authentication required: no token found" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        req.user = data._id;
        req.userId = data._id;
        next();
    });
});

exports.ProductBill = asyncHandler(async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({ message: "Authentication required: no token found" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        req.user = data._id;
        req.userId = data._id;
        next();
    });
});

exports.authmiddleware = asyncHandler(async (req, res, next) => {
    const token = extractToken(req);

    if (!token) {
        return res.status(401).json({ message: "Authentication required: no token found" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
        if (err) {
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        req.user = data._id;
        req.userId = data._id;
        next();
    });
});