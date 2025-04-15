import { createSlice } from "@reduxjs/toolkit";
import { AuthSliceState } from "../types/auth.types";
import { loginUser } from "./authThunk";

const initialState: AuthSliceState = {
  loading: "idle",
  authenticated: false,
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.loading = "idle";
      state.authenticated = true;
      state.token = payload.token;
      state.user = payload.user;
      localStorage.setItem("authenticated", "true");
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = "idle";
      state.authenticated = false;
      state.token = null;
      state.user = null;
      localStorage.setItem("authenticated", "false");
    });
  },
});

export const authReducer = authSlice.reducer;
