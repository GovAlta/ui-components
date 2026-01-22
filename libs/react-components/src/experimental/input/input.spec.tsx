import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import {
  GoabxInputDateTime,
  GoabxInputText,
  GoabxInputProps,
  GoabxInputNumber,
} from "./input";
import { describe, it, expect, vi } from "vitest";
import { GoabIconType, GoabInputOnChangeDetail } from "@abgov/ui-components-common";

const noop = () => {
  /* do nothing */
};
const testId = "test-id";
const defaultProps: GoabxInputProps = {
  name: "",
  value: "",
  testId: testId,
  onChange: noop,
};

describe("GoabxInput", () => {
  it("should render", () => {
    render(<GoabxInputText name="foo" onChange={noop} />);

    const input = document.querySelector("goa-input");
    expect(input?.getAttribute("name")).toBe("foo");
    expect(input?.getAttribute("focused")).toBeNull();
    expect(input?.getAttribute("disabled")).toBeNull();
    expect(input?.getAttribute("readonly")).toBeNull();
    expect(input?.getAttribute("error")).toBeNull();
    expect(input?.getAttribute("handletrailingiconclick")).toBe("false");
  });

  it("should render with properties", () => {
    const props: GoabxInputProps = {
      ...defaultProps,
      name: "foo",
      value: "bar",
      id: "foo",
      leadingIcon: "search" as GoabIconType,
      trailingIcon: "close" as GoabIconType,
      autoComplete: "off",
      autoCapitalize: "on",
      variant: "bare",
      disabled: true,
      readonly: true,
      focused: true,
      error: true,
      placeholder: "placeholder",
      size: "compact",
      // TODO: remove deprecated property or fix spec failure
      // prefix: "foo",
      suffix: "bar",
      testId: testId,
      debounce: 1000,
      mt: "s",
      mr: "m",
      mb: "l",
      ml: "xl",
      leadingContent: "$",
      trailingContent: "items",
      maxLength: 10,
      onTrailingIconClick: noop,
    };

    render(<GoabxInputText {...props} />);

    const input = document.querySelector("goa-input");
    expect(input).toBeTruthy();
    expect(input?.getAttribute("name")).toBe("foo");
    expect(input?.getAttribute("value")).toBe("bar");
    expect(input?.getAttribute("type")).toBe("text");
    expect(input?.getAttribute("id")).toBe("foo");
    expect(input?.getAttribute("leadingicon")).toBe("search");
    expect(input?.getAttribute("trailingicon")).toBe("close");
    expect(input?.getAttribute("autocapitalize")).toBe("on");
    expect(input?.getAttribute("autocomplete")).toBe("off");
    expect(input?.getAttribute("variant")).toBe("bare");
    expect(input?.getAttribute("disabled")).toBe("true");
    expect(input?.getAttribute("focused")).toBe("true");
    expect(input?.getAttribute("readonly")).toBe("true");
    expect(input?.getAttribute("error")).toBe("true");
    expect(input?.getAttribute("placeholder")).toBe("placeholder");
    expect(input?.getAttribute("size")).toBe("compact");
    // TODO: remove deprecated property or fix spec failure
    // expect(input?.getAttribute("prefix")).toBe("foo");
    expect(input?.getAttribute("suffix")).toBe("bar");
    expect(input?.getAttribute("testid")).toBe(testId);
    expect(input?.getAttribute("debounce")).toBe("1000");
    expect(input?.getAttribute("mt")).toBe("s");
    expect(input?.getAttribute("mr")).toBe("m");
    expect(input?.getAttribute("mb")).toBe("l");
    expect(input?.getAttribute("ml")).toBe("xl");
    expect(input?.getAttribute("maxlength")).toBe("10");
    expect(input?.querySelector("[slot='leadingContent']")?.textContent).toContain("$");
    expect(input?.querySelector("[slot='trailingContent']")?.textContent).toContain(
      "items",
    );
    expect(input?.getAttribute("handletrailingiconclick")).toBe("true");
  });

  it("should handle the onChange event", async function () {
    const validateOnChange = vi.fn();
    const newValue = "barfoo";

    const onChange = ({ name, value }: GoabInputOnChangeDetail) => {
      expect(name).toBe("foo");
      expect(value).toBe(newValue);
      validateOnChange();
    };
    const props = { ...defaultProps, onChange };
    render(<GoabxInputText {...props} />);

    const input = document.querySelector("goa-input");
    expect(input).toBeTruthy();

    input &&
      fireEvent(
        input,
        new CustomEvent("_change", { detail: { name: "foo", value: newValue } }),
      );
    expect(validateOnChange).toBeCalled();
  });

  it("should not error out with invalid dates", () => {
    const mockOnChangeHandler = vi.fn();
    const { container } = render(
      <GoabxInputDateTime
        onChange={mockOnChangeHandler}
        name="dateInput"
        value={new Date()}
      />,
    );
    const inputElement = container.querySelector('goa-input[type="datetime-local"]');
    expect(inputElement).toBeTruthy();
    //invalid dates do not trigger change event
    inputElement &&
      fireEvent(
        inputElement,
        new CustomEvent("_change", {
          detail: { name: "dateInput", value: "invalid date" },
        }),
      );
    expect(mockOnChangeHandler).not.toBeCalled();
    const newDate = new Date().toISOString();
    //valid dates trigger change event
    inputElement &&
      fireEvent(
        inputElement,
        new CustomEvent("_change", { detail: { name: "dateInput", value: newDate } }),
      );
    expect(mockOnChangeHandler).toBeCalledWith(
      expect.objectContaining({
        name: "dateInput",
        value: new Date(newDate),
        event: expect.any(Event),
      }),
    );
  });

  it("should handle decimal number for GoabxInputNumber", () => {
    const mockOnChangeHandler = vitest.fn();
    const { container } = render(
      <GoabxInputNumber onChange={mockOnChangeHandler} name="numberInput" value={1} />,
    );

    const inputElement = container.querySelector("goa-input[type='number']");
    expect(inputElement).toBeTruthy();
    const decimalValue = 1.3;
    inputElement &&
      fireEvent(
        inputElement,
        new CustomEvent("_change", {
          detail: { name: "numberInput", value: decimalValue },
        }),
      );
    expect(mockOnChangeHandler).toBeCalledWith(
      expect.objectContaining({
        name: "numberInput",
        value: decimalValue,
        event: expect.any(Event),
      }),
    );
  });

  describe("Text Alignment", () => {
    it("passes textAlign prop through to web component", () => {
      const props: GoabxInputProps = {
        ...defaultProps,
        name: "test",
        textAlign: "right",
      };

      render(<GoabxInputText {...props} />);

      const input = document.querySelector("goa-input");
      expect(input).toBeTruthy();
      expect(input?.getAttribute("textalign")).toBe("right");
    });
  });

  it("should pass data-grid attributes", () => {
    const { container } = render(
      <GoabxInputText name="test" onChange={noop} data-grid="cell" />,
    );
    const el = container.querySelector("goa-input");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
