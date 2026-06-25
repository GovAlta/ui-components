import { mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";
import GoabDropdown from "./dropdown.vue";
import GoabDropdownItem from "./dropdown-item.vue";

describe("GoabDropdown", () => {
  it("should render", () => {
    const wrapper = mount(GoabDropdown);
    const el = wrapper.find("goa-dropdown").element;
    expect(el.getAttribute("disabled")).toBeNull();
    expect(el.getAttribute("error")).toBeNull();
    expect(el.getAttribute("filterable")).toBeNull();
    expect(el.getAttribute("native")).toBeNull();
  });

  it("should render with all props", () => {
    const wrapper = mount(GoabDropdown, {
      props: {
        leadingIcon: "color-wand",
        name: "favColor",
        value: ["red"],
        maxHeight: "100px",
        placeholder: "Select...",
        disabled: true,
        error: true,
        filterable: true,
        native: true,
        testId: "foo",
        id: "foo-dropdown",
        width: "200px",
        maxWidth: "400px",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        ariaLabel: "label",
        ariaLabelledBy: "foo-dropdown-label",
        autoComplete: "off",
        size: "compact",
      },
    });
    const el = wrapper.find("goa-dropdown").element;
    expect(el.getAttribute("leadingicon")).toBe("color-wand");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("id")).toBe("foo-dropdown");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("error")).toBe("true");
    expect(el.getAttribute("filterable")).toBe("true");
    expect(el.getAttribute("native")).toBe("true");
    expect(el.getAttribute("arialabel")).toBe("label");
    expect(el.getAttribute("arialabelledby")).toBe("foo-dropdown-label");
    expect(el.getAttribute("autocomplete")).toBe("off");
    expect(el.getAttribute("maxwidth")).toBe("400px");
    expect(el.getAttribute("size")).toBe("compact");
  });

  it("should allow for a single selection value", () => {
    const wrapper = mount(GoabDropdown, {
      props: { name: "favColor", value: "yellow" },
    });
    const el = wrapper.find("goa-dropdown").element;
    expect(el.getAttribute("value")).toBe("yellow");
  });

  it("handles the onChange event", () => {
    const wrapper = mount(GoabDropdown, {
      props: { name: "favColor" },
    });
    const el = wrapper.find("goa-dropdown").element;
    el.dispatchEvent(
      new CustomEvent("_change", { detail: { name: "favColor", value: "blue" } }),
    );
    expect(wrapper.emitted("onChange")).toBeTruthy();
    expect(wrapper.emitted("onChange")?.[0][0]).toMatchObject({
      name: "favColor",
      value: "blue",
    });
  });

  it("should not set disabled when disabled=false", () => {
    const wrapper = mount(GoabDropdown, {
      props: { disabled: false },
    });
    const el = wrapper.find("goa-dropdown").element;
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  it("should pass data-grid attributes", () => {
    const wrapper = mount(GoabDropdown, {
      props: { name: "test", "data-grid": "cell" },
    });
    const el = wrapper.find("goa-dropdown").element;
    expect(el.getAttribute("data-grid")).toBe("cell");
  });
});

describe("GoabDropdownItem", () => {
  it("should render", () => {
    const wrapper = mount(GoabDropdownItem, {
      props: { value: "item1" },
    });
    const el = wrapper.find("goa-dropdown-item").element;
    expect(el.getAttribute("value")).toBe("item1");
  });

  it("should render with all props", () => {
    const wrapper = mount(GoabDropdownItem, {
      props: { value: "item1", label: "Item 1", filter: "item" },
    });
    const el = wrapper.find("goa-dropdown-item").element;
    expect(el.getAttribute("value")).toBe("item1");
    expect(el.getAttribute("label")).toBe("Item 1");
    expect(el.getAttribute("filter")).toBe("item");
    expect(el.getAttribute("mount")).toBe("append");
  });
});
