import { observable, action } from "mobx";
import { api } from "../config/api";
import { extractResponseError } from "../util/extractResponseError";
import { AsyncStorage } from "react-native";
import * as Google from "expo-google-app-auth";
import {
  googleAndroidClientId,
  googleIosClientId
} from "../config/servigConfig";
import ChatStore from "../store/ChatStore";

export class AuthStore {
  @observable user = null;
  @observable isLoggedIn = false;

  constructor() {
    this.authenticate();
  }

  @action authenticate = async () => {
    const token = await this.getToken();
    if (token) {
      try {
        this.setToken(token);
        return await this.auth();
      } catch (err) {
        this.clearToken();
        return false;
      }
    }
    return false;
  };

  @action login = async form => {
    try {
      const {
        data: { token, user }
      } = await api.post("/auth/login", form);
      this.setUser(user);
      this.setToken(token);
      this.onLogin();
      return {
        success: true
      };
    } catch (err) {
      return {
        success: false,
        error: extractResponseError(err)
      };
    }
  };

  @action register = async form => {
    try {
      const {
        data: { token, user }
      } = await api.post("/auth/register", form);
      this.setUser(user);
      this.setToken(token);
      this.onLogin();
      return {
        success: true
      };
    } catch (err) {
      return {
        success: false,
        error: extractResponseError(err)
      };
    }
  };

  @action auth = async () => {
    try {
      const { data: user } = await api.get("/auth/me");
      this.setUser(user);
      this.onLogin();
      return true;
    } catch (err) {
      this.logout();
      return false;
    }
  };

  @action onLogin = async () => {
    const token = await this.getToken();
    this.isLoggedIn = true;
    ChatStore.authenticate(token);
  };

  @action setUser = user => {
    this.user = user;
  };

  @action
  logout = async () => {
    this.clearToken();
    this.user = null;
    this.isLoggedIn = false;
  };

  @action getToken = async () => {
    const value = await AsyncStorage.getItem("TOPTAL_FOOD_AUTH_TOKEN");
    return value;
  };

  @action setToken = async token => {
    api.defaults.headers.common["Authorization"] = "Bearer " + token;
    await AsyncStorage.setItem("TOPTAL_FOOD_AUTH_TOKEN", token);
  };

  @action clearToken = async () => {
    delete api.defaults.headers.common["Authorization"];
    await AsyncStorage.removeItem("TOPTAL_FOOD_AUTH_TOKEN");
  };

  @action
  googleLogin = async () => {
    try {
      const result = await Google.logInAsync({
        clientId: googleIosClientId,
        androidClientId: googleAndroidClientId,
        iosClientId: googleIosClientId,
        scopes: ["profile", "email"]
      });
      const { type } = result;
      if (type === "success") {
        const {
          data: { token, user }
        } = await api.post("/auth/oauth/google", {
          token: result.accessToken
        });
        this.setUser(user);
        this.setToken(token);
        this.onLogin();
        return {
          success: true
        };
      } else {
        return {
          success: false
        };
      }
    } catch (err) {
      return {
        success: false,
        message: extractResponseError(err)
      };
    }
  };
}

export default new AuthStore();
