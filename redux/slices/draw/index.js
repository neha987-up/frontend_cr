import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { restAllData } from "../commonActions";

const initialState = {
  allDraw: {},
  myDrawList: {},
};

export const drawSlice = createSlice({
  name: "draw",
  initialState,
  extraReducers: (builder) =>
    builder.addCase(restAllData, (state, action) => {
      if (!action?.payload) {
        return initialState;
      }
      return state;
    }),
  reducers: {
    getAllDraw: (state, action) => {},
    getAllDrawWithoutAuth: (state, action) => {},
    setAllDraw: (state, action) => {
      state.allDraw = action?.payload;
    },

    getMyDraw: () => {},
    setMyDraw: (state, action) => {
      state.myDrawList = action?.payload;
    },
  },
});

export const {
  getAllDraw,
  setAllDraw,
  getMyDraw,
  setMyDraw,
  getAllDrawWithoutAuth,
} = drawSlice.actions;

export const selectDraw = (state) => state.draw;

export default drawSlice.reducer;
