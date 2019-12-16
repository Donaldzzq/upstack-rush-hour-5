import axios from "axios";

export const api = axios.create({
  baseURL: process.env.API_URL || "http://45.32.17.39:3000"
});
