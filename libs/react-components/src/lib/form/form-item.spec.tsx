import React from "react";
import { render, cleanup } from "@testing-library/react";
import { GoAFormItem } from "./form-item";

afterEach(cleanup);

describe("GoAFormItem", () => {
  it("renders all with properties", () => {
    const { baseElement } = render(
      <GoAFormItem
        label="First Name"
        requirement="optional"
        error="This is an error"
        helpText="This is some help text"
      />
    );
    const el = baseElement.querySelector("goa-form-item");
    expect(el.getAttribute("label")).toEqual("First Name");
    expect(el.getAttribute("requirement")).toEqual("optional");
    expect(el.getAttribute("error")).toEqual("This is an error");
    expect(el.getAttribute("helptext")).toEqual("This is some help text");
  });
});
