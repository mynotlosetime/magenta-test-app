import { Controller, Get } from "@nestjs/common";
import { UserService } from "../models/entity/user/user.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async findAll() {}
}
