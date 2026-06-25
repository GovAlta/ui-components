import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabDropdownItem from "./dropdown-item.vue";

describe("GoabDropdownItem", () => {
  it("should render", () => {
    const wrapper = mount(GoabDropdownItem, {
      props: { value: "option1" },
    });
    expect(wrapper.find("goa-dropdown-item").element).toBeTruthy();
  });

  it("should render the properties with kebab-case transform", () => {
    const wrapper = mount(GoabDropdownItem, {
      props: {
        value: "option1",
        label: "Option 1",
        filter: "group1",
        mountType: "append",
      },
    });
    const el = wrapper.find("goa-dropdown-item").element;
    expect(el.getAttribute("value")).toBe("option1");
    expect(el.getAttribute("label")).toBe("Option 1");
    expect(el.getAttribute("filter")).toBe("group1");
    expect(el.getAttribute("mount")).toBe("append");
  });

  it("should use append as default mountType", () => {
    const wrapper = mount(GoabDropdownItem, {
      props: { value: "option1" },
    });
    const el = wrapper.find("goa-dropdown-item").element;
    expect(el.getAttribute("mount")).toBe("append");
  });
});
