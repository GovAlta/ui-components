import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabFormItem from "./form-item.vue";

describe("GoabFormItem", () => {
  it("renders all with properties", () => {
    const wrapper = mount(GoabFormItem, {
      props: {
        label: "First Name",
        labelSize: "large",
        requirement: "optional",
        type: "text-input",
        error: "This is an error",
        helpText: "This is some help text",
        maxWidth: "480px",
        id: "firstName",
        name: "first_name",
        publicFormSummaryOrder: 1,
        testId: "form-item-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-form-item").element;
    expect(el.getAttribute("label")).toEqual("First Name");
    expect(el.getAttribute("labelsize")).toEqual("large");
    expect(el.getAttribute("requirement")).toEqual("optional");
    expect(el.getAttribute("type")).toEqual("text-input");
    expect(el.getAttribute("error")).toEqual("This is an error");
    expect(el.getAttribute("helptext")).toEqual("This is some help text");
    expect(el.getAttribute("maxwidth")).toEqual("480px");
    expect(el.getAttribute("id")).toEqual("firstName");
    expect(el.getAttribute("name")).toEqual("first_name");
    expect(el.getAttribute("public-form-summary-order")).toEqual("1");
    expect(el.getAttribute("testid")).toEqual("form-item-test");
    expect(el.getAttribute("mt")).toEqual("s");
    expect(el.getAttribute("mr")).toEqual("m");
    expect(el.getAttribute("mb")).toEqual("l");
    expect(el.getAttribute("ml")).toEqual("xl");
  });

  it("renders without optional properties", () => {
    const wrapper = mount(GoabFormItem, {
      props: { label: "First Name" },
    });
    const el = wrapper.find("goa-form-item").element;
    expect(el.getAttribute("label")).toEqual("First Name");
    expect(el.getAttribute("name")).toBeNull();
    expect(el.getAttribute("public-form-summary-order")).toBeNull();
  });

  it("renders with only public form properties", () => {
    const wrapper = mount(GoabFormItem, {
      props: {
        label: "First Name",
        name: "first_name",
        publicFormSummaryOrder: 2,
      },
    });
    const el = wrapper.find("goa-form-item").element;
    expect(el.getAttribute("label")).toEqual("First Name");
    expect(el.getAttribute("name")).toEqual("first_name");
    expect(el.getAttribute("public-form-summary-order")).toEqual("2");
  });

  it("renders children via default slot", () => {
    const wrapper = mount(GoabFormItem, {
      props: { label: "First Name" },
      slots: { default: "<input />" },
    });
    const el = wrapper.find("goa-form-item").element;
    expect(el.querySelector("input")).toBeTruthy();
  });

  it("should pass data-grid attributes", () => {
    const wrapper = mount(GoabFormItem, {
      props: { label: "Test Label", "data-grid": "cell" },
    });
    const el = wrapper.find("goa-form-item").element;
    expect(el.getAttribute("data-grid")).toBe("cell");
  });
});
