const User = require("../model/user.Model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const register = async (body) =>{
    const userExist = await User.findOne({sEmail:body.sEmail})
    
    if (userExist) {
        throw new Error("User already exists");
        // res.json({ message: "User is alredy exist "});
    } else {
        return await User.create(body)
        
    }
}

const login = async (body) =>{
    const userExist = await User.findOne({ sEmail: body.sEmail })
    console.log("userExist===>", userExist);
    console.log("body.sEmail===>", body.sEmail);
    console.log("body.sPassword===>", body.sPassword);
    console.log("userExist.sPassword===>", userExist.sPassword);
    
    if (userExist) {
        const isPasswordMatch = await bcrypt.compare(body.sPassword, userExist.sPassword);
        console.log("isPasswordMatch=====>", isPasswordMatch);
        
        if (!isPasswordMatch) {
            throw new Error("Invalid email or password"); // 🔥 Throw error if password is incorrect
        }
        return userExist;

    } else {
        console.log("else part===>");
        
        throw new Error("This email is not register with us!");

    }

}

// Nodemailer setup (for sending emails)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS,
    },
});

const forgotPassword = async (body) => {
    try {
        const {sEmail} = body
        const user = await User.findOne({ sEmail  });

        if (!user) {
            throw new Error("No account found with this email.");
        }

        // Generate a reset token (valid for 1 hour)
        const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        console.log("resetToken===>", resetToken);
        

        user.sResetToken = resetToken;
        user.dResetTokenExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send email with reset link
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.sEmail,
            subject: "Password Reset Request",
            html: `<p>You requested a password reset.</p>
             <p>Click <a href="${resetLink}">here</a> to reset your password.</p>
             <p>This link expires in 1 hour.</p>`,
        });

        return { message: "A password reset link has been sent to your email." };
    } catch (error) {
        throw new Error(error.message);
    }
};

const resetPassword = async (token, newPassword) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded--->", decoded)
        const user = await User.findOne({
            _id: decoded.userId,
            sResetToken: token,
            dResetTokenExpires: { $gt: Date.now() }, // Ensure token is not expired
        });
        console.log("user====>", user);
        

        if (!user) {
            throw new Error("Invalid or expired token.");
        }

        // Hash and update the new password
        const hashedPassword = await bcrypt.hash(newPassword,8);
        console.log("hashedPassword===>", hashedPassword)
        user.sPassword = hashedPassword;
        user.sResetToken = null;
        user.dResetTokenExpires = null;
        await user.save();

        return { message: "Your password has been successfully reset." };
    } catch (error) {
        throw new Error(error.message);
    }
};

module.exports = {
    register,
    login,
    forgotPassword,
    resetPassword
}