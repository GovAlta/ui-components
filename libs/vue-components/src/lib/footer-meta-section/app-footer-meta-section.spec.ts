import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabAppFooterMetaSection from "./app-footer-meta-section.vue";

describe("GoabAppFooterMetaSection", () => {
  it("should render", () => {
    const wrapper = mount(GoabAppFooterMetaSection);
    expect(wrapper.find("goa-app-footer-meta-section").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabAppFooterMetaSection, {
      props: { testId: "meta-test" },
    });
    const el = wrapper.find("goa-app-footer-meta-section").element;
    expect(el.getAttribute("testid")).toBe("meta-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabAppFooterMetaSection, {
      slots: { default: "Meta content" },
    });
    expect(wrapper.text()).toContain("Meta content");
  });
});
