import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabAppHeader from "./app-header.vue";

describe("GoabAppHeader", () => {
  it("should render", () => {
    const wrapper = mount(GoabAppHeader);
    expect(wrapper.find("goa-app-header").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabAppHeader, {
      props: {
        heading: "Service",
        url: "https://example.com",
        maxContentWidth: "1200px",
        testId: "header-test",
      },
    });
    const el = wrapper.find("goa-app-header").element;
    expect(el.getAttribute("heading")).toBe("Service");
    expect(el.getAttribute("url")).toBe("https://example.com");
    expect(el.getAttribute("maxcontentwidth")).toBe("1200px");
    expect(el.getAttribute("testid")).toBe("header-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabAppHeader, {
      slots: { default: "Header content" },
    });
    expect(wrapper.text()).toContain("Header content");
  });

  it("should render the named slots", () => {
    const wrapper = mount(GoabAppHeader, {
      slots: {
        banner: "Banner content",
        phase: "Phase content",
        utilities: "Utilities content",
        navigation: "Navigation content",
      },
    });
    expect(wrapper.text()).toContain("Banner content");
    expect(wrapper.text()).toContain("Phase content");
    expect(wrapper.text()).toContain("Utilities content");
    expect(wrapper.text()).toContain("Navigation content");
  });

  it("sets hasmenuclickhandler when a handler is provided", () => {
    const wrapper = mount(GoabAppHeader, {
      props: { onMenuClick: vi.fn() },
    });
    const el = wrapper.find("goa-app-header").element;
    expect(el.getAttribute("hasmenuclickhandler")).toBe("true");
  });

  it("does not set hasmenuclickhandler when no handler is provided", () => {
    const wrapper = mount(GoabAppHeader);
    const el = wrapper.find("goa-app-header").element;
    expect(el.hasAttribute("hasmenuclickhandler")).toBe(false);
  });

  it("responds to onMenuClick", () => {
    const fn = vi.fn();
    const wrapper = mount(GoabAppHeader, {
      props: { onMenuClick: fn },
    });
    const el = wrapper.find("goa-app-header").element;
    el.dispatchEvent(new CustomEvent("_menuClick"));
    expect(fn).toHaveBeenCalled();
  });
});
