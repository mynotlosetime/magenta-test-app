import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import LoginService from "../services/login.service.js";

export default class GuardRoute extends React.Component {
  state = {
    isAuth: false,
    isForbidden: false
  };

  render() {
    const { component: Component, path } = this.props;

    return (
      <Route
        path={path}
        render={props => {
          if (this.state.isForbidden) {
            return <Redirect to={{ pathname: "/" }} />;
          }
          if (this.state.isAuth) {
            return <Component {...props} />;
          } else {
            this.canActivate();
            return (
              <Dimmer active>
                <Loader size="medium">Loading</Loader>
              </Dimmer>
            );
          }
        }}
      />
    );
  }
  async canActivate() {
    try {
      await LoginService.signal();
      this.setState({ isAuth: true });
    } catch (e) {
      this.setState({ isForbidden: true });
    }
  }
}
