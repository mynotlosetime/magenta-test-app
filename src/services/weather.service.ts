import { Inject, Component } from "@nestjs/common";
import axios from "axios";
import config from "../config";
import * as querystring from "querystring";

@Component()
export class WeatherService {
  private weatherConfig = config.get("weather");

  constructor() {}

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
