const router = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../controller/Auth.controller");
const { authmiddleware } = require("../middlware/auth.middleware");
const User = require("../models/User");

// Lightweight memory-safe rate limiter for auth routes
const authAttempts = new Map();
setInterval(() => {
    const now = Date.now();
    for (const [ip, data] of authAttempts.entries()) {
        if (now > data.resetTime) {
            authAttempts.delete(ip);
        }
    }
}, 5 * 60 * 1000).unref();

const authRateLimiter = (max = 15, windowMs = 15 * 60 * 1000) => (req, res, next) => {
    const ip = req.ip || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "ip";
    const now = Date.now();
    const record = authAttempts.get(ip) || { count: 0, resetTime: now + windowMs };

    if (now > record.resetTime) {
        record.count = 1;
        record.resetTime = now + windowMs;
    } else {
        record.count += 1;
    }
    authAttempts.set(ip, record);

    if (record.count > max) {
        return res.status(429).json({ message: "Too many requests. Please try again after 15 minutes." });
    }
    next();
};

router
    .post("/register", authRateLimiter(50), auth.registeruser)
    .post("/login", authRateLimiter(100), auth.loginUser)
    .post("/logout", auth.logoutUser)
    .get("/check-email-config", auth.checkEmailConfig)

    .get("/get", authmiddleware, auth.getProfileUser)
    .patch("/profile-update", authmiddleware, auth.updateProfileUser)

router.get("/me", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1] || req.cookies?.USER;
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded._id).select("-password").lean();

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});

module.exports = router;