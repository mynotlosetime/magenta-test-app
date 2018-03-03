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
        <div>
          <Menu pointing secondary>
            <Menu.Menu position="right">
              <Menu.Item name="Выход" onClick={this.logout} />
            </Menu.Menu>
          </Menu>
        </div>
        <div className="home-body">
          <AddressSearch
            ref={addressSearch =>
              (this.addressSearch = addressSearch)
            }
            loading={this.props.addressesLoading}
            onSearch={this.onAdressSearch}
            onResultSelect={this.onAdressSelect}
            options={this.props.addressItems}
          />
          <YaMap
            ref={map => (this.map = map)}
            onPointSelect={this.onMapSelect}
            mapPoint={this.props.mapPoint}
          />
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
  onMapSelect = addressWithCoord => {
    this.props.dispatch(geoCoderResponse(addressWithCoord));
    this.addressSearch.setSearchValue(addressWithCoord.address);
    this.props.dispatch(
      weatherRequest(addressWithCoord.coordinates)
    );
  };
}

const withConnect = connect(state => {
  const home = state.get("home");
  let addressItems = home.get("addressItems").map(item => {
    const address = item.displayName.split(", ").reverse();
    return {
      key: item.displayName,
      title: address[0],
      description: address
        .slice(1)
        .reverse()
        .join(", ")
    };
  });
  return {
    addressesLoading: home.get("addressesLoading"),
    addressItems,
    mapPoint: home.get("mapPoint")
  };
});
const withSaga = injectSaga({ key: "homeSaga", saga });
const withReducer = injectReducer({
  key: "home",
  reducer
});
export default compose(withReducer, withSaga, withConnect)(
  HomePage
);
