var express = require("express");
var router = express.Router();
var asyncError = require("../middleware/async-error");
const { User, Location } = require("../models");

/* GET users listing. */
router.get(
  "/",
  asyncError(async (req, res, next) => {
    res.send(
      await Location.findAll({
        include: [{ model: User }],
        where: req.query
      })
    );
  })
);

module.exports = router;
