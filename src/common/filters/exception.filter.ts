import {
  ExceptionFilter,
  Catch,
  Inject,
  HttpStatus
} from "@nestjs/common";
import { HttpException } from "@nestjs/core";

@Catch()
export class AnyExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject("ErrorsLogger") private readonly errorsLogger
  ) {}
  catch(exception, response) {
    const isHttpException: boolean =
      exception.constructor.name == "HttpException" ||
      exception instanceof HttpException;

    if (!isHttpException) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message
      });
    } else {
      const status = exception.getStatus();

      response.status(status).json({
        status,
        message: exception.response
      });
    }
    this.errorsLogger.error(exception);
  }
}
