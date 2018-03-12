import React from "react";
import {
  Loader,
  Form,
  Checkbox,
  Button,
  Message,
  Segment
} from "semantic-ui-react";
import LoginForm from "./form";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import reducer from "./reducer";
import saga from "./saga";
import injectReducer from "../../../utils/injectReducer";
import injectSaga from "../../../utils/injectSaga";
import "./styles.less";
import { tryLogin } from "./actions";
import { withRouter } from 'react-router-dom';

class LoginPage extends React.Component {
  render() {
    return (
      <div className="login-layout">
        <Segment padded="very">
          <h2 className="ui teal image header">
            <div className="content">
              <div className="app-logo" />
              <span>Погода</span>
            </div>
          </h2>
          <LoginForm
            onSubmit={this.onSubmit}
            loading={this.props.isFetching}
            serverError={this.props.serverError}
          />
        </Segment>
      </div>
    );
  }
  onSubmit = loginData => {
    this.props.dispatch(tryLogin(loginData));
  };
  componentDidMount() {}
}

const withConnect = connect(state => {
  return state.get("login").toJS();
});
const withSaga = injectSaga({ key: "login", saga });
const withReducer = injectReducer({
  key: "login",
  reducer
});
export default withRouter(compose(withReducer, withSaga, withConnect)(LoginPage));
