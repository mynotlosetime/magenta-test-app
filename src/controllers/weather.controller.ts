import { Controller, Get, Query } from "@nestjs/common";
import { WeatherService } from "../services/weather.service";
import { WeatherRequestDto } from "../models/dto/weatherRequest.dto";

@Controller("weather")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async getWeather(@Query() query: WeatherRequestDto) {
    const weather = await this.weatherService.getWeatherСonsistently(
      query.latitude,
      query.longitude
    );
    return weather;
  }
}
