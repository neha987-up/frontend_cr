import { all, call, put, takeLatest } from "redux-saga/effects";
import { toast } from "react-toastify";
import { ApiClient } from "../../../utilities/api";
import { AUTH_API_URL } from "../../../utilities/config";
import { setAllTokens, setPaymentIntent } from "../../slices/token";

function* getAllTokens(action) {
  const { params, callback } = action.payload; // Extract params and callbac
  try {
    const resp = yield call(
      ApiClient.get,
      `${AUTH_API_URL}/api/v1/users/token/all`
    );
    if (resp.status) {
      yield put(setAllTokens(resp.data?.payload));
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

function* buyToken(action) {
  const { params, callback } = action.payload; // Extract params and callbac
  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/token/buy`,
      params
    );
    if (resp.status) {
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        console.log(
          "🏋🏼‍♀️ ~ resp:-====================",
          JSON.stringify(resp?.error?.response?.data)
        );
        yield call(callback, null, resp?.error?.response?.data);
      }
    }
  } catch (e) {
    console.log("Error during buy token", e);
    toast.error(e?.response?.data);
    if (callback) {
      yield call(callback, null, e?.response);
    }
  }
}
function* getMyTokens(action) {
  const { params, callback } = action.payload; // Extract params and callbac
  try {
    const resp = yield call(ApiClient.get, `${AUTH_API_URL}/api/v1/token/my`);
    if (resp.status) {
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        // console.log("🏋🏼‍♀️ ~ resp:", JSON.stringify(resp?.error?.response?.data));
        yield call(callback, null, resp?.error?.response?.data);
      }
    }
  } catch (e) {
    if (callback) {
      yield call(callback, null, e?.response);
    }
  }
}
function* getCollection(action) {
  const { params, callback } = action.payload; // Extract params and callbac
  try {
    const resp = yield call(
      ApiClient.get,
      `${AUTH_API_URL}/api/v1/collection/get/by/user`
    );
    if (resp.status) {
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
    if (callback) {
      yield call(callback, null, e?.response);
    }
  }
}

//Stripe Payment----

function* createPaymentIntent(action) {
  const { params, callback } = action.payload;
  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/token/create/payment/intent`,
      { amount: params.amount }
    );
    if (resp) {
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      throw resp;
    }
  } catch (e) {
    if (callback) {
      yield call(callback, null, e?.response);
    }
    // yield put(onErrorStopLoad());
    // toast.error(e?.error?.response?.data?.msg);
  }
}
function* tokenSaga() {
  yield all([takeLatest("token/getAllTokens", getAllTokens)]);
  yield all([takeLatest("token/buyToken", buyToken)]);
  yield all([takeLatest("token/getMyTokens", getMyTokens)]);
  yield all([takeLatest("token/getCollection", getCollection)]);
  yield all([takeLatest("token/createPaymentIntent", createPaymentIntent)]);
}

export default tokenSaga;
