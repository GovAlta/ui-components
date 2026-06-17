import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabMicrositeHeader from "./microsite-header.vue";

describe("GoabMicrositeHeader", () => {
  it("should render", () => {
    const wrapper = mount(GoabMicrositeHeader, {
      props: { type: "live" },
    });
    expect(wrapper.find("goa-microsite-header").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabMicrositeHeader, {
      props: {
        type: "alpha",
        version: "1.0",
        feedbackUrl: "https://feedback.com",
        maxContentWidth: "1200px",
        feedbackUrlTarget: "blank",
        headerUrlTarget: "self",
        testId: "microsite-test",
      },
    });
    const el = wrapper.find("goa-microsite-header").element;
    expect(el.getAttribute("type")).toBe("alpha");
    expect(el.getAttribute("version")).toBe("1.0");
    expect(el.getAttribute("feedbackurl")).toBe("https://feedback.com");
    expect(el.getAttribute("maxcontentwidth")).toBe("1200px");
    expect(el.getAttribute("feedbackurltarget")).toBe("blank");
    expect(el.getAttribute("headerurltarget")).toBe("self");
    expect(el.getAttribute("testid")).toBe("microsite-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabMicrositeHeader, {
      props: { type: "live" },
      slots: { default: "Header content" },
    });
    expect(wrapper.text()).toContain("Header content");
  });

  it("should render version slot", () => {
    const wrapper = mount(GoabMicrositeHeader, {
      props: { type: "live" },
      slots: { version: "Custom version" },
    });
    expect(wrapper.text()).toContain("Custom version");
  });

  it("responds to onFeedbackClick", () => {
    const fn = vi.fn();
    const wrapper = mount(GoabMicrositeHeader, {
      props: { type: "live", onFeedbackClick: fn },
    });
    const el = wrapper.find("goa-microsite-header").element;
    el.dispatchEvent(new CustomEvent("_feedbackClick"));
    expect(fn).toHaveBeenCalled();
  });
});
