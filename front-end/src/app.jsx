import React from "react";
import "styles/index.less";
import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { Button } from "semantic-ui-react";
import {
  Redirect,
  BrowserRouter,
  Route,
  Link
} from "react-router-dom";
import GuardRoute from "./common/guard.route";

export default class App extends React.Component {
  state = {
    name: null
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-layout">
        <Route exact path="/" component={LoginPage} />
        <GuardRoute path="/home" component={HomePage} />
      </div>
    );
  }

  componentDidMount() {}
}
