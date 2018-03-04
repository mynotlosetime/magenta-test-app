import {
  Middleware,
  NestMiddleware,
  ExpressMiddleware,
  Inject
} from "@nestjs/common";
import { Model } from "sequelize-typescript";
import * as session from "express-session";
import config from "../config";
import * as store from "connect-session-sequelize";
import { Sequelize } from "sequelize";

@Middleware()
export class SessionMiddleware implements NestMiddleware {
  constructor(
    @Inject("SequelizeToken") private readonly sequelize: Sequelize
  ) {}
  resolve(...args: any[]): ExpressMiddleware {
    const SequelizeStore = store(session.Store);
    const sessionStore = new SequelizeStore({
      db: this.sequelize
    });
    this.sequelize.sync();
    return session({
      secret: config.get("session:secret"),
      key: config.get("session:key"),
      cookie: config.get("session:cookie"),
      store: sessionStore,
      resave: false
    });
  }
}
