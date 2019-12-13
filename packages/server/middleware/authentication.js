const Token = require("../lib/token");
const { User } = require("../models");
module.exports = {
  verify: (req, res, next) => {
    let token = req.headers["authorization"];
    let jwt;
    if (token && token.startsWith("Bearer ")) {
      // Remove Bearer from string
      jwt = token.slice(7, token.length);
      try {
        Token.validate(jwt);
        const user = Token.decode(jwt);
        req.user = user;
        next();
      } catch (err) {
        res.status(402).json({
          success: false,
          message: err
        });
      }
    } else {
      res.status(402).json({
        success: false,
        message: "Auth token is not supplied"
      });
    }
  },

  checkOwnerInParams: id => (req, res, next) => {
    if (req.user.id === req.params[id]) {
      next();
    } else {
      res.status(403).json({
        success: false,
        message: "Invalid"
      });
    }
  },

  checkAdmin: async (req, res, next) => {
    const user = await User.findOne({
      where: {
        id: req.user.id
      }
    });
    if (user.level === "admin") {
      next();
    } else {
      return res.status(400).end();
    }
  }
};
