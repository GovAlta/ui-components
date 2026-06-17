import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabFormStep from "./form-step.vue";

describe("GoabFormStep", () => {
  it("should render with required text prop", () => {
    const wrapper = mount(GoabFormStep, {
      props: { text: "Step 1" },
    });
    const el = wrapper.find("goa-form-step").element;
    expect(el.getAttribute("text")).toBe("Step 1");
    expect(el.getAttribute("status")).toBeNull();
    expect(el.getAttribute("disabled")).toBeNull();
  });

  it("should render with all props", () => {
    const wrapper = mount(GoabFormStep, {
      props: {
        text: "Step 2",
        status: "complete",
        disabled: true,
        testId: "step-test",
      },
    });
    const el = wrapper.find("goa-form-step").element;
    expect(el.getAttribute("text")).toBe("Step 2");
    expect(el.getAttribute("status")).toBe("complete");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("testid")).toBe("step-test");
  });

  it("should not set disabled when disabled=false", () => {
    const wrapper = mount(GoabFormStep, {
      props: { text: "Step 1", disabled: false },
    });
    const el = wrapper.find("goa-form-step").element;
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  it("should pass data-grid attributes", () => {
    const wrapper = mount(GoabFormStep, {
      props: { text: "Step 1", "data-grid": "cell" },
    });
    const el = wrapper.find("goa-form-step").element;
    expect(el.getAttribute("data-grid")).toBe("cell");
  });
});
