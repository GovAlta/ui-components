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
