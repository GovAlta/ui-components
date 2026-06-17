import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabGrid from "./grid.vue";

describe("GoabGrid", () => {
  it("should render", () => {
    const wrapper = mount(GoabGrid, { props: { minChildWidth: "200px" } });
    expect(wrapper.find("goa-grid").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabGrid, {
      props: {
        minChildWidth: "200px",
        gap: "m",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "test",
      },
    });
    const el = wrapper.find("goa-grid").element;
    expect(el.getAttribute("minchildwidth")).toBe("200px");
    expect(el.getAttribute("gap")).toBe("m");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabGrid, {
      props: { minChildWidth: "200px" },
      slots: { default: "Grid content" },
    });
    expect(wrapper.text()).toContain("Grid content");
  });
});
