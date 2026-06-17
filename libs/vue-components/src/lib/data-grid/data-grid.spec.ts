import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabDataGrid from "./data-grid.vue";

describe("GoabDataGrid", () => {
  it("should render", () => {
    const wrapper = mount(GoabDataGrid, {
      props: { keyboardNav: "table" },
    });
    const el = wrapper.find("goa-data-grid").element;
    expect(el).toBeTruthy();
  });

  it("should render with props", () => {
    const wrapper = mount(GoabDataGrid, {
      props: {
        keyboardNav: "layout",
        keyboardIconVisibility: "hidden",
        keyboardIconPosition: "right",
      },
    });
    const el = wrapper.find("goa-data-grid").element;
    expect(el.getAttribute("keyboard-nav")).toBe("layout");
    expect(el.getAttribute("keyboard-icon-visibility")).toBe("hidden");
    expect(el.getAttribute("keyboard-icon-position")).toBe("right");
  });

  it("should use defaults", () => {
    const wrapper = mount(GoabDataGrid, {
      props: { keyboardNav: "table" },
    });
    const el = wrapper.find("goa-data-grid").element;
    expect(el.getAttribute("keyboard-icon-visibility")).toBe("visible");
    expect(el.getAttribute("keyboard-icon-position")).toBe("left");
  });

  it("should render default slot content", () => {
    const wrapper = mount(GoabDataGrid, {
      props: { keyboardNav: "table" },
      slots: { default: "Grid content" },
    });
    expect(wrapper.text()).toContain("Grid content");
  });
});
