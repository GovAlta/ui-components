import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabCalendar from "./calendar.vue";

describe("GoabCalendar", () => {
  it("should render", () => {
    const wrapper = mount(GoabCalendar);
    expect(wrapper.find("goa-calendar").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabCalendar, {
      props: {
        name: "birthdate",
        value: "2024-01-15",
        min: "2024-01-01",
        max: "2024-12-31",
        testId: "calendar-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-calendar").element;
    expect(el.getAttribute("name")).toBe("birthdate");
    expect(el.getAttribute("value")).toBe("2024-01-15");
    expect(el.getAttribute("min")).toBe("2024-01-01");
    expect(el.getAttribute("max")).toBe("2024-12-31");
    expect(el.getAttribute("testid")).toBe("calendar-test");
    expect(el.getAttribute("mt")).toBe("s");
  });

  it("responds to _change event", () => {
    const wrapper = mount(GoabCalendar);
    const el = wrapper.find("goa-calendar").element;
    const detail = { value: "2024-06-15", name: "test" };
    el.dispatchEvent(new CustomEvent("_change", { detail }));
    expect(wrapper.emitted()).toHaveProperty("onChange");
    expect(wrapper.emitted("onChange")[0]).toEqual([detail]);
  });
});
