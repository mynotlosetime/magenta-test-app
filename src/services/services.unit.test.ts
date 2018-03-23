import { QueueService } from "./queue.service";
import { WeatherService } from "./weather.service";
import { WeatherRequestDto } from "../models/dto/weatherRequest.dto";
import axios from "axios";

describe("=== [Unit] Queue service test ===", () => {
  const VALID_CALLBACK = () => new Promise(res => "Hello");
  let queueService: QueueService;

  beforeEach(() => {
    queueService && queueService.clear();
    queueService = new QueueService();
  });

  it("init()", () => {
    queueService.init(VALID_CALLBACK);
    expect(queueService.isInit).toBe(true);
    expect(queueService.requestHandleFunction).toBeTruthy();
  });

  it("checkQueue(), addRequest() - test on consistently handling requests", () => {
    let prevOrder: number = 0;
    let isConsistentOrder: boolean = true;
    const checkOrderCallback = (req: MockRequest) => {
      return new Promise(res => {
        if (prevOrder > req.order) {
          isConsistentOrder = false;
        }
        expect(isConsistentOrder).toBe(true);
        prevOrder = req.order;
        res();
      });
    };
    queueService.init(checkOrderCallback);

    queueService.addRequest({ order: 1 });
    queueService.addRequest({ order: 2 });
    queueService.addRequest({ order: 3 });
    queueService.addRequest({ order: 4 });
  });
  interface MockRequest {
    order: number;
  }
});

// we mock axios for prevent http requests
jest.mock("axios");
describe("=== [Unit] Weather service test ===", () => {
  const weatherService: WeatherService = new WeatherService(
    new QueueService()
  );
  const VALID_WEATHER_DATA: WeatherRequestDto = {
    latitude: 55.75,
    longitude: 37.62
  };
  const INVALID_WEATHER_DATA: WeatherRequestDto = {
    latitude: 555.75,
    longitude: 937.62
  };
  axios.get["mockResolvedValue"]({ data: true });

  it(`getWeather() - valid data`, async () => {
    const weather = await weatherService.getWeather(
      VALID_WEATHER_DATA.latitude,
      VALID_WEATHER_DATA.longitude
    );
    expect(weather).toBeTruthy();
  });
  it(`getWeather() - invalid data`, async () => {
    expect.assertions(1);
    try {
      await weatherService.getWeather(
        INVALID_WEATHER_DATA.latitude,
        INVALID_WEATHER_DATA.longitude
      );
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
