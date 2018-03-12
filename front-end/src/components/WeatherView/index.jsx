import React from "react";
import "./styles.less";
import { Loader, Dimmer } from "semantic-ui-react";
import { connect } from "react-redux";
import { compose } from "redux";

export default class WeatherView extends React.Component {
  weatherTypes = {
    Clouds: {
      iconClass: "clouds",
      translate: "Облачно"
    },
    Clear: {
      iconClass: "clear",
      translate: "Ясно"
    },
    Rain: {
      iconClass: "rain",
      translate: "Дождь"
    },
    Mist: {
      iconClass: "clouds",
      translate: "Туман"
    },
    Snow: {
      iconClass: "snow",
      translate: "Снег"
    }
  };

  componentDidMount() {}

  render() {
    return (
      <div className="weather-view">
        {this.props.loading || !this.props.weather ? (
          <Dimmer active inverted>
            <Loader inverted>Загрузка</Loader>
          </Dimmer>
        ) : (
          this.renderWeatherView()
        )}
      </div>
    );
  }
  renderWeatherView() {
    const weatherCode = this.props.weather.weather[0].main,
      weatherObject =
        this.weatherTypes[weatherCode] || this.weatherTypes["Clear"];

    return (
      <div className="weather-layout">
        <div className="main-block">
          <div>Сейчас</div>
          <div className="icon-block">
            <div className={"main-icon " + weatherObject.iconClass} />
            <div className="main-details">
              <div className="temp">
                {this.props.weather.main.temp > 0 && "+"}
                {Math.round(this.props.weather.main.temp)}
              </div>
              <div className="type">{weatherObject.translate}</div>
            </div>
          </div>
        </div>
        <div className="details-block">
          <div>
            <div className="title">Ветер</div>
            <div className="data">
              <div className="value">
                {Math.round(this.props.weather.wind.speed)}
              </div>
              <div>
                {"м/с, " +
                  this.convertDegreesToDirection(
                    this.props.weather.wind.deg
                  )}
              </div>
            </div>
          </div>
          <div>
            <div className="title">Давление</div>
            <div className="data">
              <div className="value">
                {Math.round(this.props.weather.main.pressure * 0.75)}
              </div>
              <div>мм рт. ст.</div>
            </div>
          </div>
          <div>
            <div className="title">Влажность</div>
            <div className="data">
              <div className="value">
                {this.props.weather.main.humidity}
              </div>
              <div>%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  convertDegreesToDirection(deg) {
    let res = "";
    if (!deg) return res;
    if (deg > 0 && deg < 90) {
      res = "СВ";
    } else if (deg > 90 && deg < 180) {
      res = "ЮВ";
    } else if (deg > 180 && deg < 270) {
      res = "ЮЗ";
    } else {
      res = "ЮВ";
    }
    return res;
  }
}
