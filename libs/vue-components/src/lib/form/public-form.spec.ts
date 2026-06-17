import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPublicForm from "./public-form.vue";

describe("GoabPublicForm", () => {
  it("should render", () => {
    const wrapper = mount(GoabPublicForm);
    expect(wrapper.find("goa-public-form").element).toBeTruthy();
  });

  it("should render the properties with lowercase transform", () => {
    const wrapper = mount(GoabPublicForm, {
      props: {
        status: "initializing",
        name: "my-form",
      },
    });
    const el = wrapper.find("goa-public-form").element;
    expect(el.getAttribute("status")).toBe("initializing");
    expect(el.getAttribute("name")).toBe("my-form");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabPublicForm, {
      slots: { default: "Form content" },
    });
    expect(wrapper.text()).toContain("Form content");
  });

  it("responds to _complete event", () => {
    const wrapper = mount(GoabPublicForm);
    const el = wrapper.find("goa-public-form").element;
    const detail = { uuid: "abc", form: {}, history: [], editting: "", status: "complete" };
    el.dispatchEvent(new CustomEvent("_complete", { detail }));
    expect(wrapper.emitted()).toHaveProperty("onComplete");
    expect(wrapper.emitted("onComplete")[0]).toEqual([detail]);
  });

  it("responds to _stateChange event with detail.data", () => {
    const wrapper = mount(GoabPublicForm);
    const el = wrapper.find("goa-public-form").element;
    el.dispatchEvent(new CustomEvent("_stateChange", { detail: { data: { id: "123" } } }));
    expect(wrapper.emitted()).toHaveProperty("onStateChange");
    expect(wrapper.emitted("onStateChange")[0]).toEqual([{ id: "123" }]);
  });
});
