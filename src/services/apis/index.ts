import axios from "axios";
import { ApiTypes } from "../types/api-types";
import { AUTH_TOKEN } from "../constants";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:3001';
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const apis = {
  signup: ({ name, email, password }: ApiTypes.Signup) =>
    axios.post("auth/signup", { name, email, password }),
  
  login: ({ email, password }: ApiTypes.Login) =>
    axios.post("auth/login", { email, password }),
};
