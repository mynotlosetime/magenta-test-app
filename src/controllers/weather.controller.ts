import { Controller, Get, Query } from "@nestjs/common";
import { WeatherService } from "../services/weather.service";
import { WeatherRequestDto } from "../models/dto/weatherRequest.dto";
import { apiDoc } from "./endPoints.doc";
import { ApiOperation } from "@nestjs/swagger";

@Controller("weather")
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @ApiOperation(apiDoc.GET_WEATHER)
  @Get()
  async getWeather(@Query() query: WeatherRequestDto) {
    const weather = await this.weatherService.getWeatherСonsistently(
      query.latitude,
      query.longitude
    );
    return weather;
  }
}
