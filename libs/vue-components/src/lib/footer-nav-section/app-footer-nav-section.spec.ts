import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabAppFooterNavSection from "./app-footer-nav-section.vue";

describe("GoabAppFooterNavSection", () => {
  it("should render", () => {
    const wrapper = mount(GoabAppFooterNavSection);
    expect(wrapper.find("goa-app-footer-nav-section").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabAppFooterNavSection, {
      props: {
        heading: "Resources",
        maxColumnCount: 2,
        testId: "nav-test",
      },
    });
    const el = wrapper.find("goa-app-footer-nav-section").element;
    expect(el.getAttribute("heading")).toBe("Resources");
    expect(el.getAttribute("maxcolumncount")).toBe("2");
    expect(el.getAttribute("testid")).toBe("nav-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabAppFooterNavSection, {
      slots: { default: "Nav content" },
    });
    expect(wrapper.text()).toContain("Nav content");
  });
});
