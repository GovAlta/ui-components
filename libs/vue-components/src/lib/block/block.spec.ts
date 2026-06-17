import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabBlock from "./block.vue";

describe("GoabBlock", () => {
  it("should render", () => {
    const wrapper = mount(GoabBlock);
    expect(wrapper.find("goa-block").element).toBeTruthy();
  });

  it("should render the properties with kebab transform", () => {
    const wrapper = mount(GoabBlock, {
      props: {
        gap: "m",
        direction: "row",
        alignment: "center",
        minWidth: "100px",
        maxWidth: "200px",
        width: "150px",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "test",
      },
    });
    const el = wrapper.find("goa-block").element;
    expect(el.getAttribute("gap")).toBe("m");
    expect(el.getAttribute("direction")).toBe("row");
    expect(el.getAttribute("alignment")).toBe("center");
    expect(el.getAttribute("min-width")).toBe("100px");
    expect(el.getAttribute("max-width")).toBe("200px");
    expect(el.getAttribute("width")).toBe("150px");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabBlock, {
      slots: { default: "Block content" },
    });
    expect(wrapper.text()).toContain("Block content");
  });
});
