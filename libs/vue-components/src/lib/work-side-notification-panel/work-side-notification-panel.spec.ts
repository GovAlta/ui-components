import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabWorkSideNotificationPanel from "./work-side-notification-panel.vue";

describe("GoabWorkSideNotificationPanel", () => {
  it("should render", () => {
    const wrapper = mount(GoabWorkSideNotificationPanel);
    const el = wrapper.find("goa-work-side-notification-panel").element;
    expect(el).toBeTruthy();
  });

  it("should render with props", () => {
    const wrapper = mount(GoabWorkSideNotificationPanel, {
      props: {
        heading: "Alerts",
        activeTab: "all",
        testId: "notifications-panel",
      },
    });
    const el = wrapper.find("goa-work-side-notification-panel").element;
    expect(el.getAttribute("heading")).toBe("Alerts");
    expect(el.getAttribute("active-tab")).toBe("all");
    expect(el.getAttribute("testid")).toBe("notifications-panel");
  });

  it("handles the onMarkAllRead event", () => {
    const wrapper = mount(GoabWorkSideNotificationPanel);
    const el = wrapper.find("goa-work-side-notification-panel").element;
    el.dispatchEvent(new CustomEvent("_markAllRead"));
    expect(wrapper.emitted("onMarkAllRead")).toBeTruthy();
  });

  it("handles the onViewAll event", () => {
    const wrapper = mount(GoabWorkSideNotificationPanel);
    const el = wrapper.find("goa-work-side-notification-panel").element;
    el.dispatchEvent(new CustomEvent("_viewAll"));
    expect(wrapper.emitted("onViewAll")).toBeTruthy();
  });

  it("should render default slot content", () => {
    const wrapper = mount(GoabWorkSideNotificationPanel, {
      slots: { default: "Panel content" },
    });
    expect(wrapper.text()).toContain("Panel content");
  });
});
