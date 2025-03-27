import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import { AUTH_API_URL } from "../../../utilities/config";
import { setSettings } from "../../slices/setting";

function* getSettings(action) {
  const { params, callback } = action.payload; // Extract params and callbac
  try {
    const resp = yield call(ApiClient.get, `${AUTH_API_URL}/api/v1/settings`);

    if (resp.status) {
      yield put(setSettings(resp.data?.payload));
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
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

function* settingSaga() {
  yield all([takeLatest("settings/getSettings", getSettings)]);
}

export default settingSaga;
