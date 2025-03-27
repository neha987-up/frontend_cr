import { combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth";
import { HYDRATE } from "next-redux-wrapper";
import { tokenSlice } from "./token";
import { drawSlice } from "./draw";
import { settingsSlice } from "./setting";

const mainReducer = combineReducers({
  auth: authSlice.reducer,
  token: tokenSlice.reducer,
  draw: drawSlice.reducer,
  settings: settingsSlice.reducer
});

const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
      };

    default:
      return mainReducer(state, action);
  }
};

export default rootReducer;
