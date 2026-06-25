import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabSpacer from "./spacer.vue";

describe("GoabSpacer", () => {
  it("should render", () => {
    const wrapper = mount(GoabSpacer);
    const el = wrapper.find("goa-spacer").element;
    expect(el).toBeTruthy();
  });

  it("should render spacing properties", () => {
    const wrapper = mount(GoabSpacer, {
      props: {
        hSpacing: "m",
        vSpacing: "l",
        testId: "spacer-test",
      },
    });
    const el = wrapper.find("goa-spacer").element;
    expect(el.getAttribute("hspacing")).toBe("m");
    expect(el.getAttribute("vspacing")).toBe("l");
    expect(el.getAttribute("testid")).toBe("spacer-test");
  });
});
