import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabLinkButton from "./link-button.vue";

describe("GoabLinkButton", () => {
  it("should render", () => {
    const wrapper = mount(GoabLinkButton, {
      props: { href: "https://example.com" },
    });
    expect(wrapper.find("goa-link-button").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabLinkButton, {
      props: {
        href: "https://example.com",
        leadingIcon: "arrow-left",
        trailingIcon: "arrow-right",
        color: "primary",
        size: "large",
        testId: "link-button-test",
        mt: "s",
        mr: "m",
      },
    });
    const el = wrapper.find("goa-link-button").element;
    expect(el.getAttribute("href")).toBe("https://example.com");
    expect(el.getAttribute("leadingicon")).toBe("arrow-left");
    expect(el.getAttribute("trailingicon")).toBe("arrow-right");
    expect(el.getAttribute("color")).toBe("primary");
    expect(el.getAttribute("size")).toBe("large");
    expect(el.getAttribute("testid")).toBe("link-button-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabLinkButton, {
      props: { href: "https://example.com" },
      slots: { default: "Click here" },
    });
    expect(wrapper.text()).toContain("Click here");
  });
});
