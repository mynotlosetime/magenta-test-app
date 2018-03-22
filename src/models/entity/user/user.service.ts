import { Component, Inject, HttpStatus } from "@nestjs/common";
import { Model } from "sequelize-typescript";
import { User } from "./user.entity";
import { Sequelize } from "sequelize-typescript/lib/models/Sequelize";
import { Profile } from "../profile/profile.entity";
import { DataConst } from "../../database.constants";
import { HttpException } from "@nestjs/core";
import { ForbiddenException } from "../../../common/exceptions/forbidden.exceprion";
import config from "../../../config";

@Component()
export class UserService {
  constructor(
    @Inject("UsersRepository")
    private readonly usersRepository: typeof Model,
    @Inject("UsersLogger") private readonly usersLogger
  ) {}

  static async createTestData(): Promise<any> {
    const defaultUser = config.get("defaultUser");
    const alice = User.create<User>(defaultUser, {
      include: [Profile]
    });
    const bob = User.create<User>(
      {
        email: "bob@mail.com",
        age: 45,
        password: "321",
        profile: {
          firstName: "Bob",
          lastName: "Servantes"
        }
      },
      {
        include: [Profile]
      }
    );
    return [alice, bob];
  }

  async login(loginData): Promise<User> {
    const user: User = await User.findOne<User>({
      where: { email: loginData.email },
      include: [Profile]
    });

    if (user) {
      const isValidPassword: boolean = user.checkPassword(
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
