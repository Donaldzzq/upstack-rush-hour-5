var express = require("express");
var router = express.Router();
var asyncError = require("../middleware/async-error");
const { Invite, User, Location, Sequelize, sequelize } = require("../models");
const io = require("../io")();

/* GET users listing. */
router.post(
  "/",
  asyncError(async (req, res, next) => {
    const invite = Invite.findOne({
      where: {
        from_uid: req.body.from_uid,
        to_address: req.body.to_address
      }
    });

    if (!invite) {
      await Invite.create(req.body);
    }

    io.in(req.body.to_address).emit("invite", req.body);
    res.status(200).end();
  })
);

router.get(
  "/:uid",
  asyncError(async (req, res, next) => {
    const invites = await Invite.findAll({
      where: {
        to_address: req.params.uid
      },
      include: [
        {
          model: User,
          as: "fromUser",
          include: [{ model: Location }]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.send(invites);
  })
);

module.exports = router;
