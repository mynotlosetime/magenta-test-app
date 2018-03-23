import { ApiModelProperty } from "@nestjs/swagger";

export class LoginDataDto {
  @ApiModelProperty({
    description: "Электронная почта пользователя"
  })
  readonly email: string;

  @ApiModelProperty({
    description: "Пароль пользователя"
  })
  readonly password: string;
}
