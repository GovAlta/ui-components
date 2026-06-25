import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabTabs from "./tabs.vue";

describe("GoabTabs", () => {
  it("should render", () => {
    const wrapper = mount(GoabTabs);
    expect(wrapper.find("goa-tabs").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabTabs, {
      props: {
        initialTab: 1,
        testId: "tabs-test",
        variant: "segmented",
        orientation: "horizontal",
        navigation: "hash",
      },
    });
    const el = wrapper.find("goa-tabs").element;
    expect(el.getAttribute("initialtab")).toBe("1");
    expect(el.getAttribute("testid")).toBe("tabs-test");
    expect(el.getAttribute("variant")).toBe("segmented");
    expect(el.getAttribute("orientation")).toBe("horizontal");
    expect(el.getAttribute("navigation")).toBe("hash");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabTabs, {
      slots: { default: "Tab content" },
    });
    expect(wrapper.text()).toContain("Tab content");
  });

  it("responds to _change event", () => {
    const wrapper = mount(GoabTabs);
    const el = wrapper.find("goa-tabs").element;
    const detail = { selectedIndex: 2 };
    el.dispatchEvent(new CustomEvent("_change", { detail }));
    expect(wrapper.emitted()).toHaveProperty("onChange");
    expect(wrapper.emitted("onChange")![0]).toEqual([detail]);
  });
});
