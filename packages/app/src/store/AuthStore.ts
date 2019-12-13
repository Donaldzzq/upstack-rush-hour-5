import { observable, action } from "mobx";
import { api } from "../config/api";
import { extractResponseError } from "../util/extractResponseError";
import { AsyncStorage } from "react-native";

class AuthStore {
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
        this.auth();
      } catch (err) {
        this.clearToken();
      }
    }
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
    } catch (err) {
      this.logout();
    }
  };

  @action onLogin = () => {
    this.isLoggedIn = true;
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
}

export default new AuthStore();
