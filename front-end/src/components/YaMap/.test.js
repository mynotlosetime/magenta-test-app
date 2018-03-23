import React from "react";
import { shallow } from "enzyme";
import YaMap from "./index";

test("render test", () => {
  const mapPoint = {
    coordinates: [55.75, 37.62]
  };
  const testAddressRequest = () => "test";
  const yaMap = shallow(
    <YaMap
      onGetAddressRequest={testAddressRequest}
      mapPoint={mapPoint}
    />
  );
  expect(yaMap.find("#map")).toHaveLength(1);
});
