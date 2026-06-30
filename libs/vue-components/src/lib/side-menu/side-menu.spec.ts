import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabSideMenu from "./side-menu.vue";

describe("GoabSideMenu", () => {
  it("should render", () => {
    const wrapper = mount(GoabSideMenu);
    expect(wrapper.find("goa-side-menu").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabSideMenu, {
      props: { testId: "side-menu-test" },
    });
    const el = wrapper.find("goa-side-menu").element;
    expect(el.getAttribute("testid")).toBe("side-menu-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabSideMenu, {
      slots: { default: "Side menu content" },
    });
    expect(wrapper.text()).toContain("Side menu content");
  });
});
