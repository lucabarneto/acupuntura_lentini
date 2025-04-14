import { LoginData } from "../types/auth.types";
import { api, BASEURL } from "../../../utils/axios";

const URL = BASEURL + "/api/sessions";

class AuthAPI {
  constructor(private url: string) {}

  async login(data: LoginData) {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await api.post(`${this.url}/login`, data, config);

      console.log("response: ", res);

      if (res.data.status === "error") throw res.data.error;
      return res.data.payload;
    } catch (err) {
      return { status: "error", error: err };
    }
  }
}

export const authAPI = new AuthAPI(URL);
