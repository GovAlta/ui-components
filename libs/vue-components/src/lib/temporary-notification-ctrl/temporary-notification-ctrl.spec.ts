import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabTemporaryNotificationCtrl from "./temporary-notification-ctrl.vue";

describe("GoabTemporaryNotificationCtrl", () => {
  it("should render", () => {
    const wrapper = mount(GoabTemporaryNotificationCtrl);
    expect(wrapper.find("goa-temp-notification-ctrl").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabTemporaryNotificationCtrl, {
      props: {
        testId: "temp-notification-ctrl-test",
      },
    });
    const el = wrapper.find("goa-temp-notification-ctrl").element;
    expect(el.getAttribute("testid")).toBe("temp-notification-ctrl-test");
  });
});
