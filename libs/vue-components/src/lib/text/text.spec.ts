import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabText from "./text.vue";

describe("GoabText", () => {
  it("should render", () => {
    const wrapper = mount(GoabText);
    expect(wrapper.find("goa-text").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabText, {
      props: {
        tag: "h1",
        size: "large",
        maxWidth: "65ch",
        color: "primary",
        id: "text-id",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "text-test",
      },
    });
    const el = wrapper.find("goa-text").element;
    expect(el.getAttribute("as")).toBe("h1");
    expect(el.getAttribute("size")).toBe("large");
    expect(el.getAttribute("maxwidth")).toBe("65ch");
    expect(el.getAttribute("color")).toBe("primary");
    expect(el.getAttribute("id")).toBe("text-id");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("text-test");
  });

  it("should use tag prop over as prop", () => {
    const wrapper = mount(GoabText, {
      props: { as: "span", tag: "h2" },
    });
    const el = wrapper.find("goa-text").element;
    expect(el.getAttribute("as")).toBe("h2");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabText, {
      slots: { default: "Text content" },
    });
    expect(wrapper.text()).toContain("Text content");
  });
});
