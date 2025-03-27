import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { restAllData } from "../commonActions";

const initialState = {
  usersInfo: {},
  isLoggedIn: false,
  loading: false,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) =>
    builder.addCase(restAllData, (state, action) => {
      if (!action?.payload) {
        return initialState;
      }
      return state;
    }),
  reducers: {
    userLogin: (state, action) => {
      // state.loading = true;
    },
    setUserLogin: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.usersInfo = action?.payload;
    },
    userSignup: (state, action) => {
      state.loading = true;
    },
    setUserSignup: (state) => {
      state.loading = false;
    },
    verifyOtp: (state, action) => {
      // state.loading = true;
    },
    setVerifyOtp: (state, action) => {
      state.loading = false;
      state.usersInfo = action?.payload;
    },
    resendOtp: (state, action) => {
      // state.loading = true;
    },
    setResendOtp: (state, action) => {
      // state.loading = false;
    },
    forgotPassword: (state, action) => {
      // state.loading = true;
    },
    resetPassword: (state, action) => {
      // state.loading = true;
    },
    changePassword: (state, action) => {
      // state.loading = true;
    },
    updateUserProfile: (state, action) => {
      // state.loading = true;
    },
    getUserProfile: (state, action) => {
      // state.loading = true;
    },
    setUserProfile: (state, action) => {
      state.loading = false;
      state.usersInfo = {
        ...state.usersInfo,
        user: action.payload,
      };
    },
    getImageUrl: (state, action) => {
      // state.loading = true;
    },
  },
});

export const {
  userLogin,
  setUserLogin,
  userSignup,
  setUserSignup,
  verifyOtp,
  setVerifyOtp,
  resendOtp,
  setResendOtp,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUserProfile,
  getUserProfile,
  setUserProfile,
  getImageUrl,
} = authSlice.actions;

export const selectLoginAuth = (state) => state.auth;

export default authSlice.reducer;
