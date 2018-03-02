import React from "react";
import { connect, bindActionCreators } from "react-redux";
import {
  Button,
  Message,
  Segment,
  Menu,
  Container,
  Image,
  Dropdown,
  Header,
  Icon,
  Grid,
  List,
  Checkbox,
  Table
} from "semantic-ui-react";
import {
  addOrder,
  removeOrder,
  setOrderFilter,
  toggleComplite
} from "./actions";
import { OrdersFilterState } from "./reducer";
import injectReducer from "../../../utils/injectReducer";
import reducer from "./reducer";
import { compose } from "redux";
import OrdersFilter from "./ordersFilter";

class OrdersListPresentation extends React.Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }
  renderBody() {
    let renderRows = () => {
      return this.props.orders.map(order => {
        return (
          <Table.Row key={order.id}>
            <Table.Cell>{order.id}</Table.Cell>
            <Table.Cell>{order.text}</Table.Cell>
            <Table.Cell>
              <Checkbox
                onChange={(event, data) =>
                  this.dispatch(
                    toggleComplite(order.id, data.checked)
                  )
                }
                checked={order.completed}
              />
            </Table.Cell>
            <Table.Cell>
              <Button
                onClick={() =>
                  this.dispatch(removeOrder(order.id))
                }
                negative
                icon
                size="mini"
              >
                <Icon name="delete" />
              </Button>
            </Table.Cell>
          </Table.Row>
        );
      });
    };
    return <Table.Body>{renderRows()}</Table.Body>;
  }
  render() {
    return (
      <Table size="small">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Text</Table.HeaderCell>
            <Table.HeaderCell>Complited</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        {this.renderBody()}
        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="2">
              <Button
                primary
                size="small"
                onClick={() =>
                  this.dispatch(addOrder("test Text"))
                }
              >
                Add Order
              </Button>
              <Button size="small">Remove Order</Button>
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2">
              <OrdersFilter onChange={this.onFilterSelect} />
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
  componentDidMount() {}

  onFilterSelect = (event, data) => {
    this.props.dispatch(setOrderFilter(data.value));
  };
}

let getVisibleOrders = (orders, filter) => {
  switch (filter) {
    case OrdersFilterState.ACTIVE_ORDERS:
      return orders.filter(order => order.completed == true);
    case OrdersFilterState.INACTIVE_ORDERS:
      return orders.filter(order => order.completed == false);
    default:
      return orders;
  }
};

const withConnect = connect(state => {
  let orders = state.get("orders");
  return {
    orders: getVisibleOrders(
      orders.get("ordersList"),
      orders.get("ordersFilter")
    )
  };
});

const withReducer = injectReducer({
  key: "orders",
  reducer
});

export default compose(withReducer, withConnect)(
  OrdersListPresentation
);
