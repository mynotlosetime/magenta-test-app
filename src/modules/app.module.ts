import {
  Module,
  MiddlewaresConsumer,
  RequestMethod
} from "@nestjs/common";
import { WeatherController } from "../controllers/weather.controller";
import { DatabaseModule } from "../models/database.module";
import { UserService } from "../models/entity/user/user.service";
import { userProviders } from "../models/entity/user/user.entity";
import { profilesProviders } from "../models/entity/profile/profile.entity";
import { AuthController } from "../controllers/auth.controller";
import { SessionMiddleware } from "../common/session.middleware";

@Module({
  modules: [DatabaseModule],
  controllers: [WeatherController, AuthController],
  components: [
    UserService,
    ...userProviders,
    ...profilesProviders
  ]
})
export class ApplicationModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(SessionMiddleware)
      .forRoutes(AuthController, {
        path: "/**",
        method: RequestMethod.ALL
      });
  }
}
