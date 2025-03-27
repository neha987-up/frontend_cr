import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginApi,
} from "./authApi";

const initialState = {
  user: null,
  status: "idle",
};

export const loginAsync = createAsyncThunk("auth/loginApi", async (data) => {
  const response = await loginApi(data);
  return response.data;
});

//Update user email and phone

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = "idle";
      })
      .addCase(loginAsync.rejected, (state, { error }) => {
        state.status = "idle";
        state.user = null;
      })
  },
});

export const { logout } = authSlice.actions;
export const selectLoginAuth = (state) => state.auth.user;

export default authSlice.reducer;
