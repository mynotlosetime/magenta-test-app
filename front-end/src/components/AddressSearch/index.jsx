import React from "react";
import "./styles.less";
import { Dropdown, Search } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";

export default class AddressSearch extends React.Component {
  addressOptions = [
    {
      title: "Aufderhar, Jast and Bashirian",
      description: "Robust client-driven protocol"
    },
    {
      title: "sdasd",
      description: "dddddddddd"
    }
  ];

  componentDidMount() {}

  render() {
    return (
      <div className="address-search">
        <Search
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={this.addressOptions}
        />
      </div>
    );
  }

  handleResultSelect() {
    console.log("select");
  }

  handleSearchChange() {
    console.log("change");
  }
}
