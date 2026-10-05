const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { userProtected, ProductBill } = require("./middlware/auth.middleware");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = express();

// Security HTTP headers
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
});

// Request body size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Secure CORS configuration
const allowedOrigins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://billing-softwer-client.vercel.app"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);

        try {
            const parsed = new URL(origin);
            if (
                parsed.hostname === "localhost" ||
                parsed.hostname === "127.0.0.1" ||
                parsed.hostname === "billing-softwer-client.vercel.app"
            ) {
                return callback(null, true);
            }
        } catch {
            // invalid URL format
        }

        return callback(new Error("CORS policy violation: origin not permitted"));
    },
    credentials: true
}));

app.use(cookieParser());

// Application Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/bills", userProtected, require("./routes/Bill.route"));
app.use("/api/productbill", ProductBill, require("./routes/ProductBill.route"));
app.use("/api/products", userProtected, require("./routes/product.route"));

// 404 handler for unmatched routes
app.use("*", (req, res) => {
    res.status(404).json({ message: "Requested resource not found" });
});

// Centralized error handler
app.use((err, req, res, next) => {
    console.error("Server error:", err.message);
    const status = err.message?.includes("CORS") ? 403 : (res.statusCode && res.statusCode !== 200 ? res.statusCode : 500);
    res.status(status).json({
        message: err.message || "An unexpected error occurred",
        ...(process.env.NODE_ENV !== "production" ? { error: err.message } : {})
    });
});

process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
});

mongoose.connect(process.env.MONGO_URL);
mongoose.connection.once("open", () => {
    console.log("MongoDB connection established successfully");
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`Server running on port ${port}`));
});