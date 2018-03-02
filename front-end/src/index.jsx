import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./app";
import { Provider } from "react-redux";
import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import configureStore from "./configure-store";
import createHistory from "history/createBrowserHistory";
import { BrowserRouter, Route } from "react-router-dom";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware,
  push
} from "react-router-redux";

const history = createHistory();
const appRouterMiddleware = routerMiddleware(history);

let store = configureStore({}, history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer>
        <App />
      </AppContainer>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("app")
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./app", () => {
    const NextApp = require("./app").default;
    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppContainer>
            <NextApp />
          </AppContainer>
        </ConnectedRouter>
      </Provider>,
      document.getElementById("app")
    );
  });
}
