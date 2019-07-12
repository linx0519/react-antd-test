import App from "../src/components/App";
import React from "react";
import { shallow } from "enzyme";

describe("App", () => {
  const wrapper = shallow(<App></App>);

  expect(wrapper.find("h1").text()).toBe("Welcome to My React App");
  expect(wrapper).toMatchSnapshot;
})
