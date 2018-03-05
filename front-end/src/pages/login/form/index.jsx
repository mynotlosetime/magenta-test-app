import React from "react";
import {
  Loader,
  Form,
  Checkbox,
  Button,
  Message,
  Segment
} from "semantic-ui-react";
import "./styles.less";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const errorMessage = this.props.serverError && (
      <Message negative>
        <p>{this.props.serverError}</p>
      </Message>
    );

    return (
      <Form
        loading={this.props.loading}
        className="login-form"
        onSubmit={this.handleSubmit}
      >
        <Form.Field>
          <input
            required
            placeholder="Email"
            name="email"
            ref={input => (this.emailInput = input)}
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder="Password"
            type="password"
            name="password"
            ref={input => (this.passwordInput = input)}
          />
        </Form.Field>
        <Form.Field>
          <Button type="submit" fluid primary content="Войти" />
        </Form.Field>
        {errorMessage}
      </Form>
    );
  }

  handleSubmit = () => {
    this.props.onSubmit({
      email: this.emailInput.value,
      password: this.passwordInput.value
    });
  };
}
