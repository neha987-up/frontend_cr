import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { restAllData } from "../commonActions";

const initialState = {
  tokenList: {},
  myTokensList: {},
  createPaymentIntentLoader: false,
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  extraReducers: (builder) =>
    builder.addCase(restAllData, (state, action) => {
      if (!action?.payload) {
        return initialState;
      }
      return state;
    }),
  reducers: {
    getAllTokens: (state, action) => {},
    setAllTokens: (state, action) => {
      state.tokenList = action?.payload;
    },
    buyToken: () => {},
    getMyTokens: () => {},
    setMyTokens: (state, action) => {
      state.myTokensList = action?.payload;
    },
    getCollection: (state, action) => {},
    createPaymentIntent: (state) => {
      state.createPaymentIntentLoader = true;
    },
    setPaymentIntent: (state, action) => {
      state.createPaymentIntentLoader = false;
      state.paymentIntentData = action?.payload?.payload;
    },
  },
});

export const {
  getAllTokens,
  setAllTokens,
  setMyTokens,
  getMyTokens,
  buyToken,
  getCollection,
  createPaymentIntent,
  setPaymentIntent,
} = tokenSlice.actions;

export const selectToken = (state) => state.token;

export default tokenSlice.reducer;
