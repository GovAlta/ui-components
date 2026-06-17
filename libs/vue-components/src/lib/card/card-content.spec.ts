import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabCardContent from "./card-content.vue";

describe("GoabCardContent", () => {
  it("should render", () => {
    const wrapper = mount(GoabCardContent);
    expect(wrapper.find("goa-card-content").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCardContent, {
      props: {
        testId: "card-content-test",
      },
    });
    const el = wrapper.find("goa-card-content").element;
    expect(el.getAttribute("testid")).toBe("card-content-test");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabCardContent, {
      slots: { default: "Card content" },
    });
    expect(wrapper.text()).toContain("Card content");
  });
});
