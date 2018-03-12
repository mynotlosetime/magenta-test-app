import { Inject, Component } from "@nestjs/common";
import axios from "axios";
import config from "../config";
import * as querystring from "querystring";
import { Func } from "continuation-local-storage";

@Component()
export class WeatherService {
  private weatherConfig = config.get("weather");

  //очередь для запроса на удаленный сервер погоды
  private requestsQueue: WeatherRequest[] = [];

  constructor() {
    // переодически проверяем её
    setInterval(
      this.checkQueue.bind(this),
      this.weatherConfig.requestsCheckInterval
    );
  }

  //если есть данные для запросов делаем их, и затем отвечаем клиентам
  private queueHandling: boolean = false;
  private async checkQueue() {
    if (!this.requestsQueue.length || this.queueHandling) return;

    const handlingQueuePart: WeatherRequest[] = this.requestsQueue.slice();
    this.requestsQueue.length = 0;

    this.queueHandling = true;
    for (let i = 0; i < handlingQueuePart.length; i++) {
      const req: WeatherRequest = handlingQueuePart[i],
        weather = await this.getWeather(req.latitude, req.longitude);
      req.resolve(weather);
    }
    this.queueHandling = false;
  }
  /* при получении запроса на погоду от клиента,
  добавляем его запрос в очередь и возвращаем промис */
  getWeatherСonsistently(
    latitude: number,
    longitude: number
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this.requestsQueue.push({ latitude, longitude, resolve });
    });
  }

  /* метод для получения погоды (может так же использоваться снаружи напрямую, 
  если не нужны последовательные запросы) */
  async getWeather(
    latitude: number,
    longitude: number
  ): Promise<any> {
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
}

interface WeatherRequest {
  latitude: number;
  longitude: number;
  resolve: Function;
}
