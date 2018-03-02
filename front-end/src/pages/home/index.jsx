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
import { logoutRequest } from "../../common/global.actions";

class HomePage extends React.Component {
  basePath = "/home";
  componentDidMount() {}
  logout = () => {
    this.props.dispatch(logoutRequest());
  };
  render() {
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
}
const withConnect = connect();
export default compose(withConnect)(HomePage);
