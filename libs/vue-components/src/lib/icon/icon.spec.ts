import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabIcon from "./icon.vue";

describe("GoabIcon", () => {
  it("should render", () => {
    const wrapper = mount(GoabIcon, {
      props: { type: "home" },
    });
    expect(wrapper.find("goa-icon").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabIcon, {
      props: {
        type: "home",
        size: "large",
        theme: "filled",
        inverted: true,
        fillColor: "red",
        opacity: 0.5,
        title: "Home icon",
        ariaLabel: "Home",
        role: "img",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "icon-test",
      },
    });
    const el = wrapper.find("goa-icon").element;
    expect(el.getAttribute("type")).toBe("home");
    expect(el.getAttribute("size")).toBe("large");
    expect(el.getAttribute("theme")).toBe("filled");
    expect(el.getAttribute("inverted")).toBe("true");
    expect(el.getAttribute("fillcolor")).toBe("red");
    expect(el.getAttribute("opacity")).toBe("0.5");
    expect(el.getAttribute("title")).toBe("Home icon");
    expect(el.getAttribute("arialabel")).toBe("Home");
    expect(el.getAttribute("role")).toBe("img");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("icon-test");
  });

  it("should not set inverted when false", () => {
    const wrapper = mount(GoabIcon, {
      props: { type: "home", inverted: false },
    });
    const el = wrapper.find("goa-icon").element;
    expect(el.hasAttribute("inverted")).toBe(false);
  });

  it("should pass inverted string through", () => {
    const wrapper = mount(GoabIcon, {
      props: { type: "home", inverted: "true" },
    });
    const el = wrapper.find("goa-icon").element;
    expect(el.getAttribute("inverted")).toBe("true");
  });
});
