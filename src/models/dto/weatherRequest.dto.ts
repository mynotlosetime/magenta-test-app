import { ApiModelProperty } from "@nestjs/swagger";

export class WeatherRequestDto {
  @ApiModelProperty({
    description: "Географическая широта в градусах"
  })
  readonly latitude: number;

  @ApiModelProperty({
    description: "Географическая долгота в градусах"
  })
  readonly longitude: number;
}
