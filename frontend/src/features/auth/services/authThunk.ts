import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginData } from "../types/auth.types";
import { authAPI } from "./authAPI";

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (data: LoginData) => {
    try {
      const result = await authAPI.login(data);
      if (result.status === "error") throw result.error;
      return result;
    } catch (err) {
      console.error(err);
    }
  }
);
