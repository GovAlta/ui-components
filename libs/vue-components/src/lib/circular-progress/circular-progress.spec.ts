import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabCircularProgress from "./circular-progress.vue";

describe("GoabCircularProgress", () => {
  it("should render", () => {
    const wrapper = mount(GoabCircularProgress);
    expect(wrapper.find("goa-circular-progress").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCircularProgress, {
      props: {
        variant: "fullscreen",
        size: "large",
        message: "Loading...",
        visible: true,
        progress: 50,
        testId: "test",
      },
    });
    const el = wrapper.find("goa-circular-progress").element;
    expect(el.getAttribute("variant")).toBe("fullscreen");
    expect(el.getAttribute("size")).toBe("large");
    expect(el.getAttribute("message")).toBe("Loading...");
    expect(el.getAttribute("visible")).toBe("true");
    expect(el.getAttribute("progress")).toBe("50");
    expect(el.getAttribute("testid")).toBe("test");
  });

  it("should not set visible when false", () => {
    const wrapper = mount(GoabCircularProgress, {
      props: { visible: false },
    });
    const el = wrapper.find("goa-circular-progress").element;
    expect(el.hasAttribute("visible")).toBe(false);
  });
});
