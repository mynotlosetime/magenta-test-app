import { QueueService } from "./queue.service";
import { Inject, Component } from "@nestjs/common";
import axios from "axios";
import config from "../config";
import * as querystring from "querystring";
import { Func } from "continuation-local-storage";

@Component()
export class WeatherService {
  private weatherConfig = config.get("weather");

  //очередь для запроса на удаленный сервер погоды

  constructor(private readonly queueSevice: QueueService) {
    this.queueSevice.init(async (req: WeatherRequest) => {
      try {
        const weather = await this.getWeather(
          req.latitude,
          req.longitude
        );
        req.resolve(weather);
      } catch (e) {
        req.reject(e);
      }
    });
  }
  /* при получении запроса на погоду от клиента,
  добавляем его запрос в очередь и возвращаем промис */
  getWeatherСonsistently(
    latitude: number,
    longitude: number
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.queueSevice.addRequest({
        latitude,
        longitude,
        resolve,
        reject
      });
    });
  }

  /* метод для получения погоды (может так же использоваться снаружи напрямую, 
  если не нужны последовательные запросы) */
  async getWeather(
    latitude: number,
    longitude: number
  ): Promise<any> {
    if (!this.isValidCoordinates(latitude, longitude)) {
      throw new Error("Invalid coordinates value");
    }
    try {
      const weather = await axios.get(
        this.weatherConfig.basePath +
          querystring.stringify({
            appid: this.weatherConfig.apiKey,
            lat: latitude,
            lon: longitude,
            units: "metric"
          })
      );
      return weather.data;
    } catch (e) {
      throw new Error("Weather api response error");
    }
  }
  isValidCoordinates(latitude: number, longitude: number): boolean {
    const isValidLatitude: boolean = latitude > -90 && latitude < 90;
    const isValidLongitude: boolean =
      longitude > -180 && longitude < 180;
    return isValidLatitude && isValidLongitude;
  }
}

interface WeatherRequest {
  latitude: number;
  longitude: number;
  resolve: Function;
  reject: Function;
}
