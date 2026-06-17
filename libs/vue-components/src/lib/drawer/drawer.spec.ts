import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabDrawer from "./drawer.vue";

describe("GoabDrawer", () => {
  it("should render", () => {
    const wrapper = mount(GoabDrawer, {
      props: { position: "right" },
    });
    const el = wrapper.find("goa-drawer").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabDrawer, {
      props: {
        position: "left",
        open: true,
        heading: "Drawer heading",
        maxSize: "480px",
        testId: "drawer-test",
      },
    });
    const el = wrapper.find("goa-drawer").element;
    expect(el.getAttribute("position")).toBe("left");
    expect(el.getAttribute("open")).toBe("true");
    expect(el.getAttribute("heading")).toBe("Drawer heading");
    expect(el.getAttribute("maxsize")).toBe("480px");
    expect(el.getAttribute("testid")).toBe("drawer-test");
  });

  it("should render slots", () => {
    const wrapper = mount(GoabDrawer, {
      props: { position: "right" },
      slots: {
        default: "Body content",
        heading: "Custom heading",
        actions: "Footer actions",
      },
    });
    expect(wrapper.text()).toContain("Body content");
  });

  it("responds to events", () => {
    const wrapper = mount(GoabDrawer, {
      props: { position: "right" },
    });
    const el = wrapper.find("goa-drawer").element;
    el.dispatchEvent(new CustomEvent("_close"));
    expect(wrapper.emitted()).toHaveProperty("onClose");
  });
});
