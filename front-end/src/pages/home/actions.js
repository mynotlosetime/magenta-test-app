export const ADDRESSES_REQUEST = "pages/home/ADDRESSES_REQUEST",
  ADDRESSES_RESPONSE = "pages/home/ADDRESSES_RESPONSE",
  addressesRequest = query => {
    //запрос на сервер яндекса -> получение адресов по строке

    console.log(query);
    return {
      type: ADDRESSES_REQUEST,
      query
    };
  },
  addressesResponse = items => {
    return {
      type: ADDRESSES_RESPONSE,
      items
    };
  },
  GEOCODER_REQUEST = "pages/home/GEOCODER_REQUEST",
  GEOCODER_RESPONSE = "pages/home/GEOCODER_RESPONSE",
  geoCoderRequest = addressOrCoordinates => {
    //запрос на геокодер яндекса -> получение координат по строке
    return {
      type: GEOCODER_REQUEST,
      query: addressOrCoordinates
    };
  },
  geoCoderResponse = mapPoint => {
    return {
      type: GEOCODER_RESPONSE,
      mapPoint
    };
  },
  WEATHER_REQUEST = "pages/home/WEATHER_REQUEST",
  WEATHER_RESPONSE = "pages/home/WEATHER_RESPONSE",
  weatherRequest = coordinates => {
    //запрос на наш сервер -> получение погоды по координатам
    return {
      type: WEATHER_REQUEST,
      coordinates
    };
  },
  weatherResponse = item => {
    return {
      type: WEATHER_RESPONSE,
      item
    };
  };
