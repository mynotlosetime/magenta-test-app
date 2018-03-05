import React from "react";
import "./styles.less";
import { Loader, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";

export default class WeatherView extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div className="weather-view">
        {this.props.loading ? (
          <Dimmer active inverted>
            <Loader inverted>Загрузка</Loader>
          </Dimmer>
        ) : (
          <div>inner content</div>
        )}
      </div>
    );
  }
}
