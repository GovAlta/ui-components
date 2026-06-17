import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPageBlock from "./page-block.vue";

describe("GoabPageBlock", () => {
  it("should render", () => {
    const wrapper = mount(GoabPageBlock);
    expect(wrapper.find("goa-page-block").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabPageBlock, {
      props: { width: "full", testId: "test" },
    });
    const el = wrapper.find("goa-page-block").element;
    expect(el.getAttribute("width")).toBe("full");
    expect(el.getAttribute("testid")).toBe("test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabPageBlock, {
      slots: { default: "Block content" },
    });
    expect(wrapper.text()).toContain("Block content");
  });
});
