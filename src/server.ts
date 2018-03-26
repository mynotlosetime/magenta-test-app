import { NestFactory } from "@nestjs/core";
import { ApplicationModule } from "./modules/app.module";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { RolesGuard } from "./common/roles.guard";
import { AnyExceptionFilter } from "./common/filters/exception.filter";
import { INestApplication } from "@nestjs/common";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

/**
 * Главная функция инициализирующая приложение.
 * @param port порт для Http сервера.
 */
export async function bootstrap(port?: number) {
  const app: INestApplication = await NestFactory.create(
    ApplicationModule
  );
  initMiddlewares(app);

  const options = new DocumentBuilder()
    .setTitle("Weather app")
    .setDescription("The app API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/doc", app, document);

  await app.listen(port || 3000);
  return app;
}
/**
 * Инициализация middwares
 * @param app инстанс nest пиложения.
 */
export function initMiddlewares(app: INestApplication) {
  app.useGlobalGuards(new RolesGuard());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.useGlobalFilters(app["get"](AnyExceptionFilter));
}
