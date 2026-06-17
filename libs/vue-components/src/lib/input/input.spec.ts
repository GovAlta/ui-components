import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabInput from "./input.vue";

describe("GoabInput", () => {
  it("should render", () => {
    const wrapper = mount(GoabInput, { props: { name: "foo" } });
    const el = wrapper.find("goa-input").element;
    expect(el.getAttribute("name")).toBe("foo");
    expect(el.getAttribute("focused")).toBeNull();
    expect(el.getAttribute("disabled")).toBeNull();
    expect(el.getAttribute("readonly")).toBeNull();
    expect(el.getAttribute("error")).toBeNull();
    expect(el.hasAttribute("handletrailingiconclick")).toBe(false);
  });

  it("should render with properties", () => {
    const wrapper = mount(GoabInput, {
      props: {
        name: "foo",
        value: "bar",
        id: "foo",
        leadingIcon: "search",
        trailingIcon: "close",
        autoCapitalize: "on",
        autoComplete: "off",
        variant: "bare",
        disabled: true,
        readonly: true,
        focused: true,
        error: true,
        placeholder: "placeholder",
        size: "compact",
        testId: "test-id",
        debounce: 1000,
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        maxLength: 10,
        textAlign: "right",
      },
    });
    const el = wrapper.find("goa-input").element;
    expect(el.getAttribute("name")).toBe("foo");
    expect(el.getAttribute("value")).toBe("bar");
    expect(el.getAttribute("id")).toBe("foo");
    expect(el.getAttribute("leadingicon")).toBe("search");
    expect(el.getAttribute("trailingicon")).toBe("close");
    expect(el.getAttribute("autocapitalize")).toBe("on");
    expect(el.getAttribute("autocomplete")).toBe("off");
    expect(el.getAttribute("variant")).toBe("bare");
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("focused")).toBe("true");
    expect(el.getAttribute("error")).toBe("true");
    expect(el.getAttribute("placeholder")).toBe("placeholder");
    expect(el.getAttribute("size")).toBe("compact");
    expect(el.getAttribute("testid")).toBe("test-id");
    expect(el.getAttribute("debounce")).toBe("1000");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("maxlength")).toBe("10");
    expect(el.getAttribute("textalign")).toBe("right");
    expect(el.hasAttribute("handletrailingiconclick")).toBe(false);
  });

  it("renders leading and trailing content slots", () => {
    const wrapper = mount(GoabInput, {
      props: { name: "foo" },
      slots: {
        leadingContent: "<span>$</span>",
        trailingContent: "<span>items</span>",
      },
    });
    const el = wrapper.find("goa-input").element;
    const leadingDiv = el.querySelector("[slot='leadingContent']");
    const trailingDiv = el.querySelector("[slot='trailingContent']");
    expect(leadingDiv?.textContent).toContain("$");
    expect(trailingDiv?.textContent).toContain("items");
  });

  it("handles the onChange event", () => {
    const wrapper = mount(GoabInput, { props: { name: "foo" } });
    const el = wrapper.find("goa-input").element;
    el.dispatchEvent(new CustomEvent("_change", { detail: { name: "foo", value: "bar" } }));
    expect(wrapper.emitted("onChange")).toBeTruthy();
    expect(wrapper.emitted("onChange")?.[0][0]).toMatchObject({
      name: "foo",
      value: "bar",
    });
  });

  it("handles the onTrailingIconClick event", () => {
    const wrapper = mount(GoabInput, { props: { name: "foo" } });
    const el = wrapper.find("goa-input").element;
    el.dispatchEvent(new CustomEvent("_trailingIconClick"));
    expect(wrapper.emitted()).toHaveProperty("onTrailingIconClick");
  });

  it("handles the onFocus event", () => {
    const wrapper = mount(GoabInput, { props: { name: "foo" } });
    const el = wrapper.find("goa-input").element;
    el.dispatchEvent(new CustomEvent("_focus", { detail: { name: "foo", value: "" } }));
    expect(wrapper.emitted("onFocus")).toBeTruthy();
  });

  it("handles the onBlur event", () => {
    const wrapper = mount(GoabInput, { props: { name: "foo" } });
    const el = wrapper.find("goa-input").element;
    el.dispatchEvent(new CustomEvent("_blur", { detail: { name: "foo", value: "" } }));
    expect(wrapper.emitted("onBlur")).toBeTruthy();
  });

  it("handles the onKeyPress event", () => {
    const wrapper = mount(GoabInput, { props: { name: "foo" } });
    const el = wrapper.find("goa-input").element;
    el.dispatchEvent(
      new CustomEvent("_keyPress", { detail: { name: "foo", value: "", key: "Enter" } }),
    );
    expect(wrapper.emitted("onKeyPress")).toBeTruthy();
  });

  it("should not set disabled when disabled=false", () => {
    const wrapper = mount(GoabInput, {
      props: { name: "foo", disabled: false },
    });
    const el = wrapper.find("goa-input").element;
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  it("should pass data-grid attributes", () => {
    const wrapper = mount(GoabInput, {
      props: { name: "foo", "data-grid": "cell" },
    });
    const el = wrapper.find("goa-input").element;
    expect(el.getAttribute("data-grid")).toBe("cell");
  });
});
