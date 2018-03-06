import {
  ADDRESSES_REQUEST,
  ADDRESSES_RESPONSE,
  GEOCODER_RESPONSE,
  GEOCODER_REQUEST,
  WEATHER_RESPONSE
} from "./actions";
import { fromJS, Map } from "immutable";
import { combineReducers } from "redux-immutable";

const initialState = fromJS({
  addresses: {
    loading: false,
    items: []
  },
  weather: {
    loading: false,
    item: null
  },
  mapPoint: {
    address: "",
    coordinates: null,
    isReverseGeocoding: true
  }
});

export default function home(state = initialState, action) {
  switch (action.type) {
    case ADDRESSES_REQUEST:
      return state
        .setIn(["addresses", "loading"], true)
        .setIn(["mapPoint", "addresses"], action.query);
    case ADDRESSES_RESPONSE:
      return state.set(
        "addresses",
        Map({
          items: convertSuggestItems(action.items),
          loading: false
        })
      );
    case GEOCODER_REQUEST:
      return state.setIn(["weather", "loading"], true);
    case GEOCODER_RESPONSE:
      return state.set("mapPoint", Map(action.mapPoint));
    case WEATHER_RESPONSE:
      return state.setIn(["weather", "loading"], false);
    default:
      return state;
  }
}

function convertSuggestItems(items) {
  return items.map(item => {
    const address = item.displayName.split(", ").reverse();
    return {
      key: item.displayName,
      title: address[0],
      description: address
        .slice(1)
        .reverse()
        .join(", ")
    };
  });
}
