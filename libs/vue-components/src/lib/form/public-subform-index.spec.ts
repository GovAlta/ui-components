import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPublicSubformIndex from "./public-subform-index.vue";

describe("GoabPublicSubformIndex", () => {
  it("should render", () => {
    const wrapper = mount(GoabPublicSubformIndex);
    expect(wrapper.find("goa-public-subform-index").element).toBeTruthy();
  });

  it("should render the properties with kebab transform", () => {
    const wrapper = mount(GoabPublicSubformIndex, {
      props: {
        heading: "Subform Index",
        sectionTitle: "Section",
        actionButtonText: "Add Item",
        buttonVisibility: "visible",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-public-subform-index").element;
    expect(el.getAttribute("heading")).toBe("Subform Index");
    expect(el.getAttribute("section-title")).toBe("Section");
    expect(el.getAttribute("action-button-text")).toBe("Add Item");
    expect(el.getAttribute("button-visibility")).toBe("visible");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should set default button-visibility to hidden", () => {
    const wrapper = mount(GoabPublicSubformIndex);
    const el = wrapper.find("goa-public-subform-index").element;
    expect(el.getAttribute("button-visibility")).toBe("hidden");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabPublicSubformIndex, {
      slots: { default: "Index content" },
    });
    expect(wrapper.text()).toContain("Index content");
  });

  it("should have slot attribute set to subform-index", () => {
    const wrapper = mount(GoabPublicSubformIndex);
    const el = wrapper.find("goa-public-subform-index").element;
    expect(el.getAttribute("slot")).toBe("subform-index");
  });
});
