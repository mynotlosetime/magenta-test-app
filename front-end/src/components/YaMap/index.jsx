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

      // Если метка уже создана – просто передвигаем ее.
      if (this.myPlacemark) {
        this.myPlacemark.geometry.setCoordinates(coords);
      } else {
        // Если нет – создаем.
        this.myPlacemark = this.createPlacemark(coords);
        this.map.geoObjects.add(this.myPlacemark);
        // Слушаем событие окончания перетаскивания на метке.
        this.myPlacemark.events.add("dragend", function() {
          getAddress(myPlacemark.geometry.getCoordinates());
        });
      }
      this.getAddress(coords);
    });
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
      var firstGeoObject = res.geoObjects.get(0);
      this.props.onPointSelect(firstGeoObject.geometry.getCoordinates());
      this.myPlacemark.properties.set({
        // Формируем строку с данными об объекте.
        iconCaption: [
          // Название населенного пункта или вышестоящее административно-территориальное образование.
          firstGeoObject.getLocalities().length
            ? firstGeoObject.getLocalities()
            : firstGeoObject.getAdministrativeAreas(),
          // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
          firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
        ]
          .filter(Boolean)
          .join(", "),
        // В качестве контента балуна задаем строку с адресом объекта.
        balloonContent: firstGeoObject.getAddressLine()
      });
    });
  }

  render() {
    return <div id="map" className="map-container" />;
  }
}
