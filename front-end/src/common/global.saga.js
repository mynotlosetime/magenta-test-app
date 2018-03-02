import { call, put, select, takeLatest } from "redux-saga/effects";
import { push } from "react-router-redux";
import { SIGNAL_REQUEST, signalSuccess, signalError } from "./global.actions";
import axios from "axios";

export function* signal(action) {
  try {
    const response = yield call(axios.get, "/api/auth/signal");
    yield put(signalSuccess());
  } catch (e) {
    yield put(signalError(e));
  }
}

export default function* globalSaga() {
  yield takeLatest(SIGNAL_REQUEST, signal);
}
