import { Component, Inject, HttpStatus } from "@nestjs/common";
import { Model } from "sequelize-typescript";
import { Sequelize } from "sequelize-typescript/lib/models/Sequelize";
import { DataConst } from "../models/database.constants";
import { HttpException } from "@nestjs/core";
import { ForbiddenException } from "../common/exceptions/forbidden.exceprion";
import config from "../config";
import { Profile } from "../models/entity/profile/profile.entity";
import { User } from "../models/entity/user/user.entity";
import { LoginDataDto } from "../models/dto/loginData.dto";

/** UserService - сервис для управления пользователями */
@Component()
export class UserService {
  constructor(
    @Inject("UsersRepository")
    private readonly usersRepository: typeof Model,
    @Inject("UsersLogger") private readonly usersLogger
  ) {}

  /** Создание пользователей для приложения. */
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

  /** Поиск пользователя и проверка пароля
   * @param loginData - данные для поиска
   * @return - промис с данными пользователя
   */
  async login(loginData: LoginDataDto): Promise<User> {
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

  //** Поиск всех пользователей */
  async findAll(): Promise<User[]> {
    return await this.usersRepository.findAll<User>();
  }
}
