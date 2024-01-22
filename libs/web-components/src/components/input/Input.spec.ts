import { render, fireEvent, waitFor, cleanup } from "@testing-library/svelte";
import GoAInput from "./Input.svelte";
import GoAInputWrapper from "./Input.test.svelte";
import { it, describe } from "vitest";

afterEach(cleanup);

describe("GoAInput Component", () => {
  it("should render", async () => {
    const el = render(GoAInput, { testid: "input-test", id: "test" });
    const input = await el.findByTestId('input-test');
    expect(input).toBeTruthy();
    expect(input.getAttribute("id")).toBe("test");
  });

  describe("Properties", () => {
    it("allows for setting of the value", async () => {
      const el = render(GoAInput, { testid: "input-test", value: "foobar" });
      const input = await el.findByTestId("input-test");
      expect((input as HTMLInputElement).value).toBe("foobar");
    });

    it("allows for setting of the name", async () => {
      const el = render(GoAInput, { testid: "input-test", name: "test-id" });
      const input = await el.findByTestId("input-test");
      expect(input.getAttribute("name")).toBe("test-id");
    });

    [
      "text",
      "number",
      "password",
      "email",
      "date",
      "datetime-local",
      "month",
      "search",
      "tel",
      "time",
      "url",
      "week",
    ].forEach((type: string) => {
      it(`renders the ${type} type`, async () => {
        const el = render(GoAInput, { testid: "input-test", type });
        const input = await el.findByTestId("input-test");
        expect(input.getAttribute("type")).toBe(type);
      });
    });

    it("allows for placeholder text", async () => {
      const el = render(GoAInput, {
        testid: "input-test",
        placeholder: "test-id",
      });
      const input = await el.findByTestId("input-test");
      expect(input.getAttribute("placeholder")).toBe("test-id");
    });

    it("allows for a leading icon", async () => {
      const el = render(GoAInput, {
        testid: "input-test",
        leadingicon: "finger-print",
      });
      const icon = await el.findByTestId("leading-icon");
      expect(icon).toBeTruthy();
    });

    it("allows for a trailing icon", async () => {
      const el = render(GoAInput, {
        testid: "input-test",
        trailingicon: "finger-print",
      });
      const icon = await el.findByTestId("trailing-icon");
      expect(icon).toBeTruthy();
    });

    it("allows for a variant", async () => {
      const el = render(GoAInput, { testid: "input-test", variant: "bare" });
      const root = el.container.querySelector(".variant--bare");
      expect(root).toBeTruthy();
    });

    it("can be disabled", async () => {
      const el = render(GoAInput, { testid: "input-test", disabled: "true" });
      const root = el.container.querySelector(".input--disabled");
      expect(root).toBeTruthy();
    });

    it("allows the input to be marked as readonly", async () => {
      const el = render(GoAInput, { testid: "input-test", readonly: "true" });
      const root = el.container.querySelector("input[readonly]");
      expect(root).toBeTruthy();
    });

    it("allows the input to be set to an error state", async () => {
      const el = render(GoAInput, { testid: "input-test", error: "true" });
      const root = el.container.querySelector(".error");
      expect(root).toBeTruthy();
    });

    it("accepts an arialabel property", async () => {
      const el = render(GoAInput, {
        testid: "input-test",
        arialabel: "First Name",
      });
      const root = el.container.querySelector('[aria-label="First Name"]');
      expect(root).toBeTruthy();
    });

    it("defaults to the name property if arialabel is not supplied", async () => {
      const el = render(GoAInput, { testid: "input-test", name: "firstName" });
      const root = el.container.querySelector('[aria-label="firstName"]');
      expect(root).toBeTruthy();
    });

    it("accepts an arialabelledby property", async () => {
      const el = render(GoAInput, { testid: "input-test", arialabelledby: "firstName" });
      const root = el.container.querySelector('[aria-labelledby="firstName"]');
      expect(root).toBeTruthy();
    });

    it("has an autocapitalize prop", async () => {
      const el = render(GoAInput, {
        testid: "input-test",
        autocapitalize: "on",
      });
      const root = el.container.querySelector("[autocapitalize=on]");
      expect(root).toBeTruthy();
    });
  });

  it("allows for the trailing icon click event handling", async () => {
    const el = render(GoAInput, {
      testid: "input-test",
      trailingicon: "finger-print",
      handletrailingiconclick: "true",
    });
    const icon = await el.findByTestId("trailing-icon-button");

    const click = vi.fn();
    icon.addEventListener("_trailingIconClick", click);
    await fireEvent.click(icon);
    expect(click).toBeCalled();
  });

  it("allows the input to be focused", async () => {
    const el = render(GoAInput, { testid: "input-test", focused: "true" });
    const input = el.container.querySelector("input");
    expect(input).toBeTruthy();

    await waitFor(() => {
      input && expect(input).toHaveFocus();
    });
  });

  it("handles keyup event", async () => {
    const { findByTestId } = render(GoAInput, {
      name: "test-name",
      testid: "input-test",
    });
    const input = await findByTestId("input-test");
    const change = vi.fn();
    const keypress = vi.fn();

    input.addEventListener("_change", (e: Event) => {
      const ce = e as CustomEvent;
      expect(ce.detail.name).toBe("test-name");
      expect(ce.detail.value).toBe("foobar");
      change();
    });

    input.addEventListener("_keyPress", (e: Event) => {
      const ce = e as CustomEvent;
      expect(ce.detail.name).toBe("test-name");
      expect(ce.detail.value).toBe("foobar");
      expect(ce.detail.key).toBe("r");
      keypress();
    });

    await fireEvent.keyUp(input, { target: { value: "foobar" }, key: 'r' });
    await waitFor(() => {
      expect(change).toBeCalledTimes(1);
      expect(keypress).toBeCalledTimes(1);
    });
  });

  // The change event is what is fired when selecting a date from the calender supplied
  // by the `date` input type. Both the change and keyup event handling is required.
  it("handles the change event", async () => {
    const { findByTestId } = render(GoAInput, {
      name: "test-name",
      testid: "input-test",
      type: "date",
    });
    const input = await findByTestId("input-test");
    const change = vi.fn();

    input.addEventListener("_change", () => {
      change();
    });

    await fireEvent.change(input);
    await waitFor(() => {
      expect(change).toBeCalledTimes(1);
    });
  });

  it("handles trailing icon click", async () => {
    const { findByTestId } = render(GoAInput, {
      testid: "input-test",
      handletrailingiconclick: "true",
      trailingicon: "finger-print",
    });
    const onClick = vi.fn();
    const iconButton = await findByTestId("trailing-icon-button");

    iconButton.addEventListener("_trailingIconClick", onClick);

    await fireEvent.click(iconButton);
    expect(onClick).toBeCalledTimes(1);
  });

  describe("type=number", () => {
    it("allows for a numeric props", async () => {
      const el = render(GoAInput, {
        type: "number",
        min: "0",
        max: "10",
        step: 2,
      });
      const root = el.container.querySelector("input");
      expect(root).toBeTruthy();

      root && expect(root).toHaveAttribute("min", "0");
      root && expect(root).toHaveAttribute("max", "10");
      root && expect(root).toHaveAttribute("step", "2");
    });
  });

  describe("maxlength", () => {
    it("allows for a maxlength prop", async () => {
      const el = render(GoAInput, { maxlength: 10 });
      const root = el.container.querySelector("input");
      expect(root).toBeTruthy();
      expect(root).toHaveAttribute("maxlength", "10");
    });
  });

  describe("type=date", () => {
    it("allows for a date type", async () => {
      const el = render(GoAInput, { type: "date" });
      const input = el.container.querySelector("input");
      expect(input).toBeTruthy();
      expect(input?.getAttribute("min")).toBe("");
      expect(input?.getAttribute("max")).toBe("");
      expect(input?.getAttribute("step")).toBe("1");
    });
  });

  describe("Search type", () => {
    it("clears the input when the search x icon is clicked", async () => {
      const { findByTestId } = render(GoAInput, {
        name: "test-name",
        testid: "input-test",
        type: "search",
      });
      const input = await findByTestId("input-test");
      const search = vi.fn();

      input.addEventListener("_change", () => {
        search();
      });

      await fireEvent(input, new Event("search"));
      await waitFor(() => {
        expect(search).toBeCalledTimes(1);
      });
    });

    it("does fire the search event if it is not a search input type", async () => {
      const { findByTestId } = render(GoAInput, {
        name: "test-name",
        testid: "input-test",
        type: "text",
      });
      const input = await findByTestId("input-test");
      const search = vi.fn();

      input.addEventListener("_change", () => {
        search();
      });

      await fireEvent(input, new Event("search"));
      expect(search).toBeCalledTimes(0);
    });
  });

  describe("Prefix and suffix text", () => {
    it("does not show prefix or suffix text", async () => {
      const { container } = render(GoAInput, { type: "text" });
      expect(container.querySelector(".prefix")).toBeNull();
      expect(container.querySelector(".suffix")).toBeNull();
    });
    it("shows prefix text and also a warning message in console", async () => {
      const mock = vi.spyOn(console, "warn").mockImplementation(() => { });
      const { container } = render(GoAInput, { type: "text", prefix: "$" });
      const prefix = container.querySelector(".prefix");

      expect(prefix).toBeTruthy();
      expect(prefix?.innerHTML).toContain("$");
      await waitFor(() => {
        expect(console.warn["mock"].calls.length).toBeGreaterThan(0);
      });
      mock.mockRestore();
    });
    it("shows suffix text and also a warning message in console", async () => {
      const mock = vi.spyOn(console, "warn").mockImplementation(() => { });
      const { container } = render(GoAInput, {
        type: "text",
        suffix: "per item",
      });
      expect(container.querySelector(".suffix")?.innerHTML).toContain("per item");
      await waitFor(() => {
        expect(console.warn["mock"].calls.length).toBeGreaterThan(0);
      });
      mock.mockRestore();
    });
  });

  describe("Margins", () => {
    it(`should add the margin`, async () => {
      const baseElement = render(GoAInput, {
        testid: "input-test",
        mt: "s",
        mr: "m",
        mb: "l",
        ml: "xl",
      });
      const input = await baseElement.findByTestId("input-test");

      expect(input).toBeTruthy();
      expect(input).toHaveStyle("margin-top:var(--goa-space-s)");
      expect(input).toHaveStyle("margin-right:var(--goa-space-m)");
      expect(input).toHaveStyle("margin-bottom:var(--goa-space-l)");
      expect(input).toHaveStyle("margin-left:var(--goa-space-xl)");
    });
  });

  describe("Leading and Trailing content", () => {
    it("should not have a slot for the leading and trailing content", async () => {
      const el = render(GoAInputWrapper);
      expect(el.container.querySelector("[slot=leadingContent]")).toBeNull();
      expect(el.container.querySelector("[slot=trailingContent]")).toBeNull();
    });

    it("should have a slot for the leading content", async () => {
      const content = "$";
      const el = render(GoAInputWrapper, { leadingContent: content });
      expect(el.container.innerHTML).toContain(content);

      const leadingContent = el.container.querySelector("[slot=leadingContent]");
      expect(leadingContent).toBeTruthy();
      expect(leadingContent?.innerHTML).toContain(content);
    });

    it("should have a slot for the trailing content", async () => {
      const content = "items";
      const el = render(GoAInputWrapper, { trailingContent: content });
      const trailingContent = el.container.querySelector("[slot=trailingContent]");

      expect(el.container.innerHTML).toContain(content);
      expect(trailingContent?.innerHTML).toContain(content);
    });
  });

  it("should delay the _change event when debounce is set", async () => {
    const fn = vi.fn();
    const el = render(GoAInput, { testid: "input-test", debounce: 1000 });
    const input = el.getByTestId("input-test");
    expect(input).toBeTruthy();

    input.addEventListener("_change", () => {
      fn();
    });

    await fireEvent.keyUp(input, { target: { value: "foobar" } });
    await waitFor(
      () => {
        expect(fn).not.toBeCalled();
      },
      { timeout: 500 },
    );

    await waitFor(
      () => {
        expect(fn).toBeCalled();
      },
      { timeout: 2000 },
    );
  });
});
