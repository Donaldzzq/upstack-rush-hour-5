var express = require("express");
var router = express.Router();
var userRouter = require("./user");
var authRouter = require("./auth");

/* GET home page. */
router.use("/user", userRouter);
router.use("/auth", authRouter);

module.exports = router;
