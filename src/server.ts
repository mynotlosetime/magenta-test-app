import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { RolesGuard } from "./common/roles.guard";
import { AnyExceptionFilter } from "./common/filters/exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.useGlobalGuards(new RolesGuard());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.useGlobalFilters(app["get"](AnyExceptionFilter));

  await app.listen(3000);
}
bootstrap();
