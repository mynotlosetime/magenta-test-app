import { QueueService } from "./queue.service";
import { Inject, Component } from "@nestjs/common";
import axios from "axios";
import config from "../config";
import * as querystring from "querystring";
import { Func } from "continuation-local-storage";

/**
 * WeatherService - сервис для запросов данных о погоде
 */
@Component()
export class WeatherService {
  private weatherConfig = config.get("weather");

  constructor(private readonly queueSevice: QueueService) {
    this.initQueueService();
  }

  /** Инициализация сервиса последовательны обработки запросов */
  initQueueService(): void {
    this.queueSevice.init(this.requestHandler);
  }

  /** Обработчик запроса для {@link QueueService} на данные о погоде */
  requestHandler = async (req: WeatherRequest) => {
    try {
      const weather = await this.getWeather(
        req.latitude,
        req.longitude
      );
      req.resolve(weather);
    } catch (e) {
      req.reject(e);
    }
  };

  /**
   * Получение погоды последовательно
   * Добавляем запрос в очередь и возвращаем промис.
   * @param latitude - широта.
   * @param longitude - долгота.
   */
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

  /**
   * Метод для получения погоды (может так же использоваться
   * снаружи напрямую, если не нужны последовательные запросы).
   * @param latitude - широта
   * @param longitude - долгота
   * */
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

  /**
   * Валидация географических координат.
   * @param latitude - широта
   * @param longitude - долгота
   */
  isValidCoordinates(latitude: number, longitude: number): boolean {
    const isValidLatitude: boolean = latitude > -90 && latitude < 90;
    const isValidLongitude: boolean =
      longitude > -180 && longitude < 180;
    return isValidLatitude && isValidLongitude;
  }
}

/**
 * WeatherRequest - обьект запроса для
 *  {@link QueueService.requestHandleFunction}
 */
interface WeatherRequest {
  latitude: number;
  longitude: number;
  resolve: Function;
  reject: Function;
}
