import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabFilterChip from "./filter-chip.vue";

describe("GoabFilterChip", () => {
  it("should render", () => {
    const wrapper = mount(GoabFilterChip, {
      props: { content: "Filter chip" },
    });
    const el = wrapper.find("goa-filter-chip").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabFilterChip, {
      props: {
        content: "Filter chip",
        iconTheme: "filled",
        error: true,
        secondaryText: "Secondary",
        leadingIcon: "close",
        testId: "filter-chip-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-filter-chip").element;
    expect(el.getAttribute("content")).toBe("Filter chip");
    expect(el.getAttribute("icontheme")).toBe("filled");
    expect(el.getAttribute("error")).toBe("true");
    expect(el.getAttribute("secondarytext")).toBe("Secondary");
    expect(el.getAttribute("leadingicon")).toBe("close");
    expect(el.getAttribute("testid")).toBe("filter-chip-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("responds to events", () => {
    const wrapper = mount(GoabFilterChip, {
      props: { content: "Filter chip" },
    });
    const el = wrapper.find("goa-filter-chip").element;
    el.dispatchEvent(new CustomEvent("_click"));
    expect(wrapper.emitted()).toHaveProperty("onClick");
  });
});
