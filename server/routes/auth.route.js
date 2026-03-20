const router = require("express").Router()
const auth = require("../controller/Auth.controller");
const { authmiddleware } = require("../middlware/auth.middleware");
const User = require("../models/User");

router

    .post("/register", auth.registeruser)
    .post("/login", auth.loginUser)
    .post("/logout", auth.logoutUser)

    .get("/get", authmiddleware, auth.getProfileUser)
    .patch("/profile-update", authmiddleware, auth.updateProfileUser)


router.get("/me", async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "No token provided" });

        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const user = await User.findById(decoded._id);

        if (!user) return res.status(404).json({ message: "User not found" });

        res.status(200).json({ user });
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
});


module.exports = router