import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPublicFormTaskList from "./public-form-task-list.vue";

describe("GoabPublicFormTaskList", () => {
  it("should render", () => {
    const wrapper = mount(GoabPublicFormTaskList);
    expect(wrapper.find("goa-public-form-task-list").element).toBeTruthy();
  });

  it("should render the properties with lowercase transform", () => {
    const wrapper = mount(GoabPublicFormTaskList, {
      props: {
        heading: "Task List",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-public-form-task-list").element;
    expect(el.getAttribute("heading")).toBe("Task List");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabPublicFormTaskList, {
      slots: { default: "Task list content" },
    });
    expect(wrapper.text()).toContain("Task list content");
  });
});
