import {
  call,
  put,
  select,
  takeLatest
} from "redux-saga/effects";
import {
  LOGIN_REQUEST,
  loginSuccess,
  loginFailure
} from "./actions";
import request from "../../../utils/request";
import axios from "axios";
import { push } from "react-router-redux";

export function* login(action) {
  try {
    const response = yield call(
      axios.post,
      "/api/auth/login",
      action.loginData
    );
    yield put(loginSuccess(response));
    yield put(push("./home"));
  } catch (e) {
    yield put(
      loginFailure(e.response.data.message || e.message)
    );
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loginAttempt() {
  yield takeLatest(LOGIN_REQUEST, login);
}
