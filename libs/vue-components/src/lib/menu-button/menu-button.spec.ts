import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabMenuButton from "./menu-button.vue";
import GoabMenuAction from "./menu-action.vue";

describe("GoabMenuButton", () => {
  it("should render", () => {
    const wrapper = mount(GoabMenuButton, {
      props: { text: "Menu" },
    });
    expect(wrapper.find("goa-menu-button").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabMenuButton, {
      props: {
        text: "Actions",
        disabled: true,
        variant: "normal",
        testId: "menu-button-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-menu-button").element;
    expect(el.getAttribute("text")).toBe("Actions");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("variant")).toBe("normal");
    expect(el.getAttribute("testid")).toBe("menu-button-test");
    expect(el.getAttribute("mt")).toBe("s");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabMenuButton, {
      props: { text: "Menu" },
      slots: { default: "Custom text" },
    });
    expect(wrapper.text()).toContain("Custom text");
  });

});

describe("GoabMenuAction", () => {
  it("should render", () => {
    const wrapper = mount(GoabMenuAction, {
      props: { text: "Action", action: "doSomething" },
    });
    expect(wrapper.find("goa-menu-action").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabMenuAction, {
      props: {
        text: "Delete",
        action: "deleteItem",
        icon: "trash",
        testId: "menu-action-test",
      },
    });
    const el = wrapper.find("goa-menu-action").element;
    expect(el.getAttribute("text")).toBe("Delete");
    expect(el.getAttribute("action")).toBe("deleteItem");
    expect(el.getAttribute("icon")).toBe("trash");
    expect(el.getAttribute("testid")).toBe("menu-action-test");
  });
});
