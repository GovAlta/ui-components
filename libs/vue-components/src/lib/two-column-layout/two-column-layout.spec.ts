import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabTwoColumnLayout from "./two-column-layout.vue";

describe("GoabTwoColumnLayout", () => {
  it("should render", () => {
    const wrapper = mount(GoabTwoColumnLayout);
    expect(wrapper.find("goa-two-column-layout").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabTwoColumnLayout, {
      props: {
        navColumnWidth: "200px",
        maxContentWidth: "1200px",
      },
    });
    const el = wrapper.find("goa-two-column-layout").element;
    expect(el.getAttribute("navcolumnwidth")).toBe("200px");
    expect(el.getAttribute("maxcontentwidth")).toBe("1200px");
  });

  it("should render default slot content", () => {
    const wrapper = mount(GoabTwoColumnLayout, {
      slots: { default: "Main content" },
    });
    expect(wrapper.text()).toContain("Main content");
  });

  it("should render header slot", () => {
    const wrapper = mount(GoabTwoColumnLayout, {
      slots: { header: "Header content" },
    });
    expect(wrapper.text()).toContain("Header content");
  });

  it("should render nav slot", () => {
    const wrapper = mount(GoabTwoColumnLayout, {
      slots: { nav: "Nav content" },
    });
    expect(wrapper.text()).toContain("Nav content");
  });

  it("should render footer slot", () => {
    const wrapper = mount(GoabTwoColumnLayout, {
      slots: { footer: "Footer content" },
    });
    expect(wrapper.text()).toContain("Footer content");
  });
});
