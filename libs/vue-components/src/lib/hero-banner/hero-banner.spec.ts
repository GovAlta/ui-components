import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabHeroBanner from "./hero-banner.vue";

describe("GoabHeroBanner", () => {
  it("should render", () => {
    const wrapper = mount(GoabHeroBanner, {
      props: { heading: "Welcome" },
    });
    expect(wrapper.find("goa-hero-banner").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabHeroBanner, {
      props: {
        heading: "Welcome",
        backgroundUrl: "https://example.com/bg.jpg",
        minHeight: "400px",
        maxContentWidth: "1200px",
        backgroundColor: "#f8f8f8",
        textColor: "#333",
        testId: "hero-test",
      },
    });
    const el = wrapper.find("goa-hero-banner").element;
    expect(el.getAttribute("heading")).toBe("Welcome");
    expect(el.getAttribute("backgroundurl")).toBe("https://example.com/bg.jpg");
    expect(el.getAttribute("minheight")).toBe("400px");
    expect(el.getAttribute("maxcontentwidth")).toBe("1200px");
    expect(el.getAttribute("backgroundcolor")).toBe("#f8f8f8");
    expect(el.getAttribute("textcolor")).toBe("#333");
    expect(el.getAttribute("testid")).toBe("hero-test");
  });

  it("should render default slot content", () => {
    const wrapper = mount(GoabHeroBanner, {
      props: { heading: "Welcome" },
      slots: { default: "Banner content" },
    });
    expect(wrapper.text()).toContain("Banner content");
  });

  it("should render actions slot", () => {
    const wrapper = mount(GoabHeroBanner, {
      props: { heading: "Welcome" },
      slots: { actions: "Action content" },
    });
    expect(wrapper.text()).toContain("Action content");
  });
});
