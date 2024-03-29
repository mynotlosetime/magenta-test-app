import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";
import { signal } from "./global.actions";

class GuardRoute extends React.Component {
  render() {
    const { component: Component, path } = this.props;
    return (
      <Route
        path={path}
        render={props => {
          if (this.props.isAuth) {
            return <Component {...props} />;
          } else {
            this.canActivate();
            return (
              <Dimmer inverted active>
                <Loader inverted size="big">
                  Загрузка
                </Loader>
              </Dimmer>
            );
          }
        }}
      />
    );
  }
  canActivate() {
    this.props.dispatch(signal());
  }
}

const withConnect = connect(state => {
  return {
    isAuth: state.getIn(["global", "isAuth"]),
    isForbidden: state.getIn(["global", "isForbidden"])
  };
});
export default withRouter(compose(withConnect)(GuardRoute));
