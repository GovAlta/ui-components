import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabCheckbox from "./checkbox.vue";

describe("GoabCheckbox", () => {
  it("should render", () => {
    const wrapper = mount(GoabCheckbox, { props: { name: "foo" } });
    const el = wrapper.find("goa-checkbox").element;
    expect(el.getAttribute("name")).toBe("foo");
    expect(el.getAttribute("disabled")).toBeNull();
    expect(el.getAttribute("checked")).toBeNull();
    expect(el.getAttribute("error")).toBeNull();
  });

  it("should render with all props", () => {
    const wrapper = mount(GoabCheckbox, {
      props: {
        id: "abc",
        name: "foo",
        value: "bar",
        text: "to display",
        maxWidth: "480px",
        size: "compact",
        disabled: true,
        checked: true,
        indeterminate: true,
        error: true,
        testId: "test-id",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      },
    });
    const el = wrapper.find("goa-checkbox").element;
    expect(el.getAttribute("id")).toBe("abc");
    expect(el.getAttribute("name")).toBe("foo");
    expect(el.getAttribute("value")).toBe("bar");
    expect(el.getAttribute("text")).toBe("to display");
    expect(el.getAttribute("maxwidth")).toBe("480px");
    expect(el.getAttribute("size")).toBe("compact");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("checked")).toBe("true");
    expect(el.getAttribute("indeterminate")).toBe("true");
    expect(el.getAttribute("error")).toBe("true");
    expect(el.getAttribute("testid")).toBe("test-id");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
  });

  it("should render with boolean value", () => {
    const wrapper = mount(GoabCheckbox, { props: { name: "foo", value: true } });
    const el = wrapper.find("goa-checkbox").element;
    expect(el.getAttribute("value")).toBe("true");
  });

  it("should render with text description", () => {
    const wrapper = mount(GoabCheckbox, {
      props: { name: "foo", description: "description text" },
    });
    const el = wrapper.find("goa-checkbox").element;
    expect(el.getAttribute("description")).toBe("description text");
  });

  it("should render with slot description", () => {
    const wrapper = mount(GoabCheckbox, {
      props: { name: "foo" },
      slots: { description: "<div>description slot</div>" },
    });
    const el = wrapper.find("goa-checkbox").element;
    const slotEl = el.querySelector("[slot='description']");
    expect(slotEl?.innerHTML).toContain("description slot");
  });

  it("should render with slot reveal", () => {
    const wrapper = mount(GoabCheckbox, {
      props: { name: "foo" },
      slots: { reveal: "<div>reveal slot</div>" },
    });
    const el = wrapper.find("goa-checkbox").element;
    const slotEl = el.querySelector("[slot='reveal']");
    expect(slotEl?.innerHTML).toContain("reveal slot");
  });

  it("should pass the revealAriaLabel property", () => {
    const wrapper = mount(GoabCheckbox, {
      props: { name: "foo", revealAriaLabel: "Screen reader announcement" },
      slots: { reveal: "<div>reveal content</div>" },
    });
    const el = wrapper.find("goa-checkbox").element;
    expect(el.getAttribute("revealarialabel")).toBe("Screen reader announcement");
  });

  it("handles the onChange event", () => {
    const wrapper = mount(GoabCheckbox, {
      props: { name: "foo", value: "bar" },
    });
    const el = wrapper.find("goa-checkbox").element;
    el.dispatchEvent(
      new CustomEvent("_change", { detail: { name: "foo", value: "bar", checked: true } }),
    );
    expect(wrapper.emitted("onChange")).toBeTruthy();
    expect(wrapper.emitted("onChange")?.[0][0]).toMatchObject({
      name: "foo",
      value: "bar",
      checked: true,
    });
  });

  it("should not set disabled when disabled=false", () => {
    const wrapper = mount(GoabCheckbox, {
      props: { name: "foo", disabled: false },
    });
    const el = wrapper.find("goa-checkbox").element;
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  it("should pass data-grid attributes", () => {
    const wrapper = mount(GoabCheckbox, {
      props: { name: "foo", "data-grid": "cell" },
    });
    const el = wrapper.find("goa-checkbox").element;
    expect(el.getAttribute("data-grid")).toBe("cell");
  });
});
