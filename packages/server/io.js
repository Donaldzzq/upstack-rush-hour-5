const Token = require("./lib/token");
let io;
module.exports = server => {
  if (!io) {
    io = require("socket.io")(server);

    io.on("connection", socket => {
      socket.on("auth", data => {
        try {
          Token.validate(data.token);
          const user = Token.decode(data.token);
          socket.join(user.uid);
          console.log("Joined user " + user.uid);
        } catch (err) {
          console.log(err.message);
        }
      });
    });
  }

  return io;
};
