import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabNotification from "./notification.vue";

describe("GoabNotification", () => {
  it("should render", () => {
    const wrapper = mount(GoabNotification);
    const el = wrapper.find("goa-notification").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabNotification, {
      props: {
        type: "important",
        ariaLive: "assertive",
        maxContentWidth: "800px",
        emphasis: "low",
        compact: true,
        testId: "notification-test",
      },
    });
    const el = wrapper.find("goa-notification").element;
    expect(el.getAttribute("type")).toBe("important");
    expect(el.getAttribute("arialive")).toBe("assertive");
    expect(el.getAttribute("maxcontentwidth")).toBe("800px");
    expect(el.getAttribute("emphasis")).toBe("low");
    expect(el.getAttribute("compact")).toBe("true");
    expect(el.getAttribute("testid")).toBe("notification-test");
  });

  it("should render content via slot", () => {
    const wrapper = mount(GoabNotification, {
      slots: { default: "Notification content" },
    });
    expect(wrapper.text()).toContain("Notification content");
  });

  it("responds to events", () => {
    const wrapper = mount(GoabNotification);
    const el = wrapper.find("goa-notification").element;
    el.dispatchEvent(new CustomEvent("_dismiss"));
    expect(wrapper.emitted()).toHaveProperty("onDismiss");
  });
});
