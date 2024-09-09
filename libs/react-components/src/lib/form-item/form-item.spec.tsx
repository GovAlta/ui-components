import { render, cleanup } from "@testing-library/react";
import { GoabFormItem } from "./form-item";

afterEach(cleanup);

describe("GoABFormItem", () => {
  it("renders all with properties", () => {
    const { baseElement } = render(
      <GoabFormItem
        label="First Name"
        labelSize="large"
        requirement="optional"
        error="This is an error"
        helpText="This is some help text"
        maxWidth="480px"
        id="firstName"
      />,
    );
    const el = baseElement.querySelector("goa-form-item");
    expect(el?.getAttribute("label")).toEqual("First Name");
    expect(el?.getAttribute("labelsize")).toEqual("large");
    expect(el?.getAttribute("requirement")).toEqual("optional");
    expect(el?.getAttribute("error")).toEqual("This is an error");
    expect(el?.getAttribute("helptext")).toEqual("This is some help text");
    expect(el?.getAttribute("maxwidth")).toEqual("480px");
    expect(el?.getAttribute("id")).toEqual("firstName");
  });
});
