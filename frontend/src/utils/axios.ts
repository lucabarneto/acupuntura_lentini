import axios from "axios";

export const BASEURL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL_PROD
  : import.meta.env.VITE_API_URL_LOCAL;

export const api = axios.create({
  withCredentials: true,
});
