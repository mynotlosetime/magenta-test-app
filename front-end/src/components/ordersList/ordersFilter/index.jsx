import React from "react";
import { Dropdown } from "semantic-ui-react";
import { Redirect } from "react-router-dom";
import { OrdersFilterState } from "../reducer";

class OrdersFitlerComponent extends React.Component {
  filterOptions = [
    {
      value: OrdersFilterState.ALL_ORDERS,
      text: "All"
    },
    {
      value: OrdersFilterState.ACTIVE_ORDERS,
      text: "Active"
    },
    {
      value: OrdersFilterState.INACTIVE_ORDERS,
      text: "Done"
    }
  ];

  render() {
    return (
      <div>
        <Dropdown
          selection
          defaultValue={OrdersFilterState.ALL_ORDERS}
          options={this.filterOptions}
          onChange={(event, data) =>
            this.props.onChange(event, data)
          }
        />
      </div>
    );
  }
  componentDidMount() {}
}
export default OrdersFitlerComponent;
