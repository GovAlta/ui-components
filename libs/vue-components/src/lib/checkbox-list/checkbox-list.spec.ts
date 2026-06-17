import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabCheckboxList from "./checkbox-list.vue";

describe("GoabCheckboxList", () => {
  it("should render", () => {
    const wrapper = mount(GoabCheckboxList);
    expect(wrapper.find("goa-checkbox-list").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCheckboxList, {
      props: {
        name: "fruits",
        testId: "checkbox-list-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-checkbox-list").element;
    expect(el.getAttribute("name")).toBe("fruits");
    expect(el.getAttribute("testid")).toBe("checkbox-list-test");
    expect(el.getAttribute("mt")).toBe("s");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabCheckboxList, {
      slots: { default: "Checkbox items" },
    });
    expect(wrapper.text()).toContain("Checkbox items");
  });
});
