import React from "react";
import { shallow } from "enzyme";
import AddressSearch from "./index";

test("render test", () => {
  const weatherView = shallow(<AddressSearch />);
  expect(weatherView.find(".address-search")).toHaveLength(1);
});
