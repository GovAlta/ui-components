import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabButtonGroup from "./button-group.vue";

describe("GoabButtonGroup", () => {
  it("should render", () => {
    const wrapper = mount(GoabButtonGroup, {
      props: { alignment: "start" },
    });
    expect(wrapper.find("goa-button-group").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabButtonGroup, {
      props: {
        alignment: "end",
        gap: "compact",
        testId: "button-group-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-button-group").element;
    expect(el.getAttribute("alignment")).toBe("end");
    expect(el.getAttribute("gap")).toBe("compact");
    expect(el.getAttribute("testid")).toBe("button-group-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabButtonGroup, {
      props: { alignment: "start" },
      slots: { default: "Button group content" },
    });
    expect(wrapper.text()).toContain("Button group content");
  });
});
