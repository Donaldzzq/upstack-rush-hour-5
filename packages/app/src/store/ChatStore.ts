import { observable, action } from "mobx";
import { api } from "../config/api";
const io = require("socket.io-client");

export class ChatStore {
  @observable uid = "";
  @observable chatUnread = 0;
  @observable inviteUnread = 0;
  @observable users = [];
  @observable inviteUsers = [];

  socket;

  constructor() {
    this.socket = io(process.env.API_URL || "http://localhost:3000", {
      transports: ["websocket"]
    });

    this.socket.on("connect", () => {
      console.log("Socket Connected");
    });

    this.socket.on("message", async message => {
      console.log("Receiving Message!");
      await this.updateMessages();
      const index = this.users.findIndex(
        user => user.user_uid === message.from_uid
      );
      if (index !== -1) {
        this.users[index].unread = this.users[index].unread
          ? this.users[index].unread + 1
          : 1;
      }
      this.chatUnread += 1;
    });

    this.socket.on("invite", async message => {
      console.log("Receiving Invite!");
      await this.updateInvites();
      const index = this.inviteUsers.findIndex(
        user => user.fromUser.uid === message.from_uid
      );
      if (index !== -1) {
        console.log("Setting user to unread true");
        this.inviteUsers[index].unread = true;
      }
      this.inviteUnread += 1;
    });
  }

  @action authenticate = async (uid, token) => {
    (this.uid = uid),
      this.socket.emit("auth", {
        token
      });
    console.log("Sent Socket Auth");
  };

  @action setUnread = async (count = 0) => {
    this.chatUnread = count;
  };

  @action setInviteUnread = async (count = 0) => {
    this.inviteUnread = count;
  };

  @action resetUnreadForUser = async uid => {
    const index = this.users.findIndex(user => user.user_uid === uid);
    if (index !== -1) {
      this.users[index].unread = 0;
    }
  };

  @action resetInviteForUser = async uid => {
    const index = this.inviteUsers.findIndex(user => user.fromUser.uid === uid);
    if (index !== -1) {
      this.inviteUsers[index].unread = false;
    }
  };

  @action updateMessages = async (uid?) => {
    const { data: usersRaw } = await api.get(
      `/message/latest/${uid ? uid : this.uid}`
    );
    this.users = usersRaw;
  };

  @action updateInvites = async (uid?) => {
    const { data: invitesRaw } = await api.get(
      `/invite/${uid ? uid : this.uid}`
    );
    this.inviteUsers = invitesRaw;
  };
}

export default new ChatStore();
