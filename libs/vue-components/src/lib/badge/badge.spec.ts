import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabBadge from "./badge.vue";

describe("GoabBadge", () => {
  it("should render", () => {
    const wrapper = mount(GoabBadge, { props: { type: "information" } });
    const el = wrapper.find("goa-badge").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabBadge, {
      props: {
        type: "success",
        iconType: "checkmark",
        content: "Badge text",
        ariaLabel: "Success badge",
        size: "large",
        emphasis: "subtle",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        testId: "badge-test",
      },
    });
    const el = wrapper.find("goa-badge").element;
    expect(el.getAttribute("type")).toBe("success");
    expect(el.getAttribute("icontype")).toBe("checkmark");
    expect(el.getAttribute("icon")).toBe("true");
    expect(el.getAttribute("content")).toBe("Badge text");
    expect(el.getAttribute("arialabel")).toBe("Success badge");
    expect(el.getAttribute("size")).toBe("large");
    expect(el.getAttribute("emphasis")).toBe("subtle");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("testid")).toBe("badge-test");
  });

  it("should default size and emphasis", () => {
    const wrapper = mount(GoabBadge, { props: { type: "success" } });
    const el = wrapper.find("goa-badge").element;
    expect(el.getAttribute("size")).toBe("medium");
    expect(el.getAttribute("emphasis")).toBe("strong");
  });

  it("should set the icon attribute based on iconType", () => {
    const withIcon = mount(GoabBadge, { props: { type: "success", iconType: "checkmark" } });
    expect(withIcon.find("goa-badge").element.getAttribute("icon")).toBe("true");

    const withoutIcon = mount(GoabBadge, { props: { type: "success" } });
    expect(withoutIcon.find("goa-badge").element.getAttribute("icon")).toBe("false");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabBadge, {
      slots: { default: "Slot content" },
    });
    expect(wrapper.text()).toContain("Slot content");
  });
});
