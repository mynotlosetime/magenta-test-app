export const LOGIN_FAILURE = "pages/login/LOGIN_FAILURE",
  loginFailure = error => {
    return {
      type: LOGIN_FAILURE,
      error
    };
  },
  LOGIN_SUCCESS = "pages/login/LOGIN_SUCCESS",
  loginSuccess = result => {
    return {
      type: LOGIN_SUCCESS,
      result
    };
  },
  LOGIN_REQUEST = "pages/login/LOGIN_REQUEST",
  tryLogin = loginData => {
    return {
      type: LOGIN_REQUEST,
      loginData
    };
  };
