import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabWorkSideMenuGroup from "./work-side-menu-group.vue";

describe("GoabWorkSideMenuGroup", () => {
  it("should render", () => {
    const wrapper = mount(GoabWorkSideMenuGroup, {
      props: { heading: "Group" },
    });
    expect(wrapper.find("goa-work-side-menu-group").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabWorkSideMenuGroup, {
      props: {
        heading: "Services",
        icon: "settings",
        testId: "work-side-menu-group-test",
        open: true,
      },
    });
    const el = wrapper.find("goa-work-side-menu-group").element;
    expect(el.getAttribute("heading")).toBe("Services");
    expect(el.getAttribute("icon")).toBe("settings");
    expect(el.getAttribute("testid")).toBe("work-side-menu-group-test");
    expect(el.getAttribute("open")).toBe("true");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabWorkSideMenuGroup, {
      props: { heading: "Group" },
      slots: { default: "Menu items" },
    });
    expect(wrapper.text()).toContain("Menu items");
  });

  it("should not set open when false", () => {
    const wrapper = mount(GoabWorkSideMenuGroup, {
      props: { heading: "Group", open: false },
    });
    const el = wrapper.find("goa-work-side-menu-group").element;
    expect(el.hasAttribute("open")).toBe(false);
  });
});
