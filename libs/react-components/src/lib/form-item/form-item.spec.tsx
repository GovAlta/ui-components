import { render, cleanup } from "@testing-library/react";
import { GoabFormItem } from "./form-item";

afterEach(cleanup);

describe("GoaFormItem", () => {
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
        name="first_name"
        publicFormSummaryOrder={1}
      />
    );
    const el = baseElement.querySelector("goa-form-item");
    expect(el?.getAttribute("label")).toEqual("First Name");
    expect(el?.getAttribute("labelsize")).toEqual("large");
    expect(el?.getAttribute("requirement")).toEqual("optional");
    expect(el?.getAttribute("error")).toEqual("This is an error");
    expect(el?.getAttribute("helptext")).toEqual("This is some help text");
    expect(el?.getAttribute("maxwidth")).toEqual("480px");
    expect(el?.getAttribute("id")).toEqual("firstName");
    expect(el?.getAttribute("name")).toEqual("first_name");
    expect(el?.getAttribute("public-form-summary-order")).toEqual("1");
  });

  it("renders without optional properties", () => {
    const { baseElement } = render(
      <GoabFormItem
        label="First Name"
      />
    );
    const el = baseElement.querySelector("goa-form-item");
    expect(el?.getAttribute("label")).toEqual("First Name");
    expect(el?.getAttribute("name")).toBeNull();
    expect(el?.getAttribute("public-form-summary-order")).toBeNull();
  });

  it("renders with only public form properties", () => {
    const { baseElement } = render(
      <GoabFormItem
        label="First Name"
        name="first_name"
        publicFormSummaryOrder={2}
      />
    );
    const el = baseElement.querySelector("goa-form-item");
    expect(el?.getAttribute("label")).toEqual("First Name");
    expect(el?.getAttribute("name")).toEqual("first_name");
    expect(el?.getAttribute("public-form-summary-order")).toEqual("2");
  });
});
