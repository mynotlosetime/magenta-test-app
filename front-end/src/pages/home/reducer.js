import {
  ADDRESSES_REQUEST,
  ADDRESSES_RESPONSE
} from "./actions";
import { Map } from "immutable";
import { combineReducers } from "redux-immutable";

const initialState = Map({
  addressesLoading: false
});

export default function home(state = initialState, action) {
  switch (action.type) {
    case ADDRESSES_REQUEST:
      return state.set("addressesLoading", true);
    default:
      return state;
  }
}
