var express = require("express");
var router = express.Router();
var userRouter = require("./user");
var authRouter = require("./auth");
var locationRouter = require("./location");
var messageRouter = require("./message");

/* GET home page. */
router.use("/user", userRouter);
router.use("/message", messageRouter);
router.use("/auth", authRouter);
router.use("/location", locationRouter);

module.exports = router;
