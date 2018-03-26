import { Sequelize } from "sequelize-typescript";
import { User } from "./entity/user/user.entity";
import { Profile } from "./entity/profile/profile.entity";
import { UserService } from "../services/user.service";

export const databaseProviders = [
  {
    provide: "SequelizeToken",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: "mysql",
        host: "46.254.20.48",
        username: "smart-food",
        password: "bUKCrMW2Y92QtmMY",
        database: "smart-food",
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      });

      sequelize.addModels([User, Profile]);
      await sequelize.sync({ force: true });
      await UserService.createTestData();
      return sequelize;
    }
  }
];
