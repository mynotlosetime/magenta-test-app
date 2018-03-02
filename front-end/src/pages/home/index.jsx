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
import YaMap from "../../components/YaMap";
import AddressSearch from "../../components/AddressSearch";
import { addressesRequest } from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import injectReducer from "../../../utils/injectReducer";
import injectSaga from "../../../utils/injectSaga";

class HomePage extends React.Component {
  basePath = "/home";

  map;
  addressOptions = [
    // {
    //   title: "Aufderhar, Jast and Bashirian",
    //   description: "Robust client-driven protocol",
    //   value: "1"
    // },
    // {
    //   title: "sdasd",
    //   description: "dddddddddd",
    //   value: "2"
    // }
  ];

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
              <Menu.Item name="Выход" onClick={this.logout} />
            </Menu.Menu>
          </Menu>
        </div>
        <div className="home-body">
          <AddressSearch
            loading={this.props.addressesLoading}
            onSearch={this.onAdressSearch}
            onResultSelect={this.onPointSelect}
            options={this.addressOptions}
          />
          <YaMap
            ref={map => (this.map = map)}
            onPointSelect={this.onPointSelect}
          />
        </div>
      </div>
    );
  }

  onAdressSearch = queryString => {
    this.props.dispatch(addressesRequest(queryString));
    //запрос на сервер яндекса -> получение addressOptions
  };
  onPointSelect = geoObject => {
    // тут будет полный GeoObject

    console.log(geoObject);
    //выставление в селект или карту -> запрос на сервер погоды
  };
}

const withConnect = connect(state => {
  return state.get("home").toJS();
});
const withSaga = injectSaga({ key: "homeSaga", saga });
const withReducer = injectReducer({
  key: "home",
  reducer
});
export default compose(withReducer, withSaga, withConnect)(
  HomePage
);
