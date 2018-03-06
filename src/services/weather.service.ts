import { Inject, Component } from "@nestjs/common";
import axios from "axios";
import config from "../config";
import * as querystring from "querystring";

@Component()
export class WeatherService {
  private weatherConfig = config.get("weather");

  requestsQueue: any[] = [
    /* ? */
  ];
  /*requestQueueIteratorInit() {
    setInterval(()=>{
      if(requestQueue.length && !queueIsDone){
         requestQueue.forEach( req =>
         const res = await axious (req.long.lat);
         req.resolve(res);
      } else {
        queueIsDone = true
        // берем сканируем очереди каждые 20 мс не оптимально
      }
    })
  }*/
  constructor() {}

  // async getWeatherAsQueue(
  //   latitude: number,
  //   longitude: number
  // ): Promise<any> {
  //   this.requestsQueue.push({ latitude, longitude, id: "id" });
  //   return new Promise((resolve, reject) => {
  //     /*
  //       this.requestsQueue.push({ latitude, longitude, resolve });
  //     })*/
  //   });
  // }

  async getWeather(latitude: number, longitude: number): Promise<any> {
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
