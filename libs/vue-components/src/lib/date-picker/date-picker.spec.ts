import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabDatePicker from "./date-picker.vue";

describe("GoabDatePicker", () => {
  it("should render", () => {
    const wrapper = mount(GoabDatePicker);
    expect(wrapper.find("goa-date-picker").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabDatePicker, {
      props: {
        name: "startDate",
        value: "2024-01-15",
        min: "2024-01-01",
        max: "2024-12-31",
        testId: "date-picker-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-date-picker").element;
    expect(el.getAttribute("name")).toBe("startDate");
    expect(el.getAttribute("value")).toBe("2024-01-15");
    expect(el.getAttribute("min")).toBe("2024-01-01");
    expect(el.getAttribute("max")).toBe("2024-12-31");
    expect(el.getAttribute("testid")).toBe("date-picker-test");
    expect(el.getAttribute("mt")).toBe("s");
  });
});
