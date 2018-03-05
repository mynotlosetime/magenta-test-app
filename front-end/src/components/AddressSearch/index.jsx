import React from "react";
import "./styles.less";
import { Dropdown, Search } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";

export default class AddressSearch extends React.Component {
  search;

  componentDidMount() {}

  render() {
    return (
      <div className="address-search">
        <Search
          fluid
          loading={this.props.loading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={this.handleSearchChange}
          results={this.props.options}
          ref={search => (this.search = search)}
        />
      </div>
    );
  }

  handleResultSelect = (e, search) => {
    this.search.setValue(search.result.key);
    this.props.onResultSelect(search.result.key);
  };

  searchPendingTimer;
  handleSearchChange = e => {
    clearTimeout(this.searchPendingTimer);
    this.searchPendingTimer = setTimeout(() => {
      this.props.onSearch(this.search.state.value);
    }, 400);
  };

  setSearchValue(value) {
    this.search.setValue(value);
    this.props.onSearch(value);
  }
}
