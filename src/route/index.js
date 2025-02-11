const express = require("express");
const authRoute = require("../auth/authRoute");

const router = express.Router();
console.log("cchecking in route file==============>");

router.use("/auth", authRoute);

module.exports = router;
