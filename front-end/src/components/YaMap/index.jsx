import React from "react";
import "./styles.less";
import { connect } from "react-redux";
import { compose } from "redux";

export default class YaMap extends React.Component {
  map;
  myPlacemark;

  componentDidMount() {
    ymaps.ready(this.initMap.bind(this));
  }
  componentWillUnmount() {
    this.map.destroy();
  }
  initMap() {
    this.map = new ymaps.Map(
      "map",
      {
        center: [55.753994, 37.622093],
        zoom: 9,
        controls: ["zoomControl"]
      },
      {
        searchControlProvider: "yandex#search"
      }
    );
    this.map.events.add("click", e => {
      var coords = e.get("coords");
      this.onMapClick(coords);
    });
    navigator.geolocation.getCurrentPosition(position => {
      const coordinates = [
        position.coords.latitude,
        position.coords.longitude
      ];
      this.onMapClick(coordinates);
      this.setMapCenter(coordinates);
    });
  }

  onMapClick = coordinates => {
    this.setPlaceMarkPosition(coordinates);
    this.myPlacemark.properties.set("iconCaption", "поиск...");
    this.getAddress(coordinates);
  };

  setPlaceMarkPosition(coords) {
    if (this.myPlacemark) {
      // Если метка уже создана – просто передвигаем ее.
      this.myPlacemark.geometry.setCoordinates(coords);
    } else {
      // Если нет – создаем.
      this.myPlacemark = this.createPlacemark(coords);
      this.map.geoObjects.add(this.myPlacemark);
      // Слушаем событие окончания перетаскивания на метке.
      this.myPlacemark.events.add("dragend", () => {
        this.getAddress(this.myPlacemark.geometry.getCoordinates());
      });
    }
  }

  setPlaceMarkAddress(address) {
    this.myPlacemark.properties.set({
      iconCaption: address,
      balloonContent: address
    });
  }

  setMapCenter(coordinates) {
    this.map.setCenter(coordinates, this.map.getZoom(), {
      checkZoomRange: true
      // duration: 400
    });
  }

  getAddress(coordinates) {
    this.innerCooridnate = coordinates;
    this.props.onGetAddressRequest(coordinates);
  }

  createPlacemark(coords) {
    // Создание метки.
    return new ymaps.Placemark(
      coords,
      {
        iconCaption: "поиск..."
      },
      {
        preset: "islands#violetDotIconWithCaption",
        draggable: true
      }
    );
  }
  isSamePosition(coordinates) {
    if (!this.myPlacemark) {
      return false;
    } else {
      return (
        this.myPlacemark.geometry.getCoordinates()[0] ==
        coordinates[0]
      );
    }
  }

  render() {
    if (this.props.mapPoint && this.map) {
      const coordinates = this.props.mapPoint.coordinates;
      // определяем с карты ли был отправлен запрос на адрес
      if (!this.props.mapPoint.isReverseGeocoding) {
        this.setMapCenter(coordinates);
      }
      if (!this.isSamePosition(coordinates)) {
        this.setPlaceMarkPosition(coordinates);
      }
      this.setPlaceMarkAddress(this.props.mapPoint.address);
    }
    return <div id="map" className="map-container" />;
  }
}
