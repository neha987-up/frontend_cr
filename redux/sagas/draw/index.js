import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { ApiClient } from "../../../utilities/api";
import { AUTH_API_URL } from "../../../utilities/config";
import { setAllDraw, setMyDraw } from "../../slices/draw";

function* getAllDraw(action) {
  const { params, callback } = action.payload; // Extract params and callbac
  try {
    const resp = yield call(
      ApiClient.get,
      `${AUTH_API_URL}/api/v1/draw/get/all/user`, params
    );
    if (resp.status) {
      yield put(setAllDraw(resp.data?.payload));
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        console.log("🏋🏼‍♀️ ~ resp:", JSON.stringify(resp?.error?.response?.data));
        yield call(callback, null, resp?.error?.response?.data);
      }
    }
  } catch (e) {
    console.log("Error during login:", e?.error?.response);
    // toast.error(e?.response?.data);
    if (callback) {
      yield call(callback, null, e?.response);
    }
  }
}
function* getAllDrawWithoutAuth(action) {
  const { params, callback } = action.payload; // Extract params and callbac
  try {
    const resp = yield call(
      ApiClient.get,
      `${AUTH_API_URL}/api/v1/draw/get/all/user/without/token`, params
    );
    if (resp.status) {
      yield put(setAllDraw(resp.data?.payload));
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        console.log("🏋🏼‍♀️ ~ resp:", JSON.stringify(resp?.error?.response?.data));
        yield call(callback, null, resp?.error?.response?.data);
      }
    }
  } catch (e) {
    console.log("Error during login:", e?.error?.response);
    // toast.error(e?.response?.data);
    if (callback) {
      yield call(callback, null, e?.response);
    }
  }
}
function* getMyDraw(action) {
  const { params, callback } = action.payload; // Extract params and callbac
  try {
    const resp = yield call(
      ApiClient.get,
      `${AUTH_API_URL}/api/v1/users/my/draws`, params
    );
    if (resp.status) {
      yield put(setMyDraw(resp.data?.payload?.users));
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        console.log("🏋🏼‍♀️ ~ resp:", JSON.stringify(resp?.error?.response?.data));
        yield call(callback, null, resp?.error?.response?.data);
      }
    }
  } catch (e) {
    console.log("Error during login:", e?.error?.response);
    // toast.error(e?.response?.data);
    if (callback) {
      yield call(callback, null, e?.response);
    }
  }
}

function* drawSaga() {
  yield all([takeLatest("draw/getAllDraw", getAllDraw)]);
  yield all([takeLatest("draw/getMyDraw", getMyDraw)]);
  yield all([takeLatest("draw/getAllDrawWithoutAuth", getAllDrawWithoutAuth)]);
}

export default drawSaga;
