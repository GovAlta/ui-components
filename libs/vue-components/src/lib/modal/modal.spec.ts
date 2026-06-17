import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabModal from "./modal.vue";

describe("GoabModal", () => {
  it("should render", () => {
    const wrapper = mount(GoabModal);
    expect(wrapper.find("goa-modal").element).toBeTruthy();
  });

  it("should render the properties with default open=false", () => {
    const wrapper = mount(GoabModal, {
      props: {
        heading: "Confirm",
        maxWidth: "500px",
        calloutVariant: "information",
        testId: "modal-test",
      },
    });
    const el = wrapper.find("goa-modal").element;
    expect(el.getAttribute("heading")).toBe("Confirm");
    expect(el.getAttribute("maxwidth")).toBe("500px");
    expect(el.getAttribute("calloutvariant")).toBe("information");
    expect(el.getAttribute("testid")).toBe("modal-test");
    expect(el.getAttribute("open")).toBe("false");
  });

  it("should render with open=true", () => {
    const wrapper = mount(GoabModal, {
      props: { open: true, heading: "Confirm" },
    });
    const el = wrapper.find("goa-modal").element;
    expect(el.getAttribute("open")).toBe("true");
  });

  it("should render heading slot", () => {
    const wrapper = mount(GoabModal, {
      slots: { heading: "Custom heading" },
    });
    expect(wrapper.text()).toContain("Custom heading");
  });

  it("should render actions slot", () => {
    const wrapper = mount(GoabModal, {
      slots: { actions: "Actions" },
    });
    expect(wrapper.text()).toContain("Actions");
  });

  it("responds to _close event", () => {
    const wrapper = mount(GoabModal);
    const el = wrapper.find("goa-modal").element;
    el.dispatchEvent(new CustomEvent("_close"));
    expect(wrapper.emitted()).toHaveProperty("onClose");
  });
});
