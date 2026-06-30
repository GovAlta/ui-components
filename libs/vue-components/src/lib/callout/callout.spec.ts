import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabCallout from "./callout.vue";

describe("GoabCallout", () => {
  it("should render", () => {
    const wrapper = mount(GoabCallout);
    expect(wrapper.find("goa-callout").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCallout, {
      props: {
        heading: "Attention",
        type: "information",
        size: "large",
        iconTheme: "outline",
        emphasis: "medium",
        maxWidth: "800px",
        ariaLive: "polite",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "test",
      },
    });
    const el = wrapper.find("goa-callout").element;
    expect(el.getAttribute("heading")).toBe("Attention");
    expect(el.getAttribute("type")).toBe("information");
    expect(el.getAttribute("size")).toBe("large");
    expect(el.getAttribute("icontheme")).toBe("outline");
    expect(el.getAttribute("emphasis")).toBe("medium");
    expect(el.getAttribute("maxwidth")).toBe("800px");
    expect(el.getAttribute("arialive")).toBe("polite");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabCallout, {
      slots: { default: "Callout content" },
    });
    expect(wrapper.text()).toContain("Callout content");
  });
});
