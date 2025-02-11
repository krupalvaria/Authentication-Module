const authService = require("./authService");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const admin = await authService.register(req.body)
        res.json({ message: "User register successfully!", data: admin });
        // res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

const login = async (req,res) => {
    try {
        const user = await authService.login(req.body)
        console.log("===>",user);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        });
        res.json({ message: "User logged in successfully!", data: {user,token} });
    } catch (error) {
        console.log("error=======>", error);
        
        res.status(400).json({ success: false, message: error.message });
    }
}

const forgotPassword = async (req,res) => {
    try {
        const result = await authService.forgotPassword(req.body);
        res.status(200).json(result);
    } catch (error) {      
        res.status(400).json({ success: false, message: error.message });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;

        if (!token || !newPassword) {
            return res.status(400).json({ success: false, message: "Token and new password are required." });
        }

        const result = await authService.resetPassword(token, newPassword);
        res.json({ message: "User reset Password successfully!", data: result });
    } catch (error) {
        console.log("error--==>", error)
        res.status(400).json({ success: false, message: error.message });
    }
};


module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
}