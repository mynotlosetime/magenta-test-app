import {
  ADDRESSES_REQUEST,
  ADDRESSES_RESPONSE,
  GEOCODER_RESPONSE
} from "./actions";
import { Map } from "immutable";
import { combineReducers } from "redux-immutable";

const initialState = Map({
  addressesLoading: false,
  addressItems: [],
  wetherEntity: null,
  mapPoint: null
});

export default function home(state = initialState, action) {
  switch (action.type) {
    case ADDRESSES_REQUEST:
      return state.set("addressesLoading", true);
    case ADDRESSES_RESPONSE:
      return state
        .set("addressItems", action.items)
        .set("addressesLoading", false);
    case GEOCODER_RESPONSE:
      return state.set("mapPoint", action.addressWithCoord);
    default:
      return state;
  }
}
