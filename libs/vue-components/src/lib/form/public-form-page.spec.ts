import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPublicFormPage from "./public-form-page.vue";

describe("GoabPublicFormPage", () => {
  it("should render", () => {
    const wrapper = mount(GoabPublicFormPage);
    expect(wrapper.find("goa-public-form-page").element).toBeTruthy();
  });

  it("should render the properties with kebab transform", () => {
    const wrapper = mount(GoabPublicFormPage, {
      props: {
        id: "page1",
        heading: "Personal Info",
        subHeading: "Enter your details",
        summaryHeading: "Summary",
        sectionTitle: "Section 1",
        backUrl: "/previous",
        type: "step",
        buttonText: "Continue",
        buttonVisibility: "visible",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-public-form-page").element;
    expect(el.getAttribute("id")).toBe("page1");
    expect(el.getAttribute("heading")).toBe("Personal Info");
    expect(el.getAttribute("sub-heading")).toBe("Enter your details");
    expect(el.getAttribute("summary-heading")).toBe("Summary");
    expect(el.getAttribute("section-title")).toBe("Section 1");
    expect(el.getAttribute("back-url")).toBe("/previous");
    expect(el.getAttribute("type")).toBe("step");
    expect(el.getAttribute("button-text")).toBe("Continue");
    expect(el.getAttribute("button-visibility")).toBe("visible");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabPublicFormPage, {
      slots: { default: "Page content" },
    });
    expect(wrapper.text()).toContain("Page content");
  });

  it("responds to _continue event", () => {
    const wrapper = mount(GoabPublicFormPage);
    const el = wrapper.find("goa-public-form-page").element;
    el.dispatchEvent(new CustomEvent("_continue"));
    expect(wrapper.emitted()).toHaveProperty("onContinue");
  });
});
