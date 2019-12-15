import { observable, action } from "mobx";
import { api } from "../config/api";
const io = require("socket.io-client");

export class ChatStore {
  @observable user = null;

  @observable users = [];

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

  @action updateMessages = async uid => {
    const { data: usersRaw } = await api.get(`/message/latest/${uid}`);
    this.users = usersRaw;
  };
}

export default new ChatStore();
