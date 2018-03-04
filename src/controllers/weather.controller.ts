import { Controller, Get, Query } from "@nestjs/common";
import { WeatherService } from "../services/weather.service";

@Controller("weather")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query() query) {
    return await this.weatherService.getWeather(
      query.latitude,
      query.longitude
    );
  }
}
