import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPopover from "./popover.vue";

describe("GoabPopover", () => {
  it("should render", () => {
    const wrapper = mount(GoabPopover);
    const el = wrapper.find("goa-popover").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabPopover, {
      props: {
        maxWidth: "400px",
        minWidth: "200px",
        padded: true,
        position: "below",
        testId: "popover-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-popover").element;
    expect(el.getAttribute("maxwidth")).toBe("400px");
    expect(el.getAttribute("minwidth")).toBe("200px");
    expect(el.getAttribute("padded")).toBe("true");
    expect(el.getAttribute("position")).toBe("below");
    expect(el.getAttribute("testid")).toBe("popover-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render slots", () => {
    const wrapper = mount(GoabPopover, {
      slots: {
        default: "Popover content",
        target: "Target element",
      },
    });
    expect(wrapper.text()).toContain("Popover content");
  });

  it("should pass padded as false explicitly when false", () => {
    const wrapper = mount(GoabPopover, {
      props: { padded: false },
    });
    const el = wrapper.find("goa-popover").element;
    expect(el.getAttribute("padded")).toBe("false");
  });
});
