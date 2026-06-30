import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabTab from "./tab.vue";

describe("GoabTab", () => {
  it("should render", () => {
    const wrapper = mount(GoabTab);
    expect(wrapper.find("goa-tab").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabTab, {
      props: {
        heading: "Tab 1",
        disabled: true,
        slug: "tab-1",
      },
    });
    const el = wrapper.find("goa-tab").element;
    expect(el.getAttribute("heading")).toBe("Tab 1");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("slug")).toBe("tab-1");
  });

  it("should render heading slot", () => {
    const wrapper = mount(GoabTab, {
      slots: { heading: "Custom heading" },
    });
    expect(wrapper.text()).toContain("Custom heading");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabTab, {
      slots: { default: "Tab content" },
    });
    expect(wrapper.text()).toContain("Tab content");
  });

  it("should not set disabled when false", () => {
    const wrapper = mount(GoabTab, {
      props: { heading: "Tab", disabled: false },
    });
    const el = wrapper.find("goa-tab").element;
    expect(el.hasAttribute("disabled")).toBe(false);
  });
});
