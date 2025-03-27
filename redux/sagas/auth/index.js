import { all, call, put, takeLatest } from "redux-saga/effects";
import { setUserLogin, setUserProfile } from "../../slices/auth";
import { toast } from "react-toastify";

import { AUTH_API_URL } from "../../../utilities/config";
import { ApiClient } from "../../../utilities/api";

function* userLogin(action) {
  const { params, callback } = action.payload; // Extract params and callbac

  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/users/login`,
      params
    );
    if (resp.status) {
      localStorage.setItem(
        "authToken",
        JSON.stringify(resp.data?.payload?.token)
      );
      yield put(setUserLogin(resp.data?.payload));
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
    toast.error(e?.response?.data);
    if (callback) {
      yield call(callback, null, e?.response);
    }
  }
}

function* userSignup(action) {
  const { params, callback } = action.payload; // Extract params and callback
  console.log("🏋🏼‍♀️ params:", params);

  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/users/create`,
      params
    );
    console.log("🏋🏼‍♀️ ~ file: index.js:19 ~ function*userLogin ~ resp:", resp);
    if (resp.status) {
      // yield put(setUserLogin(resp.data));
      if (callback) {
        yield call(callback, resp);
        toast.success(resp?.data?.msg);
      }
    } else {
      throw resp;
    }
  } catch (e) {
    console.log("Error during login:", e);
    toast.error(e?.response?.data?.msg);
    if (callback) {
      yield call(callback, null, e);
    }
  }
}
function* verifyOtp(action) {
  const { params, callback } = action.payload; // Extract params and callback
  console.log("🏋🏼‍♀️ params:", params);

  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/users/verify-otp`,
      params
    );
    console.log("🏋🏼‍♀️ ~ file: index.js:19 ~ function*verify-otp ~ resp:", resp);
    if (resp.status) {
      // yield put(setUserLogin(resp.data?.payload));
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        yield call(callback, null, "error");
      }
    }
  } catch (e) {
    console.log("Error during login:", e);
    toast.error(e?.response?.data?.msg);
    if (callback) {
      yield call(callback, null, e);
    }
  }
}

function* resendOtp(action) {
  const { params, callback } = action.payload; // Extract params and callback
  console.log("🏋🏼‍♀️ params:", params);

  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/users/resend-otp`,
      params
    );

    if (resp.status) {
      toast.success(resp?.data?.msg);
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        yield call(callback, null, "error");
      }
    }
  } catch (e) {
    console.log("Error during login:", e);
    toast.error(e?.response?.data?.msg);
    if (callback) {
      yield call(callback, null, e);
    }
  }
}
function* forgotPassword(action) {
  const { params, callback } = action.payload; // Extract params and callback
  console.log("🏋🏼‍♀️ params:", params);

  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/users/forgot-password`,
      params
    );

    if (resp.status) {
      toast.success(resp?.data?.msg);
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        yield call(callback, null, "error");
      }
    }
  } catch (e) {
    console.log("Error during forgot:", e);
    toast.error(e?.response?.data?.msg);
    if (callback) {
      yield call(callback, null, e);
    }
  }
}
function* resetPassword(action) {
  const { params, callback } = action.payload; // Extract params and callback
  console.log("🏋🏼‍♀️ params:", params);

  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/users/reset-password`,
      params
    );

    if (resp.status) {
      toast.success(resp?.data?.msg);
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        yield call(callback, null, "error");
      }
    }
  } catch (e) {
    console.log("Error during reset:", e);
    toast.error(e?.response?.data?.msg);
    if (callback) {
      yield call(callback, null, e);
    }
  }
}

function* changePassword(action) {
  const { params, callback } = action.payload; // Extract params and callback
  console.log("🏋🏼‍♀️ params:", params);

  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/users/change-password`,
      params
    );

    if (resp.status) {
      toast.success(resp?.data?.msg);
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        yield call(callback, null, "error");
      }
    }
  } catch (e) {
    console.log("Error during reset:", e);
    toast.error(e?.response?.data?.msg);
    if (callback) {
      yield call(callback, null, e);
    }
  }
}
function* getUserProfile(action) {
  const { params, callback } = action.payload; // Extract params and callback
  try {
    const resp = yield call(
      ApiClient.get,
      `${AUTH_API_URL}/api/v1/users/profile`
    );

    if (resp.status) {
      // toast.success(resp?.data?.msg);
      yield put(setUserProfile(resp.data?.payload));
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        yield call(callback, null, "error");
      }
    }
  } catch (e) {
    console.log("Error during reset:", e);
    // toast.error(e?.response?.data?.msg);
    if (callback) {
      yield call(callback, null, e);
    }
  }
}

function* updateUserProfile(action) {
  const { params, callback } = action.payload; // Extract params and callback
  try {
    const resp = yield call(
      ApiClient.patch,
      `${AUTH_API_URL}/api/v1/users/update/profile`,
      params
    );

    if (resp.status) {
      toast.success(resp?.data?.msg);
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        yield call(callback, null, "error");
      }
    }
  } catch (e) {
    console.log("Error during reset:", e);
    toast.error(e?.response?.data?.msg);
    if (callback) {
      yield call(callback, null, e);
    }
  }
}
function* getImageUrl(action) {
  const { params, callback } = action.payload; // Extract params and callback
  try {
    const resp = yield call(
      ApiClient.post,
      `${AUTH_API_URL}/api/v1/users/add/token/image`,
      params
    );

    if (resp.status) {
      // toast.success(resp?.data?.msg);
      if (callback) {
        yield call(callback, resp);
      }
    } else {
      if (callback) {
        yield call(callback, null, "error");
      }
    }
  } catch (e) {
    console.log("Error during reset:", e);
    // toast.error(e?.response?.data?.msg);
    if (callback) {
      yield call(callback, null, e);
    }
  }
}
function* authSaga() {
  yield all([takeLatest("auth/userLogin", userLogin)]);
  yield all([takeLatest("auth/userSignup", userSignup)]);
  yield all([takeLatest("auth/verifyOtp", verifyOtp)]);
  yield all([takeLatest("auth/resendOtp", resendOtp)]);
  yield all([takeLatest("auth/forgotPassword", forgotPassword)]);
  yield all([takeLatest("auth/resetPassword", resetPassword)]);
  yield all([takeLatest("auth/getUserProfile", getUserProfile)]);
  yield all([takeLatest("auth/updateUserProfile", updateUserProfile)]);
  yield all([takeLatest("auth/changePassword", changePassword)]);
  yield all([takeLatest("auth/getImageUrl", getImageUrl)]);
}

export default authSaga;
