import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabDivider from "./divider.vue";

describe("GoabDivider", () => {
  it("should render", () => {
    const wrapper = mount(GoabDivider);
    expect(wrapper.find("goa-divider").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabDivider, {
      props: { testId: "test", mt: "s", mr: "m", mb: "l", ml: "xl" },
    });
    const el = wrapper.find("goa-divider").element;
    expect(el.getAttribute("testid")).toBe("test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });
});
