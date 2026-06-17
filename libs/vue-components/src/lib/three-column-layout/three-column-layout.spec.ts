import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabThreeColumnLayout from "./three-column-layout.vue";

describe("GoabThreeColumnLayout", () => {
  it("should render", () => {
    const wrapper = mount(GoabThreeColumnLayout);
    expect(wrapper.find("goa-three-column-layout").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabThreeColumnLayout, {
      props: {
        leftColumnWidth: "200px",
        rightColumnWidth: "200px",
        maxContentWidth: "1200px",
      },
    });
    const el = wrapper.find("goa-three-column-layout").element;
    expect(el.getAttribute("leftcolumnwidth")).toBe("200px");
    expect(el.getAttribute("rightcolumnwidth")).toBe("200px");
    expect(el.getAttribute("maxcontentwidth")).toBe("1200px");
  });

  it("should render default slot content", () => {
    const wrapper = mount(GoabThreeColumnLayout, {
      slots: { default: "Main content" },
    });
    expect(wrapper.text()).toContain("Main content");
  });

  it("should render header slot", () => {
    const wrapper = mount(GoabThreeColumnLayout, {
      slots: { header: "Header content" },
    });
    expect(wrapper.text()).toContain("Header content");
  });

  it("should render nav slot", () => {
    const wrapper = mount(GoabThreeColumnLayout, {
      slots: { nav: "Nav content" },
    });
    expect(wrapper.text()).toContain("Nav content");
  });

  it("should render side-menu slot", () => {
    const wrapper = mount(GoabThreeColumnLayout, {
      slots: { "side-menu": "Side menu content" },
    });
    expect(wrapper.text()).toContain("Side menu content");
  });

  it("should render footer slot", () => {
    const wrapper = mount(GoabThreeColumnLayout, {
      slots: { footer: "Footer content" },
    });
    expect(wrapper.text()).toContain("Footer content");
  });
});
