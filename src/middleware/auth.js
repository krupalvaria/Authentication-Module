const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {

    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ success: false, message: "Access denied. No token provided." });
        }
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = decoded; // ✅ Store user data in request
        next();
    } catch (error) {
        res.status(400).json({ success: false, message: "Invalid token" });
    }
};

module.exports = authenticate;
