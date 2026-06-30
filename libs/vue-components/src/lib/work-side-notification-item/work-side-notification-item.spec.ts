import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabWorkSideNotificationItem from "./work-side-notification-item.vue";

describe("GoabWorkSideNotificationItem", () => {
  it("should render", () => {
    const wrapper = mount(GoabWorkSideNotificationItem, {
      props: { description: "New notification" },
    });
    const el = wrapper.find("goa-work-side-notification-item").element;
    expect(el).toBeTruthy();
  });

  it("should render with props", () => {
    const wrapper = mount(GoabWorkSideNotificationItem, {
      props: {
        description: "New notification",
        type: "default",
        timestamp: "2021-01-01T00:00:00Z",
        title: "Notification Title",
        readStatus: "unread",
        priority: "normal",
        testId: "notification-item",
      },
    });
    const el = wrapper.find("goa-work-side-notification-item").element;
    expect(el.getAttribute("description")).toBe("New notification");
    expect(el.getAttribute("type")).toBe("default");
    expect(el.getAttribute("timestamp")).toBe("2021-01-01T00:00:00Z");
    expect(el.getAttribute("title")).toBe("Notification Title");
    expect(el.getAttribute("read-status")).toBe("unread");
    expect(el.getAttribute("priority")).toBe("normal");
    expect(el.getAttribute("testid")).toBe("notification-item");
  });

  it("handles the onClick event", () => {
    const wrapper = mount(GoabWorkSideNotificationItem, {
      props: { description: "Click test" },
    });
    const el = wrapper.find("goa-work-side-notification-item").element;
    el.dispatchEvent(new CustomEvent("_click"));
    expect(wrapper.emitted("onClick")).toBeTruthy();
  });
});
