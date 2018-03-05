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
import WeatherView from "../../components/WeatherView";
import {
  addressesRequest,
  geoCoderRequest,
  weatherRequest,
  geoCoderResponse
} from "./actions";
import reducer from "./reducer";
import saga from "./saga";
import injectReducer from "../../../utils/injectReducer";
import injectSaga from "../../../utils/injectSaga";

class HomePage extends React.Component {
  basePath = "/home";
  map;
  addressSearch;

  componentDidMount() {}

  logout = () => {
    this.props.dispatch(logoutRequest());
  };
  render() {
    return (
      <div className="home-layout">
        <div className="side-panel">
          <AddressSearch
            ref={addressSearch =>
              (this.addressSearch = addressSearch)
            }
            address={this.props.mapPoint.address}
            loading={this.props.addresses.loading}
            onSearch={this.onAdressSearch}
            onResultSelect={this.onAdressSelect}
            options={this.props.addresses.items}
          />
          <WeatherView loading={this.props.weather.loading} />
        </div>
        <YaMap
          ref={map => (this.map = map)}
          onGetAddressRequest={this.onMapPointSelect}
          mapPoint={this.props.mapPoint}
        />
        <div className="logout-btn" onClick={this.logout}>
          <span>Выход</span>
          <i className="sign out alternate icon" />
        </div>
      </div>
    );
  }

  onAdressSearch = queryString => {
    this.props.dispatch(addressesRequest(queryString));
  };
  onAdressSelect = address => {
    this.props.dispatch(geoCoderRequest(address));
  };
  onMapPointSelect = coordinates => {
    this.props.dispatch(geoCoderRequest(coordinates));
  };

  // onGeocoderResponse = coordinates => {

  //   this.addressSearch.setSearchValue(addressWithCoord.address);
  //   this.props.dispatch(weatherRequest(addressWithCoord.coordinates));
  // };
}

const withConnect = connect(state => {
  const home = state.get("home");
  return {
    weather: home.get("weather").toJS(),
    addresses: home.get("addresses").toJS(),
    mapPoint: home.get("mapPoint").toJS()
  };
});
const withSaga = injectSaga({ key: "homeSaga", saga });
const withReducer = injectReducer({
  key: "home",
  reducer
});
export default compose(withReducer, withSaga, withConnect)(HomePage);
