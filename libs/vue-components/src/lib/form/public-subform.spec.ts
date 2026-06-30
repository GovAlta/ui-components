import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPublicSubform from "./public-subform.vue";

describe("GoabPublicSubform", () => {
  it("should render", () => {
    const wrapper = mount(GoabPublicSubform);
    expect(wrapper.find("goa-public-subform").element).toBeTruthy();
  });

  it("should render the properties with kebab transform", () => {
    const wrapper = mount(GoabPublicSubform, {
      props: {
        id: "sub1",
        name: "subform-name",
        continueMsg: "Proceed",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-public-subform").element;
    expect(el.getAttribute("id")).toBe("sub1");
    expect(el.getAttribute("name")).toBe("subform-name");
    expect(el.getAttribute("continue-msg")).toBe("Proceed");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabPublicSubform, {
      slots: { default: "Subform content" },
    });
    expect(wrapper.text()).toContain("Subform content");
  });

  it("responds to _init and _stateChange events", () => {
    const wrapper = mount(GoabPublicSubform);
    const el = wrapper.find("goa-public-subform").element;
    el.dispatchEvent(new CustomEvent("_init"));
    expect(wrapper.emitted()).toHaveProperty("onInit");
    el.dispatchEvent(new CustomEvent("_stateChange"));
    expect(wrapper.emitted()).toHaveProperty("onStateChange");
  });
});
