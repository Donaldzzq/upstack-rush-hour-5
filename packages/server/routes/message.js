var express = require("express");
var router = express.Router();
var asyncError = require("../middleware/async-error");
const { Message, User, Sequelize, sequelize } = require("../models");
const io = require("../io")();

/* GET users listing. */
router.post(
  "/",
  asyncError(async (req, res, next) => {
    await Message.create(req.body);
    io.in(req.body.to_uid).emit("message", req.body);
    res.status(200).end();
  })
);

router.get(
  "/between/:from_uid/:to_uid",
  asyncError(async (req, res, next) => {
    const messages = await Message.findAll({
      where: {
        [Sequelize.Op.or]: [
          {
            from_uid: req.params.from_uid,
            to_uid: req.params.to_uid
          },
          {
            from_uid: req.params.to_uid,
            to_uid: req.params.from_uid
          }
        ]
      },
      include: [
        {
          model: User,
          as: "fromUser"
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.send(messages);
  })
);

router.get(
  "/latest/:uid",
  asyncError(async (req, res, next) => {
    const messages = await sequelize.query(
      `
    SELECT t1.*,users.first_name,users.last_name,users.avatar,users.uid as user_uid,users.id as user_id FROM messages t1
  JOIN (SELECT to_uid, MAX(created_at) created_at FROM messages GROUP BY to_uid) t2
    ON t1.from_uid="${req.params.uid}" AND t1.to_uid = t2.to_uid AND t1.created_at = t2.created_at JOIN users ON users.uid=t1.to_uid;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    const receivedMessages = await sequelize.query(
      `
    SELECT t1.*,users.first_name,users.last_name,users.avatar,users.uid as user_uid,users.id as user_id FROM messages t1
  JOIN (SELECT from_uid, MAX(created_at) created_at FROM messages GROUP BY from_uid) t2
    ON t1.to_uid="${req.params.uid}" AND t1.from_uid = t2.from_uid AND t1.created_at = t2.created_at JOIN users ON users.uid=t1.from_uid;`,
      { type: sequelize.QueryTypes.SELECT }
    );

    receivedMessages.forEach(message => {
      const index = messages.findIndex(
        _message => _message.user_id === message.user_id
      );
      if (index !== -1) {
        if (messages[index].id < message.id) {
          messages[index] = message;
        }
      } else {
        messages.push(message);
      }
    });

    res.send(messages.sort((a, b) => b.id - a.id));
  })
);

module.exports = router;
