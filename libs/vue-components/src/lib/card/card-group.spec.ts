import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabCardGroup from "./card-group.vue";

describe("GoabCardGroup", () => {
  it("should render", () => {
    const wrapper = mount(GoabCardGroup);
    expect(wrapper.find("goa-card-group").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCardGroup, {
      props: {
        testId: "card-group-test",
      },
    });
    const el = wrapper.find("goa-card-group").element;
    expect(el.getAttribute("testid")).toBe("card-group-test");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabCardGroup, {
      slots: { default: "Card group content" },
    });
    expect(wrapper.text()).toContain("Card group content");
  });
});
