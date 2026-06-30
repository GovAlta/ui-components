import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabSideMenuGroup from "./side-menu-group.vue";

describe("GoabSideMenuGroup", () => {
  it("should render", () => {
    const wrapper = mount(GoabSideMenuGroup, {
      props: { heading: "Group" },
    });
    expect(wrapper.find("goa-side-menu-group").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabSideMenuGroup, {
      props: {
        heading: "Resources",
        icon: "home",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "group-test",
      },
    });
    const el = wrapper.find("goa-side-menu-group").element;
    expect(el.getAttribute("heading")).toBe("Resources");
    expect(el.getAttribute("icon")).toBe("home");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("group-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabSideMenuGroup, {
      props: { heading: "Group" },
      slots: { default: "Group content" },
    });
    expect(wrapper.text()).toContain("Group content");
  });
});
