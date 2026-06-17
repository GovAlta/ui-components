import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabDetails from "./details.vue";

describe("GoabDetails", () => {
  it("should render", () => {
    const wrapper = mount(GoabDetails, {
      props: { heading: "Details heading" },
    });
    const el = wrapper.find("goa-details").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabDetails, {
      props: {
        heading: "Details heading",
        open: true,
        maxWidth: "600px",
        testId: "details-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-details").element;
    expect(el.getAttribute("heading")).toBe("Details heading");
    expect(el.getAttribute("open")).toBe("true");
    expect(el.getAttribute("maxwidth")).toBe("600px");
    expect(el.getAttribute("testid")).toBe("details-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabDetails, {
      props: { heading: "Details heading" },
      slots: { default: "Details content" },
    });
    expect(wrapper.text()).toContain("Details content");
  });
});
