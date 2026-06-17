import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPublicFormTask from "./public-form-task.vue";

describe("GoabPublicFormTask", () => {
  it("should render", () => {
    const wrapper = mount(GoabPublicFormTask);
    expect(wrapper.find("goa-public-form-task").element).toBeTruthy();
  });

  it("should render the properties with lowercase transform", () => {
    const wrapper = mount(GoabPublicFormTask, {
      props: {
        status: "completed",
      },
    });
    const el = wrapper.find("goa-public-form-task").element;
    expect(el.getAttribute("status")).toBe("completed");
  });

  it("should default status to cannot-start", () => {
    const wrapper = mount(GoabPublicFormTask);
    const el = wrapper.find("goa-public-form-task").element;
    expect(el.getAttribute("status")).toBe("cannot-start");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabPublicFormTask, {
      slots: { default: "Task content" },
    });
    expect(wrapper.text()).toContain("Task content");
  });
});
