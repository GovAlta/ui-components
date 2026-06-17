import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabAppHeaderMenu from "./app-header-menu.vue";

describe("GoabAppHeaderMenu", () => {
  it("should render", () => {
    const wrapper = mount(GoabAppHeaderMenu, {
      props: { heading: "Menu" },
    });
    expect(wrapper.find("goa-app-header-menu").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabAppHeaderMenu, {
      props: {
        heading: "Menu",
        leadingIcon: "home",
        testId: "menu-test",
        slotName: "some-slot",
      },
    });
    const el = wrapper.find("goa-app-header-menu").element;
    expect(el.getAttribute("heading")).toBe("Menu");
    expect(el.getAttribute("leadingicon")).toBe("home");
    expect(el.getAttribute("testid")).toBe("menu-test");
    expect(el.getAttribute("slot")).toBe("some-slot");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabAppHeaderMenu, {
      props: { heading: "Menu" },
      slots: { default: "Menu content" },
    });
    expect(wrapper.text()).toContain("Menu content");
  });
});
