export const REMOVE_ORDER = "components/ordersList/REMOVE_ORDER",
  removeOrder = id => {
    return {
      type: REMOVE_ORDER,
      id
    };
  },
  COMPLITE_ORDER = "components/ordersList/COMPLITE_ORDER",
  toggleComplite = (id, isComplite) => {
    return {
      type: COMPLITE_ORDER,
      id,
      isComplite
    };
  },
  CHANGE_FILTER = "components/ordersList/CHANGE_FILTER",
  setOrderFilter = filter => {
    return {
      type: CHANGE_FILTER,
      filter
    };
  },
  ADD_ORDER = "components/ordersList/ADD_ORDER";
let nextTodoId = 0;
export const addOrder = text => {
  return {
    type: ADD_ORDER,
    id: nextTodoId++,
    text
  };
};
