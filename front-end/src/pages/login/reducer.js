import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from "./actions";
import { Map } from "immutable";
import { combineReducers } from "redux-immutable";

const initialState = Map({
  serverError: null,
  isFetching: false
});

export default function login(state = initialState, action) {
  // console.log(action);
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set("isFetching", true);
    case LOGIN_SUCCESS:
      return state
        .set("isFetching", false)
        .set("serverError", null);
    case LOGIN_FAILURE:
      return state
        .set("isFetching", false)
        .set("serverError", action.error);
    default:
      return state;
  }
}
