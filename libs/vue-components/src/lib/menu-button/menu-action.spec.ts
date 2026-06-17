import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabMenuAction from "./menu-action.vue";

describe("GoabMenuAction", () => {
  it("should render", () => {
    const wrapper = mount(GoabMenuAction, {
      props: { text: "Action", action: "action1" },
    });
    const el = wrapper.find("goa-menu-action").element;
    expect(el).toBeTruthy();
  });

  it("should render with props", () => {
    const wrapper = mount(GoabMenuAction, {
      props: {
        text: "Edit",
        action: "edit",
        icon: "pencil",
        testId: "edit-action",
      },
    });
    const el = wrapper.find("goa-menu-action").element;
    expect(el.getAttribute("text")).toBe("Edit");
    expect(el.getAttribute("action")).toBe("edit");
    expect(el.getAttribute("icon")).toBe("pencil");
    expect(el.getAttribute("testid")).toBe("edit-action");
  });
});
