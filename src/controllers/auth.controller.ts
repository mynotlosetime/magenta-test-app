import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  Inject
} from "@nestjs/common";
import { UserService } from "../models/entity/user/user.service";
import config from "../config";
import { ForbiddenException } from "../common/exceptions/forbidden.exceprion";

@Controller("auth")
export class AuthController {
  constructor(
    @Inject("UsersLogger") private readonly usersLogger,
    private readonly usersService: UserService
  ) {}

  @Post("login")
  async login(@Body() loginData: any, @Req() req) {
    const user = await this.usersService.login(loginData);
    if (user) {
      const isUserAuth = req.session.user;
      if (!req.session.user) {
        req.session.user = user;
      }
      this.usersLogger.info(`
          user: ${req.session.user.email},
          action: Auth
      `);
      return [user];
    } else {
      throw new ForbiddenException("Incorrect login data");
    }
  }
  @Post("logout")
  async logout(@Req() req) {
    if (req.session && req.session.user) {
      this.usersLogger.info(`
          user: ${req.session.user.email},
          action: Logout
    `);
      req.session.destroy();
    }
    return true;
  }
  @Get("signal")
  async signal(@Req() req) {
    if (req.session.user) {
      return [req.session.user];
    } else {
      throw new ForbiddenException("No Access");
    }
  }
}
