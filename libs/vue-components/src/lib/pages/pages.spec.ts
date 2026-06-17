import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPages from "./pages.vue";

describe("GoabPages", () => {
  it("should render", () => {
    const wrapper = mount(GoabPages);
    expect(wrapper.find("goa-pages").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabPages, {
      props: { current: 2, mt: "s", mr: "m", mb: "l", ml: "xl" },
    });
    const el = wrapper.find("goa-pages").element;
    expect(el.getAttribute("current")).toBe("2");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabPages, {
      slots: { default: "Page content" },
    });
    expect(wrapper.text()).toContain("Page content");
  });
});
