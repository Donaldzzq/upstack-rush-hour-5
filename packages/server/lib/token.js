const jwt = require("jsonwebtoken");
const SECRET = "upstack";
module.exports = {
  sign: data => {
    return jwt.sign(data, SECRET);
  },
  validate: token => {
    return jwt.verify(token, SECRET);
  },
  decode: token => {
    return jwt.decode(token, SECRET);
  }
};
