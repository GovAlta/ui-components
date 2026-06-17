import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabSideMenuHeading from "./side-menu-heading.vue";

describe("GoabSideMenuHeading", () => {
  it("should render", () => {
    const wrapper = mount(GoabSideMenuHeading);
    expect(wrapper.find("goa-side-menu-heading").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabSideMenuHeading, {
      props: {
        icon: "home",
        testId: "heading-test",
      },
    });
    const el = wrapper.find("goa-side-menu-heading").element;
    expect(el.getAttribute("icon")).toBe("home");
    expect(el.getAttribute("testid")).toBe("heading-test");
  });

  it("should render default slot content", () => {
    const wrapper = mount(GoabSideMenuHeading, {
      slots: { default: "Heading content" },
    });
    expect(wrapper.text()).toContain("Heading content");
  });

  it("should render meta slot", () => {
    const wrapper = mount(GoabSideMenuHeading, {
      slots: { meta: "Meta content" },
    });
    expect(wrapper.text()).toContain("Meta content");
  });
});
