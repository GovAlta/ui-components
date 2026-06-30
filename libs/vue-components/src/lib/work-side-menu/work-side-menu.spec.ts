import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabWorkSideMenu from "./work-side-menu.vue";

describe("GoabWorkSideMenu", () => {
  it("should render", () => {
    const wrapper = mount(GoabWorkSideMenu, {
      props: { heading: "Menu", url: "/" },
    });
    expect(wrapper.find("goa-work-side-menu").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabWorkSideMenu, {
      props: {
        heading: "Main menu",
        url: "/dashboard",
        userName: "John Doe",
        userSecondaryText: "Administrator",
        testId: "work-side-menu-test",
        open: true,
        mt: "s",
      },
    });
    const el = wrapper.find("goa-work-side-menu").element;
    expect(el.getAttribute("heading")).toBe("Main menu");
    expect(el.getAttribute("url")).toBe("/dashboard");
    expect(el.getAttribute("user-name")).toBe("John Doe");
    expect(el.getAttribute("user-secondary-text")).toBe("Administrator");
    expect(el.getAttribute("testid")).toBe("work-side-menu-test");
    expect(el.getAttribute("open")).toBe("true");
    expect(el.getAttribute("mt")).toBe("s");
  });

  it("should render primary slot", () => {
    const wrapper = mount(GoabWorkSideMenu, {
      props: { heading: "Menu", url: "/" },
      slots: { primary: "Primary content" },
    });
    expect(wrapper.text()).toContain("Primary content");
  });

  it("should render secondary slot", () => {
    const wrapper = mount(GoabWorkSideMenu, {
      props: { heading: "Menu", url: "/" },
      slots: { secondary: "Secondary content" },
    });
    expect(wrapper.text()).toContain("Secondary content");
  });

  it("should render account slot", () => {
    const wrapper = mount(GoabWorkSideMenu, {
      props: { heading: "Menu", url: "/" },
      slots: { account: "Account content" },
    });
    expect(wrapper.text()).toContain("Account content");
  });

  it("responds to _toggle event", () => {
    const wrapper = mount(GoabWorkSideMenu, {
      props: { heading: "Menu", url: "/" },
    });
    const el = wrapper.find("goa-work-side-menu").element;
    el.dispatchEvent(new CustomEvent("_toggle"));
    expect(wrapper.emitted()).toHaveProperty("onToggle");
  });

  it("responds to _navigate event", () => {
    const wrapper = mount(GoabWorkSideMenu, {
      props: { heading: "Menu", url: "/" },
    });
    const el = wrapper.find("goa-work-side-menu").element;
    const detail = { url: "/new-page" };
    el.dispatchEvent(new CustomEvent("_navigate", { detail }));
    expect(wrapper.emitted()).toHaveProperty("onNavigate");
    expect(wrapper.emitted("onNavigate")![0]).toEqual([detail.url]);
  });

  it("should not set open when false", () => {
    const wrapper = mount(GoabWorkSideMenu, {
      props: { heading: "Menu", url: "/", open: false },
    });
    const el = wrapper.find("goa-work-side-menu").element;
    expect(el.hasAttribute("open")).toBe(false);
  });
});
