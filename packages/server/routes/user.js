var express = require("express");
var router = express.Router();
var asyncError = require("../middleware/async-error");
const { checkOwnerInParams } = require("../middleware/authentication");
const md5 = require("blueimp-md5");
const { User, Location } = require("../models");

/* GET users listing. */
router.get(
  "/",
  asyncError(async (req, res, next) => {
    res.send(
      await User.findAndCountAll({
        limit: parseInt(req.query.limit || 5),
        offset: parseInt(req.query.limit || 5) * parseInt(req.query.page || 0)
      })
    );
  })
);

router.get(
  "/:user_id",
  asyncError(async (req, res, next) => {
    res.send(await User.findOne({ where: { id: req.params.user_id } }));
  })
);

router.post(
  "/",
  asyncError(async (req, res, next) => {
    res.send(
      await User.create({ ...req.body, password: md5(req.body.password) })
    );
  })
);

router.put(
  "/:user_id",
  checkOwnerInParams("user_id"),
  asyncError(async (req, res, next) => {
    res.send(
      await User.update(
        { ...req.body, password: md5(req.body.password) },
        { where: { id: req.params.user_id } }
      )
    );
  })
);

router.put(
  "/:user_id/location",
  checkOwnerInParams("user_id"),
  asyncError(async (req, res, next) => {
    const { lat, lng } = req.body;
    res.send(
      await Location.update(
        { lat, lng },
        { where: { user_id: req.params.user_id } }
      )
    );
  })
);

module.exports = router;
