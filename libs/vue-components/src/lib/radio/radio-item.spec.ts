import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabRadioItem from "./radio-item.vue";

describe("GoabRadioItem", () => {
  it("should render", () => {
    const wrapper = mount(GoabRadioItem);
    const el = wrapper.find("goa-radio-item").element;
    expect(el).toBeTruthy();
  });

  it("should render with props", () => {
    const wrapper = mount(GoabRadioItem, {
      props: {
        name: "color",
        value: "red",
        label: "Red",
        description: "The color red",
        disabled: true,
        checked: true,
        error: true,
        compact: true,
        ariaLabel: "Red color option",
        maxWidth: "200px",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-radio-item").element;
    expect(el.getAttribute("name")).toBe("color");
    expect(el.getAttribute("value")).toBe("red");
    expect(el.getAttribute("label")).toBe("Red");
    expect(el.getAttribute("description")).toBe("The color red");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("checked")).toBe("true");
    expect(el.getAttribute("error")).toBe("true");
    expect(el.getAttribute("compact")).toBe("true");
    expect(el.getAttribute("aria-label")).toBe("Red color option");
    expect(el.getAttribute("maxwidth")).toBe("200px");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should not set boolean props when false", () => {
    const wrapper = mount(GoabRadioItem, {
      props: { disabled: false, checked: false, error: false, compact: false },
    });
    const el = wrapper.find("goa-radio-item").element;
    expect(el.hasAttribute("disabled")).toBe(false);
    expect(el.hasAttribute("checked")).toBe(false);
    expect(el.hasAttribute("error")).toBe(false);
    expect(el.hasAttribute("compact")).toBe(false);
  });

  it("should render slots", () => {
    const wrapper = mount(GoabRadioItem, {
      slots: {
        default: "Additional content",
        description: "Description slot content",
        reveal: "Reveal content",
      },
    });
    expect(wrapper.text()).toContain("Additional content");
    expect(wrapper.text()).toContain("Description slot content");
    expect(wrapper.text()).toContain("Reveal content");
  });
});
