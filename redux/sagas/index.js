import { all, spawn } from "redux-saga/effects";
import authSaga from "./auth";
import tokenSaga from "./token";
import settingSaga from "./settings";
import drawSaga from "./draw";

export default function* rootSaga() {
  yield all([
    spawn(authSaga),
    spawn(tokenSaga),
    spawn(drawSaga),
    spawn(settingSaga),
  ]);
}
