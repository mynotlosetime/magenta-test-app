import { Component, Inject, HttpStatus } from "@nestjs/common";
import { Model } from "sequelize-typescript";
import { User } from "./user.entity";
import { Sequelize } from "sequelize-typescript/lib/models/Sequelize";
import { Profile } from "../profile/profile.entity";
import { DataConst } from "../../database.constants";
import { HttpException } from "@nestjs/core";
import { ForbiddenException } from "../../../common/exceptions/forbidden.exceprion";

@Component()
export class UserService {
  constructor(
    @Inject("UsersRepository")
    private readonly usersRepository: typeof Model,
    @Inject("ProfilesRepository")
    private readonly profilesRepository: typeof Model
  ) {}

  static async createTestData(): Promise<User> {
    const person = User.create<User>(
      {
        email: "re@re.re",
        age: 99,
        password: "123",
        profile: {
          firstName: "Bob",
          lastName: "Alice"
        }
      },{
        include: [Profile]
      }
    );
    return person;
  }

  async login(loginData): Promise<User> {
    const user: User = await User.findOne<User>({
      where: { email: loginData.email },
      include: [Profile]
    });

    if (user) {
      const isValidPassword = user.checkPassword(
        loginData.password
      );
      if (isValidPassword) {
        return user;
      }
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }
}
