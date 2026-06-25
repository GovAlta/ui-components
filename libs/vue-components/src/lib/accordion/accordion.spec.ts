import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabAccordion from "./accordion.vue";

describe("GoabAccordion", () => {
  it("should render", () => {
    const wrapper = mount(GoabAccordion);
    const el = wrapper.find("goa-accordion").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabAccordion, {
      props: {
        heading: "Accordion heading",
        open: true,
        headingSize: "large",
        secondaryText: "Secondary text",
        maxWidth: "800px",
        iconPosition: "right",
        headingType: "normal",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "accordion-test",
      },
    });
    const el = wrapper.find("goa-accordion").element;
    expect(el.getAttribute("heading")).toBe("Accordion heading");
    expect(el.getAttribute("open")).toBe("true");
    expect(el.getAttribute("headingsize")).toBe("large");
    expect(el.getAttribute("secondarytext")).toBe("Secondary text");
    expect(el.getAttribute("maxwidth")).toBe("800px");
    expect(el.getAttribute("iconposition")).toBe("right");
    expect(el.getAttribute("heading-type")).toBe("normal");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("accordion-test");
  });

  it("should render slots", () => {
    const wrapper = mount(GoabAccordion, {
      slots: {
        default: "Body content",
        headingContent: "Heading slot content",
        actions: "Action buttons",
      },
    });
    expect(wrapper.text()).toContain("Body content");
  });

  it("responds to events", () => {
    const wrapper = mount(GoabAccordion);
    const el = wrapper.find("goa-accordion").element;
    el.dispatchEvent(new CustomEvent("_change", { detail: { open: true } }));
    expect(wrapper.emitted()).toHaveProperty("onChange");
    expect(wrapper.emitted("onChange")[0]).toEqual([true]);
  });
});
