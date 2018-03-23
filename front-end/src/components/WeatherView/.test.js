import React from "react";
import { shallow } from "enzyme";
import WeatherView from "./index";

test("render test", () => {
  const weatherView = shallow(
    <WeatherView weather={null} loading={true} />
  );
  expect(weatherView.find(".weather-view")).toHaveLength(1);
});
