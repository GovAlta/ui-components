import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabTooltip from "./tooltip.vue";

describe("GoabTooltip", () => {
  it("should render", () => {
    const wrapper = mount(GoabTooltip);
    const el = wrapper.find("goa-tooltip").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabTooltip, {
      props: {
        content: "Tooltip content",
        position: "bottom",
        hAlign: "left",
        maxWidth: "300px",
        testId: "tooltip-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-tooltip").element;
    expect(el.getAttribute("content")).toBe("Tooltip content");
    expect(el.getAttribute("position")).toBe("bottom");
    expect(el.getAttribute("halign")).toBe("left");
    expect(el.getAttribute("maxwidth")).toBe("300px");
    expect(el.getAttribute("testid")).toBe("tooltip-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render slots", () => {
    const wrapper = mount(GoabTooltip, {
      slots: {
        default: "Trigger element",
        content: "Rich content",
      },
    });
    expect(wrapper.text()).toContain("Trigger element");
  });
});
