import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabChip from "./chip.vue";

describe("GoabChip", () => {
  it("should render", () => {
    const wrapper = mount(GoabChip, {
      props: { content: "Label" },
    });
    expect(wrapper.find("goa-chip").element).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabChip, {
      props: {
        content: "Chip label",
        deletable: true,
        leadingIcon: "alert",
        iconTheme: "filled",
        error: true,
        variant: "assistive",
        testId: "chip-test",
        mt: "s",
      },
    });
    const el = wrapper.find("goa-chip").element;
    expect(el.getAttribute("content")).toBe("Chip label");
    expect(el.getAttribute("deletable")).toBe("true");
    expect(el.getAttribute("leadingicon")).toBe("alert");
    expect(el.getAttribute("icontheme")).toBe("filled");
    expect(el.getAttribute("error")).toBe("true");
    expect(el.getAttribute("variant")).toBe("assistive");
    expect(el.getAttribute("testid")).toBe("chip-test");
    expect(el.getAttribute("mt")).toBe("s");
  });

  it("responds to _click event", () => {
    const wrapper = mount(GoabChip, { props: { content: "Click me" } });
    const el = wrapper.find("goa-chip").element;
    el.dispatchEvent(new CustomEvent("_click"));
    expect(wrapper.emitted()).toHaveProperty("onClick");
  });

  it("should not set deletable when false", () => {
    const wrapper = mount(GoabChip, {
      props: { content: "Label", deletable: false },
    });
    const el = wrapper.find("goa-chip").element;
    expect(el.hasAttribute("deletable")).toBe(false);
  });

  it("should not set error when false", () => {
    const wrapper = mount(GoabChip, {
      props: { content: "Label", error: false },
    });
    const el = wrapper.find("goa-chip").element;
    expect(el.hasAttribute("error")).toBe(false);
  });
});
