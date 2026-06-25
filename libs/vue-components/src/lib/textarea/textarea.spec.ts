import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import GoabTextarea from "./textarea.vue";

describe("GoabTextarea", () => {
  it("should render", () => {
    const wrapper = mount(GoabTextarea, { props: { name: "textarea-name" } });
    const el = wrapper.find("goa-textarea").element;
    expect(el.getAttribute("name")).toBe("textarea-name");
    expect(el.getAttribute("readonly")).toBeNull();
    expect(el.getAttribute("disabled")).toBeNull();
    expect(el.getAttribute("error")).toBeNull();
  });

  it("should render with properties", () => {
    const wrapper = mount(GoabTextarea, {
      props: {
        name: "textarea-name",
        value: "textarea-value",
        rows: 10,
        placeholder: "textarea-placeholder",
        readOnly: true,
        disabled: true,
        error: true,
        countBy: "word",
        maxCount: 50,
        maxWidth: "100px",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
        autoComplete: "off",
        testId: "textarea-testid",
        size: "compact",
      },
    });
    const el = wrapper.find("goa-textarea").element;
    expect(el.getAttribute("name")).toBe("textarea-name");
    expect(el.getAttribute("value")).toBe("textarea-value");
    expect(el.getAttribute("rows")).toBe("10");
    expect(el.getAttribute("placeholder")).toBe("textarea-placeholder");
    expect(el.hasAttribute("readonly")).toBe(true);
    expect(el.getAttribute("disabled")).toBe("true");
    expect(el.getAttribute("error")).toBe("true");
    expect(el.getAttribute("countby")).toBe("word");
    expect(el.getAttribute("maxcount")).toBe("50");
    expect(el.getAttribute("maxwidth")).toBe("100px");
    expect(el.getAttribute("mt")).toBe("s");
    expect(el.getAttribute("mr")).toBe("m");
    expect(el.getAttribute("mb")).toBe("l");
    expect(el.getAttribute("ml")).toBe("xl");
    expect(el.getAttribute("autocomplete")).toBe("off");
    expect(el.getAttribute("testid")).toBe("textarea-testid");
    expect(el.getAttribute("size")).toBe("compact");
  });

  it("handles the onChange event", () => {
    const wrapper = mount(GoabTextarea, {
      props: { name: "textarea-name" },
    });
    const el = wrapper.find("goa-textarea").element;
    el.dispatchEvent(
      new CustomEvent("_change", { detail: { name: "textarea-name", value: "new-value" } }),
    );
    expect(wrapper.emitted("onChange")).toBeTruthy();
    expect(wrapper.emitted("onChange")?.[0][0]).toMatchObject({
      name: "textarea-name",
      value: "new-value",
    });
  });

  it("handles the onKeyPress event", () => {
    const wrapper = mount(GoabTextarea, {
      props: { name: "textarea-name" },
    });
    const el = wrapper.find("goa-textarea").element;
    el.dispatchEvent(
      new CustomEvent("_keyPress", {
        detail: { name: "textarea-name", value: "text", key: "Enter" },
      }),
    );
    expect(wrapper.emitted("onKeyPress")).toBeTruthy();
  });

  it("handles the onBlur event", () => {
    const wrapper = mount(GoabTextarea, {
      props: { name: "textarea-name" },
    });
    const el = wrapper.find("goa-textarea").element;
    el.dispatchEvent(
      new CustomEvent("_blur", { detail: { name: "textarea-name", value: "text" } }),
    );
    expect(wrapper.emitted("onBlur")).toBeTruthy();
  });

  it("should not set disabled when disabled=false", () => {
    const wrapper = mount(GoabTextarea, {
      props: { name: "textarea-name", disabled: false },
    });
    const el = wrapper.find("goa-textarea").element;
    expect(el.hasAttribute("disabled")).toBe(false);
  });

  it("should pass data-grid attributes", () => {
    const wrapper = mount(GoabTextarea, {
      props: { name: "textarea-name", "data-grid": "cell" },
    });
    const el = wrapper.find("goa-textarea").element;
    expect(el.getAttribute("data-grid")).toBe("cell");
  });
});
