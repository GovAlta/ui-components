import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabWorkSideMenuItem from "./work-side-menu-item.vue";

describe("GoabWorkSideMenuItem", () => {
  it("should render", () => {
    const wrapper = mount(GoabWorkSideMenuItem, {
      props: { label: "Dashboard" },
    });
    const el = wrapper.find("goa-work-side-menu-item").element;
    expect(el).toBeTruthy();
  });

  it("should render with props", () => {
    const wrapper = mount(GoabWorkSideMenuItem, {
      props: {
        label: "Dashboard",
        url: "/dashboard",
        icon: "home",
        current: true,
        divider: true,
        testId: "menu-item",
        badge: "3",
      },
    });
    const el = wrapper.find("goa-work-side-menu-item").element;
    expect(el.getAttribute("label")).toBe("Dashboard");
    expect(el.getAttribute("url")).toBe("/dashboard");
    expect(el.getAttribute("icon")).toBe("home");
    expect(el.getAttribute("current")).toBe("true");
    expect(el.getAttribute("divider")).toBe("true");
    expect(el.getAttribute("testid")).toBe("menu-item");
    expect(el.getAttribute("badge")).toBe("3");
  });

  it("should render slots", () => {
    const wrapper = mount(GoabWorkSideMenuItem, {
      props: { label: "Dashboard" },
      slots: {
        default: "Child content",
        popoverContent: "Popover content",
        trailingContent: "Trailing content",
      },
    });
    expect(wrapper.text()).toContain("Child content");
    expect(wrapper.text()).toContain("Popover content");
    expect(wrapper.text()).toContain("Trailing content");
  });
});
