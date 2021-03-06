const express = require("express");
const md5 = require("blueimp-md5");
const Token = require("../lib/token");
const authentication = require("../middleware/authentication");
const router = express.Router();
const uuidv4 = require("uuid/v4");
const axios = require("axios");
const {
  User,
  Location,
  Sequelize: { Op }
} = require("../models");

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (!user) {
      return res
        .status(400)
        .send({
          message: "User Not Found"
        })
        .end();
    }

    if (user.clear_password === req.body.password) {
      // if (user.password === md5(req.body.password)) {
      const returnUser = {
        id: user.id,
        uid: user.uid,
        username: user.username,
        email: user.email
      };
      const token = Token.sign(returnUser);
      res
        .status(200)
        .send({
          user: returnUser,
          token
        })
        .end();
    } else {
      return res
        .status(400)
        .send({
          message: "Password Error"
        })
        .end();
    }
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send(err.message)
      .end();
  }
});

router.get("/me", authentication.verify, async (req, res) => {
  try {
    res.send(req.user);
  } catch (err) {
    res
      .status(500)
      .send(err.message)
      .end();
  }
});

router.post("/register", async (req, res) => {
  try {
    const existingUsername = await User.findOne({
      where: {
        username: req.body.username
      }
    });
    if (existingUsername) {
      return res
        .status(400)
        .send({
          message: "Username Already Registered"
        })
        .end();
    }

    const existingEmail = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if (existingEmail) {
      return res
        .status(400)
        .send({
          message: "Email Already Registered"
        })
        .end();
    }

    const newUser = {
      uid: uuidv4(),
      username: req.body.username,
      email: req.body.email
    };

    const created = await User.create({
      ...newUser,
      // password: md5(req.body.password)
      clear_password: req.body.password
    });

    await Location.create({
      country: req.body.country,
      city: req.body.city,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      status: 1,
      surfable: 1,
      spare_rooms: 0,
      user_uid: newUser.uid
    });

    const token = Token.sign({ ...newUser, id: created.id });
    res
      .status(200)
      .send({
        user: newUser,
        token
      })
      .end();
  } catch (err) {
    res
      .status(500)
      .send(err.message)
      .end();
  }
});

router.post("/change-password", authentication.verify, async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        username: req.user.username
      }
    });
    // if (user.password === md5(req.body.oldPassword)) {
    if (user.clear_password === req.body.oldPassword) {
      await User.update({
        // password: md5(req.body.newPassword)
        password: req.body.newPassword
      });

      res
        .status(200)
        .send({
          message: "Succesfully Updated Password"
        })
        .end();
    } else {
      return res
        .status(400)
        .send({
          message: "Old Password Is Not Right"
        })
        .end();
    }
  } catch (err) {
    res
      .status(500)
      .send(err.message)
      .end();
  }
});

router.post("/oauth/google", async (req, res) => {
  try {
    const accessToken = req.body.token;
    const {
      data: { email, picture, id, family_name, given_name }
    } = await axios({
      url: "https://www.googleapis.com/oauth2/v2/userinfo",
      method: "get",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (user) {
      const returnUser = {
        id: user.id,
        uid: user.uid,
        username: user.username,
        email: user.email
      };
      const token = Token.sign(returnUser);
      res
        .status(200)
        .send({
          user: returnUser,
          token
        })
        .end();
    } else {
      const newUser = {
        uid: uuidv4(),
        first_name: given_name,
        last_name: family_name,
        email: req.body.email,
        avatar: picture
      };
      const created = await User.create({
        ...newUser,
        // TBC
        password: id
      });
      const token = Token.sign({ ...newUser, id: created.id });
      res
        .status(200)
        .send({
          user: newUser,
          token
        })
        .end();
    }
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .send(err.message)
      .end();
  }
});

module.exports = router;
