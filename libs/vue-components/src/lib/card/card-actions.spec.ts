import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabCardActions from "./card-actions.vue";

describe("GoabCardActions", () => {
  it("should render", () => {
    const wrapper = mount(GoabCardActions);
    expect(wrapper.find("goa-card-actions").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCardActions, {
      props: {
        testId: "card-actions-test",
      },
    });
    const el = wrapper.find("goa-card-actions").element;
    expect(el.getAttribute("testid")).toBe("card-actions-test");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabCardActions, {
      slots: { default: "Action buttons" },
    });
    expect(wrapper.text()).toContain("Action buttons");
  });
});
