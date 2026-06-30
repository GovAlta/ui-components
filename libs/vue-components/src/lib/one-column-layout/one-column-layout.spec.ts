import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabOneColumnLayout from "./one-column-layout.vue";

describe("GoabOneColumnLayout", () => {
  it("should render", () => {
    const wrapper = mount(GoabOneColumnLayout);
    expect(wrapper.find("goa-one-column-layout").element).toBeTruthy();
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabOneColumnLayout, {
      slots: { default: "Layout content" },
    });
    expect(wrapper.text()).toContain("Layout content");
  });
});
