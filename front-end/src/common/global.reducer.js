import { fromJS } from "immutable";
import { SIGNAL, SIGNAL_REQUEST, SIGNAL_RESPONSE } from "./global.actions";

const initialState = fromJS({
  loading: false,
  error: false,
  currentUser: false,
  isAuth: false,
  isForbidden: false
});

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNAL_REQUEST:
      return state.set("isAuth", false);
    case SIGNAL_RESPONSE:
      if (!action.error) {
        return state.set("isAuth", true);
      } else {
        return state.set("isAuth", false).set("isForbidden", true);
      }
  }
  return state;
}
export default globalReducer;
