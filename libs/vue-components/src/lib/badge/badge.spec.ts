import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabBadge from "./badge.vue";

describe("GoabBadge", () => {
  it("should render", () => {
    const wrapper = mount(GoabBadge);
    const el = wrapper.find("goa-badge").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabBadge, {
      props: {
        type: "success",
        icon: "checkmark",
        content: "Badge text",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "badge-test",
      },
    });
    const el = wrapper.find("goa-badge").element;
    expect(el.getAttribute("type")).toBe("success");
    expect(el.getAttribute("icon")).toBe("checkmark");
    expect(el.getAttribute("content")).toBe("Badge text");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("badge-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabBadge, {
      slots: { default: "Slot content" },
    });
    expect(wrapper.text()).toContain("Slot content");
  });
});
