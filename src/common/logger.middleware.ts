import {
  Middleware,
  NestMiddleware,
  ExpressMiddleware,
  Inject
} from "@nestjs/common";

@Middleware()
export class LoggerMiddleware implements NestMiddleware {
  constructor(@Inject("UsersLogger") private readonly usersLogger) {}

  resolve(name: string): ExpressMiddleware {
    return (req, res, next) => {
      if (req.session.user) {
        this.usersLogger.info(`
          user: ${req.session.user.email},
          method: ${req.method},
          url: ${req.originalUrl},
          sessionId: ${req.sessionID}
        `);
      }
      next();
    };
  }
}
