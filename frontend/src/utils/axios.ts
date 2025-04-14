import axios from "axios";

export const BASEURL = "https://apexacupunturaapi.up.railway.app";

export const api = axios.create({
  withCredentials: true,
});
