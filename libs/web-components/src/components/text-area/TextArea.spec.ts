import { fireEvent, render, waitFor } from "@testing-library/svelte";
import GoATextArea from "./TextArea.svelte";
import { describe, it, expect, vi } from "vitest";

describe("GoATextArea", () => {
  it("should render", async () => {
    const result = render(GoATextArea, {
      name: "name",
      placeholder: "Enter text here",
      value: "foobar",
      rows: 42,
      readonly: "true",
      disabled: "true",
      autocomplete: "off",
      testid: "test-id",
    });

    const el = result.queryByTestId("test-id") as HTMLTextAreaElement;
    expect(el).toHaveAttribute("name", "name");
    expect(el).toHaveAttribute("placeholder", "Enter text here");
    expect(el.value).toBe("foobar");
    expect(el).toHaveAttribute("readonly", "");
    expect(el).toHaveAttribute("disabled", "");
    expect(el).toHaveAttribute("data-testid", "test-id");
    expect(el).toHaveAttribute("rows", "42");
    expect(el).toHaveAttribute("autocomplete", "off");
  });

  it("handles the change event", async () => {
    const onChange = vi.fn();
    const result = render(GoATextArea, {
      name: "name",
      testid: "test-id",
    });

    const el = result.container.querySelector("textarea");
    el.addEventListener("_change", (e: CustomEvent) => {
      expect(e.detail.name).toBe("name");
      expect(e.detail.value).toBe("b");
      expect(e.detail.event).toBeInstanceOf(Event);
      onChange();
    });

    await fireEvent.change(el, { target: { value: "b" } });

    await waitFor(() => {
      expect(onChange).toBeCalledTimes(1);
    });
  });

  it("handles the keypress event", async () => {
    const onKeyPress = vi.fn();
    const onChange = vi.fn();
    const result = render(GoATextArea, {
      name: "name",
      value: "foo",
      testid: "keypress",
    });

    const textarea = result.queryByTestId("keypress");
    textarea.addEventListener("_keyPress", (e: CustomEvent) => {
      expect(e.detail.name).toBe("name");
      expect(e.detail.value).toBe("foo");
      expect(e.detail.key).toBe("o");
      expect(e.detail.event).toBeInstanceOf(Event);
      onKeyPress();
    });

    textarea.addEventListener("_change", (e: CustomEvent) => {
      expect(e.detail.name).toBe("name");
      expect(e.detail.value).toBe("foo");
      expect(e.detail.event).toBeInstanceOf(Event);
      onChange();
    });

    await fireEvent.keyUp(textarea, { target: { value: "foo" }, key: "o" });

    await waitFor(() => {
      expect(onKeyPress).toBeCalledTimes(1);
      expect(onChange).toBeCalledTimes(1);
    });
  });

  it("handles the blur event", async () => {
    const onBlur = vi.fn();
    const result = render(GoATextArea, {
      name: "name",
      value: "test value",
      testid: "blur-test",
    });

    const textarea = result.queryByTestId("blur-test");
    textarea.addEventListener("_blur", (e: CustomEvent) => {
      expect(e.detail.name).toBe("name");
      expect(e.detail.value).toBe("test value");
      expect(e.detail.event).toBeInstanceOf(Event);
      onBlur();
    });

    await fireEvent.blur(textarea);

    await waitFor(() => {
      expect(onBlur).toBeCalledTimes(1);
    });
  });

  it("can be readonly", async () => {
    const result = render(GoATextArea, {
      name: "name",
      value: "foo",
      readonly: "true",
    });

    const el = result.container.querySelector("textarea");

    el?.focus();
    expect(el).toHaveAttribute("readonly", "");
    expect(el).toHaveFocus();
  });

  it("can be disabled", async () => {
    const onChange = vi.fn();
    const result = render(GoATextArea, {
      name: "name",
      value: "foo",
      disabled: "true",
    });

    const el = result.container.querySelector("textarea");
    el.addEventListener("_change", onChange);

    await fireEvent.keyUp(el, { target: { value: "bar" } });
    expect(el).toHaveAttribute("disabled", "");
    expect(onChange).not.toBeCalled();
    expect(el).not.toHaveFocus();
  });

  it("indicates an error state", async () => {
    const { container } = render(GoATextArea, {
      name: "name",
      value: "foo",
      error: "true",
    });

    const textarea = container.querySelector(".root");
    expect(textarea).toHaveClass("error");
  });

  it("accepts an arialabel property", async () => {
    const el = render(GoATextArea, {
      name: "description",
      arialabel: "Description",
    });
    const root = el.container.querySelector('[aria-label="Description"]');
    expect(root).toBeTruthy();
  });

  it("defaults to the name property if arialabel is not supplied", async () => {
    const el = render(GoATextArea, { name: "about" });
    const root = el.container.querySelector('[aria-label="about"]');
    expect(root).toBeTruthy();
  });

  describe("Char count", () => {
    it("does not show a char count if not enabled", async () => {
      const { container } = render(GoATextArea, { name: "test-name" });
      const counterEl = container.querySelector(".counter");
      expect(counterEl).toBeNull();
    });

    it("shows a character count", async () => {
      const { container } = render(GoATextArea, {
        name: "test-name",
        countby: "character",
        value: "Jim likes apples",
      });
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("16 characters");
    });

    it("shows a word count", async () => {
      const { container } = render(GoATextArea, {
        name: "test-name",
        countby: "word",
        value: "Jim likes apples",
      });
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("3 words");
    });

    it("shows the number of characters remaining", async () => {
      const { container } = render(GoATextArea, {
        name: "test-name",
        value: "Jim",
        countby: "character",
        maxcount: "50",
      });
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("47 characters remaining");
    });

    it("shows the number of characters over by", async () => {
      const { container } = render(GoATextArea, {
        name: "test-name",
        value: "Jim is funny",
        countby: "character",
        maxcount: "5",
      });
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("7 characters too many");
    });

    it("shows zero characters remaining", async () => {
      const { container } = render(GoATextArea, {
        name: "test-name",
        value: "Jim is super funny",
        countby: "character",
        maxcount: "18",
      });
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("0 characters remaining");
    });

    it("shows the number of words remaining", async () => {
      const { container } = render(GoATextArea, {
        name: "test-name",
        value: "Jim is funny",
        countby: "word",
        maxcount: "50",
      });
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("47 words remaining");
    });

    it("shows the number of words over by", async () => {
      const { container } = render(GoATextArea, {
        name: "test-name",
        value: "Jim is super funny",
        countby: "word",
        maxcount: "3",
      });
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("1 word too many");
    });

    it("shows zero words remaining", async () => {
      const { container } = render(GoATextArea, {
        name: "test-name",
        value: "Jim is super funny",
        countby: "word",
        maxcount: "4",
      });
      const counterEl = container.querySelector(".counter");
      expect(counterEl.innerHTML).toContain("0 words remaining");
    });

    it("shows the count in an error state when the char count exceeds the max value allowed", async () => {
      const { container } = render(GoATextArea, {
        name: "test-name",
        value: "Jim Smith",
        countby: "character",
        maxcount: "5",
      });
      expect(container.querySelector(".counter-error")).not.toBeNull();
    });

    it("should not show counter when disabled", async () => {
      const { container } = render(GoATextArea, {
        name: "name",
        value: "foo",
        countby: "word",
        maxcount: "5",
        disabled: "true",
      });

      expect(container.querySelector(".counter-error")).toBeNull();
    });
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoATextArea, {
        name: "test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const el = await baseElement.findByTestId("root");

      expect(el).toBeTruthy();
      expect(el).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(el).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(el).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(el).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });

  it("should render with maxwidth property", async () => {
    const baseElement = render(GoATextArea, {
      name: "test",
      maxwidth: "500px",
    });

    const rootEl = await baseElement.findByTestId("root");
    expect(rootEl).toBeTruthy();

    // Check if the injected style contains the max-width property
    const styleTag = rootEl.querySelector("style");
    expect(styleTag).toBeTruthy();
    expect(styleTag?.innerHTML).toContain("max-width: 500px");
  });
});
