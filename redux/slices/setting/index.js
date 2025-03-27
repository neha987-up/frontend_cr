import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { restAllData } from "../commonActions";

const initialState = {
  settings: []
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  extraReducers: (builder) =>
    builder.addCase(restAllData, (state, action) => {
      if (!action?.payload) {
        return initialState;
      }
      return state;
    }),
  reducers: {
    getSettings: (state, action) => { },
    setSettings: (state, action) => { state.settings = action?.payload; }
  },
});

export const { getSettings, setSettings } = settingsSlice.actions;

export const selectSetting = (state) => state.settings;

export default settingsSlice.reducer;
