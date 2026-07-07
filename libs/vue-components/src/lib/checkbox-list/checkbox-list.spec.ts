import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabCheckboxList from "./checkbox-list.vue";

describe("GoabCheckboxList", () => {
  it("should render", () => {
    const wrapper = mount(GoabCheckboxList, {
      props: { name: "test" },
    });
    expect(wrapper.find("goa-checkbox-list").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCheckboxList, {
      props: {
        name: "fruits",
        disabled: true,
        testId: "checkbox-list-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-checkbox-list").element;
    expect(el.getAttribute("name")).toBe("fruits");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("testid")).toBe("checkbox-list-test");
    expect(el.getAttribute("mt")).toBe("s");
  });

  it("should set disabled to false when disabled=false", () => {
    const wrapper = mount(GoabCheckboxList, {
      props: { name: "fruits", disabled: false },
    });
    const el = wrapper.find("goa-checkbox-list").element;
    expect(el.getAttribute("disabled")).toBe("false");
  });

  it("should update disabled from true to false", async () => {
    const wrapper = mount(GoabCheckboxList, {
      props: { name: "fruits", disabled: true },
    });
    const el = wrapper.find("goa-checkbox-list").element;
    expect(el.getAttribute("disabled")).toBe("true");

    await wrapper.setProps({ disabled: false });

    expect(el.getAttribute("disabled")).toBe("false");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabCheckboxList, {
      props: { name: "test" },
      slots: { default: "Checkbox items" },
    });
    expect(wrapper.text()).toContain("Checkbox items");
  });
});
