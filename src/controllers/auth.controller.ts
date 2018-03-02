import {
  Controller,
  Get,
  Post,
  Body,
  Req
} from "@nestjs/common";
import { UserService } from "../models/entity/user/user.service";
import config from "../config";
import { ForbiddenException } from "../common/exceptions/forbidden.exceprion";

@Controller("auth")
export class AuthController {
  constructor(private readonly usersService: UserService) {}

  @Post("login")
  async login(@Body() loginData: any, @Req() req) {
    const user = await this.usersService.login(loginData);
    if (user) {
      const isUserAuth = req.session.user;
      if (!req.session.user) {
        req.session.user = user;
      }
      return [user];
    } else {
      throw new ForbiddenException("Incorrect login data");
    }
  }
  @Post("logout")
  async logout(@Req() req) {
    req.session.destroy();
    console.log(req.session);
  }
  @Get("signal")
  async signal(@Req() req) {
    if (req.session.user) {
      return [];
    } else {
      throw new ForbiddenException("No Access");
    }
  }
}
