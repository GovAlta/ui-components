import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabPushDrawer from "./push-drawer.vue";

describe("GoabPushDrawer", () => {
  it("should render", () => {
    const wrapper = mount(GoabPushDrawer);
    expect(wrapper.find("goa-push-drawer").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabPushDrawer, {
      props: {
        open: true,
        heading: "Drawer title",
        testId: "push-drawer-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-push-drawer").element;
    expect(el.getAttribute("open")).toBe("true");
    expect(el.getAttribute("heading")).toBe("Drawer title");
    expect(el.getAttribute("testid")).toBe("push-drawer-test");
    expect(el.getAttribute("mt")).toBe("s");
  });

  it("should not set open when false", () => {
    const wrapper = mount(GoabPushDrawer, {
      props: { open: false },
    });
    const el = wrapper.find("goa-push-drawer").element;
    expect(el.hasAttribute("open")).toBe(false);
  });

  it("should render content via default slot", () => {
    const wrapper = mount(GoabPushDrawer, {
      slots: { default: "Drawer content" },
    });
    expect(wrapper.text()).toContain("Drawer content");
  });

  it("responds to _close event", () => {
    const wrapper = mount(GoabPushDrawer);
    const el = wrapper.find("goa-push-drawer").element;
    el.dispatchEvent(new CustomEvent("_close"));
    expect(wrapper.emitted()).toHaveProperty("onClose");
  });
});
