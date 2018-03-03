import { Controller, Get, Query } from "@nestjs/common";

@Controller("weather")
export class WeatherController {
  constructor() {}

  @Get()
  async getWeather(@Query() query) {
    console.log(query.latitude, query.longitude);
    //идем на weather api
    return true;
  }
}
