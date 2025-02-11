const nodemailer = require("nodemailer");

// Nodemailer setup (for sending emails)
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password
    },
});

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