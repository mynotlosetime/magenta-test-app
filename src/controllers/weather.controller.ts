import { Controller, Get, Query } from "@nestjs/common";
import { WeatherService } from "../services/weather.service";

@Controller("weather")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query() query) {
    const weather = await this.weatherService.getWeatherСonsistently(
      query.latitude,
      query.longitude
    );
    return weather;
  }
}
