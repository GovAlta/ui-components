import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabScrollPanel from "./scroll-panel.vue";

describe("GoabScrollPanel", () => {
  it("should render", () => {
    const wrapper = mount(GoabScrollPanel);
    expect(wrapper.find("goa-scroll-panel").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabScrollPanel, {
      props: {
        height: "400px",
        testId: "panel-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-scroll-panel").element as HTMLElement;
    expect(el.getAttribute("height")).toBe("400px");
    expect(el.getAttribute("testid")).toBe("panel-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.style.height).toBe("400px");
  });

  it("should render header slot", () => {
    const wrapper = mount(GoabScrollPanel, {
      slots: { header: "Header Content" },
    });
    const el = wrapper.find("goa-scroll-panel").element;
    const slotEl = el.querySelector("[slot='header']");
    expect(slotEl?.innerHTML).toContain("Header Content");
  });

  it("should render footer slot", () => {
    const wrapper = mount(GoabScrollPanel, {
      slots: { footer: "Footer Content" },
    });
    const el = wrapper.find("goa-scroll-panel").element;
    const slotEl = el.querySelector("[slot='footer']");
    expect(slotEl?.innerHTML).toContain("Footer Content");
  });
});
