import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabLinearProgress from "./linear-progress.vue";

describe("GoabLinearProgress", () => {
  it("should render", () => {
    const wrapper = mount(GoabLinearProgress);
    expect(wrapper.find("goa-linear-progress").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabLinearProgress, {
      props: {
        progress: 50,
        percentVisibility: "hidden",
        ariaLabel: "Loading",
        ariaLabelledBy: "label-id",
        testId: "test",
      },
    });
    const el = wrapper.find("goa-linear-progress").element;
    expect(el.getAttribute("progress")).toBe("50");
    expect(el.getAttribute("percent-visibility")).toBe("hidden");
    expect(el.getAttribute("aria-label")).toBe("Loading");
    expect(el.getAttribute("aria-labelledby")).toBe("label-id");
    expect(el.getAttribute("testid")).toBe("test");
  });
});
