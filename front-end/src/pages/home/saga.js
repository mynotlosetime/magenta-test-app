import {
  call,
  put,
  select,
  takeLatest
} from "redux-saga/effects";
import { ADDRESSES_REQUEST } from "./actions";
import axios from "axios";
import { push } from "react-router-redux";

export function* fetchAddresses(action) {
  // const items = yield ymaps.suggest("мыт");

  console.log(items);
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* homeSaga() {
  yield takeLatest(ADDRESSES_REQUEST, fetchAddresses);
}
