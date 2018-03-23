import { WeatherRequestDto } from "./models/dto/weatherRequest.dto";
import { INestApplication, HttpStatus } from "@nestjs/common";
import { ApplicationModule } from "./modules/app.module";
import * as express from "express";
import * as request from "supertest";
import { bootstrap } from "./server";
import { Response } from "superagent";
import config from "./config";

describe("=== [E2E] app test ===", () => {
  let server;
  let defaultUser = config.get("defaultUser");

  const DB_INIT_TIMEOUT = 1000;
  const VALID_USER_DATA = {
    email: defaultUser.email,
    password: defaultUser.password
  };

  beforeAll(async () => {
    const app: INestApplication = await bootstrap(3001);
    server = app.getHttpServer();
    app.disable;
    await new Promise(res => setTimeout(res, DB_INIT_TIMEOUT));
  });
  afterAll(() => {
    server.close(() => {
      // setTimeout(() => process.exit(0), 0);
    });
  });

  const login = async (userData: any): Promise<string> => {
    const loginRes: Response = await request(server)
      .post("/auth/login")
      .send(userData)
      .expect(HttpStatus.CREATED);
    const userCookie = loginRes.get("set-cookie");
    return userCookie;
  };

  /* Logout */

  describe("[logout] ->", () => {
    it(`with session`, async () => {
      const userCookie = await login(VALID_USER_DATA);
      await request(server)
        .post("/auth/logout")
        .set("Cookie", userCookie)
        .expect(HttpStatus.CREATED);
    });
    it(`without session`, async () => {
      await request(server)
        .post("/auth/logout")
        .expect(HttpStatus.CREATED);
    });
  });

  /* Signal */

  describe("[signal] ->", () => {
    it(`fail`, async () => {
      await request(server)
        .get("/auth/signal")
        .expect(HttpStatus.FORBIDDEN);
    });

    it(`success`, async () => {
      const userCookie = await login(VALID_USER_DATA);
      await request(server)
        .get("/auth/signal")
        .set("Cookie", userCookie)
        .expect(HttpStatus.OK);

      await request(server)
        .post("/auth/logout")
        .set("Cookie", userCookie)
        .expect(HttpStatus.CREATED);
    });
  });

  /* Login */

  describe("[login] ->", () => {
    let userCookie;
    const INVALID_USER_DATA = {
      email: "alice@mail.com",
      password: "1232"
    };

    afterEach(async () => {
      if (!userCookie) return;
      await request(server)
        .post("/auth/logout")
        .set("Cookie", userCookie)
        .expect(HttpStatus.CREATED);
      userCookie = null;
    });

    it(`valid user data`, async () => {
      userCookie = await login(VALID_USER_DATA);
    });
    it(`invalid user data`, async () => {
      await request(server)
        .post("/auth/login")
        .send(INVALID_USER_DATA)
        .expect(HttpStatus.FORBIDDEN);
    });
    it(`wrong format user data`, async () => {
      await request(server)
        .post("/auth/login")
        .send("STRING")
        .expect(HttpStatus.FORBIDDEN);
    });
  });

  /* Get weather */

  describe("[getWeather] ->", () => {
    const VALID_WEATHER_DATA: WeatherRequestDto = {
      latitude: 55.75,
      longitude: 37.62
    };
    const INVALID_WEATHER_DATA: WeatherRequestDto = {
      latitude: 555.75,
      longitude: 937.62
    };

    let userCookie;
    beforeAll(async () => {
      userCookie = await login(VALID_USER_DATA);
    });

    it(`valid data`, async () => {
      await request(server)
        .get("/weather")
        .set("Cookie", userCookie)
        .query(VALID_WEATHER_DATA)
        .expect(HttpStatus.OK);
    });
    it(`invalid data`, async () => {
      await request(server)
        .get("/weather")
        .set("Cookie", userCookie)
        .query(INVALID_WEATHER_DATA)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
    it(`wrong format data`, async () => {
      await request(server)
        .get("/weather")
        .set("Cookie", userCookie)
        .query({ sod: "STRING" })
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
    it(`empty data`, async () => {
      await request(server)
        .get("/weather")
        .set("Cookie", userCookie)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
    it(`anonymous user valid data`, async () => {
      await request(server)
        .get("/weather")
        .query(VALID_WEATHER_DATA)
        .expect(HttpStatus.FORBIDDEN);
    });
  });
});
