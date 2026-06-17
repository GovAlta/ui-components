import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabIconButton from "./icon-button.vue";

describe("GoabIconButton", () => {
  it("should render", () => {
    const wrapper = mount(GoabIconButton, {
      props: { icon: "close" },
    });
    const el = wrapper.find("goa-icon-button").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabIconButton, {
      props: {
        icon: "close",
        size: "large",
        variant: "destructive",
        theme: "filled",
        title: "Close button",
        disabled: true,
        ariaLabel: "Close",
        action: "close-action",
        actionArg: "some-arg",
        actionArgs: { key: "value" },
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "icon-button-test",
      },
    });
    const el = wrapper.find("goa-icon-button").element;
    expect(el.getAttribute("icon")).toBe("close");
    expect(el.getAttribute("size")).toBe("large");
    expect(el.getAttribute("variant")).toBe("destructive");
    expect(el.getAttribute("theme")).toBe("filled");
    expect(el.getAttribute("title")).toBe("Close button");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("aria-label")).toBe("Close");
    expect(el.getAttribute("action")).toBe("close-action");
    expect(el.getAttribute("action-arg")).toBe("some-arg");
    expect(el.getAttribute("action-args")).toBe('{"key":"value"}');
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("icon-button-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabIconButton, {
      props: { icon: "close" },
      slots: { default: "Child content" },
    });
    expect(wrapper.text()).toContain("Child content");
  });

  it("responds to events", () => {
    const wrapper = mount(GoabIconButton, {
      props: { icon: "close" },
    });
    const el = wrapper.find("goa-icon-button").element;
    el.dispatchEvent(new CustomEvent("_click"));
    expect(wrapper.emitted()).toHaveProperty("onClick");
  });
});
