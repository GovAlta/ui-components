import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabLink from "./link.vue";

describe("GoabLink", () => {
  it("should render", () => {
    const wrapper = mount(GoabLink, {
      props: { leadingIcon: "arrow-left" },
    });
    expect(wrapper.find("goa-link").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabLink, {
      props: {
        leadingIcon: "arrow-left",
        trailingIcon: "arrow-right",
        color: "primary",
        size: "large",
        testId: "link-test",
        mt: "s",
        mr: "m",
      },
    });
    const el = wrapper.find("goa-link").element;
    expect(el.getAttribute("leadingicon")).toBe("arrow-left");
    expect(el.getAttribute("trailingicon")).toBe("arrow-right");
    expect(el.getAttribute("color")).toBe("primary");
    expect(el.getAttribute("size")).toBe("large");
    expect(el.getAttribute("testid")).toBe("link-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabLink, {
      props: { leadingIcon: "arrow-left" },
      slots: { default: "Click here" },
    });
    expect(wrapper.text()).toContain("Click here");
  });

});
