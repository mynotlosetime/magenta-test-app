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
      this.setPlaceMarkPosition(coords);
    });
    navigator.geolocation.getCurrentPosition(position => {
      const coordinaties = [
        position.coords.latitude,
        position.coords.longitude
      ];
      this.setPlaceMarkPosition(coordinaties);
      this.setMapCenter(coordinaties);
    });
  }

  setPlaceMarkPosition(coords, address) {
    if (this.myPlacemark) {
      // Если метка уже создана – просто передвигаем ее.
      this.myPlacemark.geometry.setCoordinates(coords);
    } else {
      // Если нет – создаем.
      this.myPlacemark = this.createPlacemark(coords);
      this.map.geoObjects.add(this.myPlacemark);
      // Слушаем событие окончания перетаскивания на метке.
      this.myPlacemark.events.add("dragend", () => {
        this.getAddress(
          this.myPlacemark.geometry.getCoordinates()
        );
      });
    }
    if (address) {
      this.setPlaceMarkAddress(address);
    } else {
      this.getAddress(coords);
    }
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

  getAddress(coords) {
    // Определяем адрес по координатам (обратное геокодирование).
    this.myPlacemark.properties.set("iconCaption", "поиск...");
    ymaps.geocode(coords).then(res => {
      var firstGeoObject = res.geoObjects.get(0),
        pointAddress = firstGeoObject.getAddressLine();

      // кидаем событие выбора точки
      this.innerMapPointAddress = pointAddress;
      this.props.onPointSelect({
        address: pointAddress,
        coordinates: firstGeoObject.geometry.getCoordinates()
      });
      this.setPlaceMarkAddress(pointAddress);
    });
  }

  setPlaceMarkAddress(address) {
    this.myPlacemark.properties.set({
      iconCaption: address,
      balloonContent: address
    });
  }
  setMapCenter(coordinates) {
    this.map.setCenter(coordinates, this.map.getZoom(), {
      checkZoomRange: true,
      duration: 400
    });
  }

  innerMapPointAddress;
  render() {
    if (this.props.mapPoint) {
      const selectOutside =
        this.props.mapPoint.address != this.innerMapPointAddress;

      if (selectOutside) {
        // выбор был сделан из внешнего источника ( селект )
        this.setPlaceMarkPosition(
          this.props.mapPoint.coordinates,
          this.props.mapPoint.address
        );
        this.setMapCenter(this.props.mapPoint.coordinates);
      }
      this.prevMapPointAddress = this.props.mapPoint.address;
    }
    return <div id="map" className="map-container" />;
  }
}
