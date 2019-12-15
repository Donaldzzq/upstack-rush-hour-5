import { observable, action } from "mobx";
const io = require("socket.io-client");

export class ChatStore {
  @observable user = null;

  socket;

  constructor() {
    this.socket = io(process.env.API_URL || "http://localhost:3000", {
      transports: ["websocket"]
    });

    this.socket.on("connect", () => {
      console.log("Socket Connected");
    });

    this.socket.on("message", () => {});
  }

  @action authenticate = async token => {
    this.socket.emit("auth", {
      token
    });
  };
}

export default new ChatStore();
