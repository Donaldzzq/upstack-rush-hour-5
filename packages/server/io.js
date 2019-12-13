const Token = require("./lib/token");

module.exports = server => {
  const io = require("socket.io")(server);

  io.on("connection", socket => {
    socket.on("auth", data => {
      try {
        Token.validate(data.token);
        const user = Token.decode(jwt);
        socket.join(user.user_id);
      } catch (err) {}
    });
  });

  return io;
};
