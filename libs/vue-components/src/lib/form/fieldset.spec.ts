import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabFieldset from "./fieldset.vue";

describe("GoabFieldset", () => {
  it("should render", () => {
    const wrapper = mount(GoabFieldset);
    expect(wrapper.find("goa-fieldset").element).toBeTruthy();
  });

  it("should render the properties with kebab transform", () => {
    const wrapper = mount(GoabFieldset, {
      props: {
        id: "fieldset1",
        sectionTitle: "Section Title",
        dispatchOn: "continue",
      },
    });
    const el = wrapper.find("goa-fieldset").element;
    expect(el.getAttribute("id")).toBe("fieldset1");
    expect(el.getAttribute("section-title")).toBe("Section Title");
    expect(el.getAttribute("dispatch-on")).toBe("continue");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabFieldset, {
      slots: { default: "Fieldset content" },
    });
    expect(wrapper.text()).toContain("Fieldset content");
  });

  it("responds to _continue event", () => {
    const wrapper = mount(GoabFieldset);
    const el = wrapper.find("goa-fieldset").element;
    const detail = { el, state: {}, cancelled: false };
    el.dispatchEvent(new CustomEvent("_continue", { detail }));
    expect(wrapper.emitted()).toHaveProperty("onContinue");
    expect(wrapper.emitted("onContinue")[0]).toEqual([detail]);
  });
});
