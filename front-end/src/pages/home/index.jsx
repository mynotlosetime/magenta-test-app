import React from "react";
import axios from "axios";
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
  Divider
} from "semantic-ui-react";
import {
  Redirect,
  BrowserRouter,
  Route,
  Link,
  Router,
  Switch
} from "react-router-dom";
import "./styles.less";
import { connect } from "react-redux";
import { compose } from "redux";

class HomePage extends React.Component {
  basePath = "/home";

  componentDidMount() {}

  logout = async () => {
    const res = await LoginService.signal();
  };
  render() {
    const activeRoute = this.props.activeRoute,
      weekLink = this.basePath + "/week",
      ordersLink = this.basePath + "/orders",
      dishesLink = this.basePath + "/dishes";
    return (
      <div className="home-layout">
        <div>
          <Menu pointing secondary>
            <Menu.Menu position="right">
              <Menu.Item name="logout" onClick={this.logout} />
            </Menu.Menu>
          </Menu>
        </div>
        <div className="home-body" />
      </div>
    );
  }

  getLayoutTemplate() {}

  componentDidMount() {}

  handleItemClick = (e, { name }) => {
    this.setState({ activeRoute: name });
  };
}
const withConnect = connect(state => {
  return {
    activeRoute: state.getIn(["route", "location", "pathname"])
  };
});
export default compose(withConnect)(HomePage);
