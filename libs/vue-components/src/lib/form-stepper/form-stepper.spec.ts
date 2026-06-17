import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabFormStepper from "./form-stepper.vue";

describe("GoabFormStepper", () => {
  it("should render successfully", () => {
    const wrapper = mount(GoabFormStepper, {
      props: {
        step: 2,
        testId: "form-test-id",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-form-stepper").element;
    expect(el.getAttribute("step")).toBe("2");
    expect(el.getAttribute("testid")).toBe("form-test-id");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("handles the onChange event", () => {
    const wrapper = mount(GoabFormStepper, {
      props: { step: 1 },
    });
    const el = wrapper.find("goa-form-stepper").element;
    el.dispatchEvent(new CustomEvent("_change", { detail: { step: 2 } }));
    expect(wrapper.emitted("onChange")).toBeTruthy();
    expect(wrapper.emitted("onChange")?.[0][0]).toMatchObject({ step: 2 });
  });

  it("renders children via default slot", () => {
    const wrapper = mount(GoabFormStepper, {
      props: { step: 1 },
      slots: { default: "<goa-form-step text='Step 1' />" },
    });
    const el = wrapper.find("goa-form-stepper").element;
    expect(el.querySelector("goa-form-step")).toBeTruthy();
  });

  it("should pass data-grid attributes", () => {
    const wrapper = mount(GoabFormStepper, {
      props: { step: 1, "data-grid": "cell" },
    });
    const el = wrapper.find("goa-form-stepper").element;
    expect(el.getAttribute("data-grid")).toBe("cell");
  });
});
