import {
  ADD_ORDER,
  REMOVE_ORDER,
  CHANGE_FILTER,
  COMPLITE_ORDER
} from "./actions";
import { List } from "immutable";
import { combineReducers } from "redux-immutable";

function ordersList(state = List([]), action) {
  switch (action.type) {
    case ADD_ORDER:
      return state.push({
        id: action.id,
        text: action.text,
        completed: false
      });
    case REMOVE_ORDER:
      return state.filter(el => el.id !== action.id);
    case COMPLITE_ORDER:
      return state.map((el, i) => {
        if (el.id === action.id) {
          el.completed = action.isComplite;
        }
        return el;
      });
    default:
      return state;
  }
}

export const OrdersFilterState = {
  ALL_ORDERS: "ALL_ORDERS",
  ACTIVE_ORDERS: "ACTIVE_ORDERS",
  INACTIVE_ORDERS: "INACTIVE_ORDERS"
};

function ordersFilter(
  state = OrdersFilterState.ALL_ORDERS,
  action
) {
  switch (action.type) {
    case CHANGE_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export default combineReducers({
  ordersList,
  ordersFilter
});
