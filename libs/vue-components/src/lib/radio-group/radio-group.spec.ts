import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { h } from "vue";
import GoabRadioGroup from "./radio-group.vue";

describe("GoabRadioGroup", () => {
  it("should render", () => {
    const wrapper = mount(GoabRadioGroup, { props: { name: "fruits" } });
    const el = wrapper.find("goa-radio-group").element;
    expect(el.getAttribute("name")).toBe("fruits");
    expect(el.getAttribute("disabled")).toBeNull();
    expect(el.getAttribute("error")).toBeNull();
  });

  it("should render with all props", () => {
    const wrapper = mount(GoabRadioGroup, {
      props: {
        name: "fruits",
        value: "apples",
        disabled: true,
        error: true,
        size: "compact",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        ariaLabel: "please select fruit",
        testId: "radio-test",
        orientation: "horizontal",
      },
    });
    const el = wrapper.find("goa-radio-group").element;
    expect(el.getAttribute("name")).toBe("fruits");
    expect(el.getAttribute("value")).toBe("apples");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("error")).toBe("true");
    expect(el.getAttribute("size")).toBe("compact");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("arialabel")).toBe("please select fruit");
    expect(el.getAttribute("testid")).toBe("radio-test");
    expect(el.getAttribute("orientation")).toBe("horizontal");
  });

  it("handles the onChange event", () => {
    const wrapper = mount(GoabRadioGroup, {
      props: { name: "fruits" },
    });
    const el = wrapper.find("goa-radio-group").element;
    el.dispatchEvent(
      new CustomEvent("_change", { detail: { name: "fruits", value: "apples" } }),
    );
    expect(wrapper.emitted("onChange")).toBeTruthy();
    expect(wrapper.emitted("onChange")?.[0][0]).toMatchObject({
      name: "fruits",
      value: "apples",
    });
  });

  it("renders children via slot", () => {
    const wrapper = mount(GoabRadioGroup, {
      props: { name: "fruits" },
      slots: {
        default: () => h("goa-radio-item", { label: "Apples", value: "apples" }),
      },
    });
    const el = wrapper.find("goa-radio-group").element;
    expect(el.querySelector("goa-radio-item")).toBeTruthy();
  });

  it("should not set disabled when disabled=false", () => {
    const wrapper = mount(GoabRadioGroup, {
      props: { name: "fruits", disabled: false },
    });
    const el = wrapper.find("goa-radio-group").element;
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  it("should pass data-grid attributes", () => {
    const wrapper = mount(GoabRadioGroup, {
      props: { name: "fruits", "data-grid": "cell" },
    });
    const el = wrapper.find("goa-radio-group").element;
    expect(el.getAttribute("data-grid")).toBe("cell");
  });
});
