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

export function* suggestYandex(action) {
  const items = yield ymaps.suggest(action.query);
  yield put(addressesResponse(items));
}

const geoCoderQuery =
  "https://geocode-maps.yandex.ru/1.x/?format=json&geocode=";
export function* geoCoderYandex(action) {
  const res = yield ymaps.geocode(action.query),
    isReverseGeocoding = Array.isArray(action.query);

  let firstGeoObject = res.geoObjects.get(0);
  const address = firstGeoObject.getAddressLine();
  if (address) {
    let coordinates;

    if (isReverseGeocoding) {
      coordinates = action.query;
    } else {
      coordinates = firstGeoObject.geometry.getCoordinates();
    }
    yield put(
      geoCoderResponse({
        address,
        coordinates,
        isReverseGeocoding
      })
    );
    yield put(weatherRequest(coordinates));
  }
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
  yield takeLatest(ADDRESSES_REQUEST, suggestYandex);
  yield takeLatest(GEOCODER_REQUEST, geoCoderYandex);
  yield takeLatest(WEATHER_REQUEST, getWeather);
}
