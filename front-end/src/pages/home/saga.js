import { call, put, select, takeLatest } from "redux-saga/effects";
import {
  ADDRESSES_REQUEST,
  GEOCODER_REQUEST,
  addressesResponse,
  geoCoderResponse,
  WEATHER_REQUEST,
  weatherRequest,
  weatherResponse
} from "./actions";
import axios from "axios";
import { push } from "react-router-redux";

export function* fetchAddressesYandex(action) {
  const items = yield ymaps.suggest(action.query);
  yield put(addressesResponse(items));
}

const geoCoderQuery =
  "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=";
export function* geoCoderYandex(action) {
  const response = yield call(
    axios.get,
    geoCoderQuery + action.selectedAddress
  );
  const geoObject =
      response.data.response.GeoObjectCollection.featureMember[0].GeoObject,
    coordinates = geoObject.Point.pos
      .split(" ")
      .reverse()
      .map(c => +c);
  yield put(
    geoCoderResponse({
      address: geoObject.name,
      coordinates
    })
  );
  yield put(weatherRequest(coordinates));
}

export function* getWeather(action) {
  const response = yield call(axios.get, "/api/weather", {
    params: {
      latitude: action.coordinates[0],
      longitude: action.coordinates[1]
    }
  });
  yield put(weatherResponse(response.data));
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* homeSaga() {
  yield takeLatest(ADDRESSES_REQUEST, fetchAddressesYandex);
  yield takeLatest(GEOCODER_REQUEST, geoCoderYandex);
  yield takeLatest(WEATHER_REQUEST, getWeather);
}
