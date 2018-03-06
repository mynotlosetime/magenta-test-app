import { createSelector } from "reselect";

const selectGlobal = state => state.get("global");
const selectRoute = state => state.get("route");
const selectHome = state => state.get("home");

export const makeSelectWeather = () =>
    createSelector(selectHome, homeState => homeState.get("weather")),
  makeSelectMapPoint = () =>
    createSelector(selectHome, homeState => homeState.get("mapPoint")),
  makeSelectAddresses = () =>
    createSelector(selectHome, homeState => homeState.get("addresses"));
