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
    res.send(
      await User.findOne({
        include: [{ model: Location }],
        where: { id: req.params.user_id }
      })
    );
  })
);

router.put(
  "/:user_id",
  // checkOwnerInParams("user_id"),
  asyncError(async (req, res, next) => {
    const user = await User.findOne({ where: { id: req.params.user_id } });
    const location = await Location.findOne({
      where: {
        user_uid: user.uid
      }
    });
    if (location) {
      await location.update({
        country: req.body.location.country,
        city: req.body.location.city,
        // latitude: req.body.location.latitude,
        // longitude: req.body.location.longitude,
        spare_rooms: req.body.location.spare_rooms
      });
    } else {
      await Location.create({
        user_uid: user.uid,
        country: req.body.location.country,
        city: req.body.location.city,
        spare_rooms: req.body.location.spare_rooms
      });
    }

    res.status(200).end();
  })
);

module.exports = router;
