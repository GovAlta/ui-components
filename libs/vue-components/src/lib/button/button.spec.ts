import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabButton from "./button.vue";

describe("GoabButton", () => {
  it("should render", () => {
    const wrapper = mount(GoabButton);
    const el = wrapper.find("goa-button").element;
    expect(el.getAttribute("disabled")).toBeNull();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabButton, {
      props: {
        disabled: true,
        type: "primary",
        size: "compact",
        variant: "destructive",
        leadingIcon: "car",
        trailingIcon: "bag",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-button").element;
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("type")).toBe("primary");
    expect(el.getAttribute("size")).toBe("compact");
    expect(el.getAttribute("variant")).toBe("destructive");
    expect(el.getAttribute("leadingicon")).toBe("car");
    expect(el.getAttribute("trailingicon")).toBe("bag");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render content", () => {
    const wrapper = mount(GoabButton, {
      slots: { default: "Click me" },
    });
    expect(wrapper.text()).toContain("Click me");
  });

  it("responds to events", () => {
    const wrapper = mount(GoabButton);
    const el = wrapper.find("goa-button").element;
    el.dispatchEvent(new CustomEvent("_click"));
    expect(wrapper.emitted()).toHaveProperty("onClick");
  });

  it("should pass data-grid attributes", () => {
    const wrapper = mount(GoabButton, {
      props: { "data-grid": "cell" },
    });
    const el = wrapper.find("goa-button").element;
    expect(el.getAttribute("data-grid")).toBe("cell");
  });

  it("should not set disabled when disabled=false", () => {
    const wrapper = mount(GoabButton, {
      props: { disabled: false },
    });
    const el = wrapper.find("goa-button").element;
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  describe("size", () => {
    ["compact", "normal"].forEach((size: string) => {
      it(`should render ${size} size`, () => {
        const wrapper = mount(GoabButton, { props: { size: size as "compact" | "normal" } });
        const el = wrapper.find("goa-button").element;
        expect(el.getAttribute("size")).toEqual(size);
      });
    });
  });

  describe("type", () => {
    ["primary", "submit", "secondary", "tertiary", "start", "text"].forEach((type: string) => {
      it(`should render ${type} type`, () => {
        const wrapper = mount(GoabButton, {
          props: { type: type as "primary" | "submit" | "secondary" | "tertiary" | "start" | "text" },
        });
        const el = wrapper.find("goa-button").element;
        expect(el.getAttribute("type")).toEqual(type);
      });
    });
  });
});
