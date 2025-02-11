const express = require("express");
const router = express.Router();
const authController = require("./authController");
const authValidation = require("./authValidation");
const validate = require("../middleware/validateMiddleware");


router.post("/register", validate(authValidation.register), authController.register);
router.post("/login", validate(authValidation.login), authController.login);
router.post("/forgot-Password", validate(authValidation.forgotPassword),authController.forgotPassword)
router.put("/reset-password", validate(authValidation.resetPassword),authController.resetPassword)

module.exports = router; 