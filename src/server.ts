import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { RolesGuard } from "./common/roles.guard";
import { AnyExceptionFilter } from "./common/filters/exception.filter";
import { INestApplication } from "@nestjs/common";

export async function bootstrap(port?: number) {
  const app: INestApplication = await NestFactory.create(
    ApplicationModule
  );
  initMiddlewares(app);
  await app.listen(port || 3000);
  return app;
}

export function initMiddlewares(app: INestApplication) {
  app.useGlobalGuards(new RolesGuard());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.useGlobalFilters(app["get"](AnyExceptionFilter));
}
