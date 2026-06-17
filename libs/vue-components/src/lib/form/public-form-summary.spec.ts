import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPublicFormSummary from "./public-form-summary.vue";

describe("GoabPublicFormSummary", () => {
  it("should render", () => {
    const wrapper = mount(GoabPublicFormSummary);
    expect(wrapper.find("goa-public-form-summary").element).toBeTruthy();
  });

  it("should render the properties with lowercase transform", () => {
    const wrapper = mount(GoabPublicFormSummary, {
      props: {
        heading: "Summary heading",
      },
    });
    const el = wrapper.find("goa-public-form-summary").element;
    expect(el.getAttribute("heading")).toBe("Summary heading");
  });
});
