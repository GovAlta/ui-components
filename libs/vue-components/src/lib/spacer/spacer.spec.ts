import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabSpacer from "./spacer.vue";

describe("GoabSpacer", () => {
  it("should render", () => {
    const wrapper = mount(GoabSpacer);
    const el = wrapper.find("goa-spacer").element;
    expect(el).toBeTruthy();
  });

  it("should render margin properties", () => {
    const wrapper = mount(GoabSpacer, {
      props: {
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "spacer-test",
      },
    });
    const el = wrapper.find("goa-spacer").element;
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("spacer-test");
  });
});
