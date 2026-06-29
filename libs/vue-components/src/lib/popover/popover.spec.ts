import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import { nextTick } from "vue";
import GoabPopover from "./popover.vue";

describe("GoabPopover", () => {
  it("should render", () => {
    const wrapper = mount(GoabPopover, {
      slots: { target: "Target" },
    });
    const el = wrapper.find("goa-popover").element;
    expect(el).toBeTruthy();
  });

  it("should render the properties", () => {
    const wrapper = mount(GoabPopover, {
      props: {
        maxWidth: "400px",
        minWidth: "200px",
        padded: true,
        position: "below",
        testId: "popover-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
      slots: { target: "Target" },
    });
    const el = wrapper.find("goa-popover").element;
    expect(el.getAttribute("maxwidth")).toBe("400px");
    expect(el.getAttribute("minwidth")).toBe("200px");
    expect(el.getAttribute("padded")).toBe("true");
    expect(el.getAttribute("position")).toBe("below");
    expect(el.getAttribute("testid")).toBe("popover-test");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render slots", () => {
    const wrapper = mount(GoabPopover, {
      slots: {
        default: "Popover content",
        target: "Target element",
      },
    });
    expect(wrapper.text()).toContain("Popover content");
  });

  it("should pass padded as false explicitly when false", () => {
    const wrapper = mount(GoabPopover, {
      props: { padded: false },
      slots: { target: "Target" },
    });
    const el = wrapper.find("goa-popover").element;
    expect(el.getAttribute("padded")).toBe("false");
  });

  it("should not warn when target slot is provided", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(vi.fn());
    mount(GoabPopover, {
      slots: { target: "Target" },
    });
    await nextTick();
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });

  it("should warn when target slot is missing", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(vi.fn());
    mount(GoabPopover);
    await nextTick();
    expect(warn).toHaveBeenCalledWith("Popover: a `target` slot is required.");
    warn.mockRestore();
  });
});
