import { fromJS } from "immutable";
import {
  SIGNAL,
  SIGNAL_REQUEST,
  SIGNAL_RESPONSE,
  LOGOUT_REQUEST
} from "./global.actions";

const initialState = fromJS({
  currentUser: false,
  isAuth: false
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNAL_REQUEST:
      return state.set("isAuth", false);
    case SIGNAL_RESPONSE:
      return !action.error
        ? state.set("isAuth", true)
        : state.set("isAuth", false);
    case LOGOUT_REQUEST:
      return state.set("isAuth", false);
  }
  return state;
}
export default globalReducer;
