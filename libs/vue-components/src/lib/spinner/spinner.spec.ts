import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabSpinner from "./spinner.vue";

describe("GoabSpinner", () => {
  it("should render", () => {
    const wrapper = mount(GoabSpinner, { props: { type: "progress", size: "medium" } });
    expect(wrapper.find("goa-spinner").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabSpinner, {
      props: {
        type: "progress",
        size: "large",
        invert: true,
        progress: 50,
        testId: "test",
      },
    });
    const el = wrapper.find("goa-spinner").element;
    expect(el.getAttribute("type")).toBe("progress");
    expect(el.getAttribute("size")).toBe("large");
    expect(el.getAttribute("invert")).toBe("true");
    expect(el.getAttribute("progress")).toBe("50");
    expect(el.getAttribute("testid")).toBe("test");
  });

  it("should not set invert when false", () => {
    const wrapper = mount(GoabSpinner, {
      props: { type: "progress", size: "medium", invert: false },
    });
    const el = wrapper.find("goa-spinner").element;
    expect(el.hasAttribute("invert")).toBe(false);
  });
});
