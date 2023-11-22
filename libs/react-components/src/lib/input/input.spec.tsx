import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import { GoAInputDateTime, GoAInputText, InputProps } from "./input";
import { GoAIconType } from "../icon/icon";

const noop = () => {};
const testId = "test-id";
const defaultProps: InputProps = {
  name: "",
  value: "",
  testId: testId,
  onChange: noop,
};

describe("Input", () => {
  it("should render", () => {
    const props: InputProps = {
      ...defaultProps,
      name: "foo",
      value: "bar",
      id: "foo",
      leadingIcon: "search" as GoAIconType,
      trailingIcon: "close" as GoAIconType,
      autoCapitalize: "on",
      variant: "bare",
      disabled: true,
      readonly: true,
      placeholder: "placeholder",
      prefix: "foo",
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

    render(<GoAInputText {...props} />);

    const input = document.querySelector("goa-input");
    expect(input).toBeTruthy();
    expect(input.getAttribute("name")).toBe("foo");
    expect(input.getAttribute("value")).toBe("bar");
    expect(input.getAttribute("type")).toBe("text");
    expect(input.getAttribute("id")).toBe("foo");
    expect(input.getAttribute("leadingicon")).toBe("search");
    expect(input.getAttribute("trailingicon")).toBe("close");
    expect(input.getAttribute("autocapitalize")).toBe("on");
    expect(input.getAttribute("variant")).toBe("bare");
    expect(input.getAttribute("disabled")).toBeTruthy();
    expect(input.getAttribute("readonly")).toBeTruthy();
    expect(input.getAttribute("placeholder")).toBe("placeholder");
    expect(input.getAttribute("prefix")).toBe("foo");
    expect(input.getAttribute("suffix")).toBe("bar");
    expect(input.getAttribute("data-testid")).toBe(testId);
    expect(input.getAttribute("debounce")).toBe("1000");
    expect(input.getAttribute("mt")).toBe("s");
    expect(input.getAttribute("mr")).toBe("m");
    expect(input.getAttribute("mb")).toBe("l");
    expect(input.getAttribute("ml")).toBe("xl");
    expect(input.getAttribute("maxlength")).toBe("10");
    expect(
      input.querySelector("[slot='leadingContent']").textContent
    ).toContain("$");
    expect(
      input.querySelector("[slot='trailingContent']").textContent
    ).toContain("items");
    expect(input.getAttribute("handletrailingiconclick")).toBeTruthy();
  });

  it("should handle the onChange event", async function () {
    const validateOnChange = jest.fn();
    const newValue = "barfoo";

    const onChange = (name: string, value: string) => {
      expect(name).toBe("foo");
      expect(value).toBe(newValue);
      validateOnChange();
    };
    const props = { ...defaultProps, onChange };
    render(<GoAInputText {...props} />);

    const input = document.querySelector("goa-input");
    expect(input).toBeTruthy();

    fireEvent(
      input,
      new CustomEvent("_change", { detail: { name: "foo", value: newValue } })
    );
    expect(validateOnChange).toBeCalled();
  });

  it("should not error out with invalid dates", () => {
    const mockOnChangeHandler = jest.fn();
    const { container } = render(
      <GoAInputDateTime
        onChange={mockOnChangeHandler}
        name="dateInput"
        value={new Date()}
      />
    );
    const inputElement = container.querySelector(
      'goa-input[type="datetime-local"]'
    );
    expect(inputElement).toBeTruthy();
    //invalid dates do not trigger change event
    fireEvent(
      inputElement,
      new CustomEvent("_change", {
        detail: { name: "dateInput", value: "invalid date" },
      })
    );
    expect(mockOnChangeHandler).not.toBeCalled();
    const newDate = new Date().toISOString();
    //valid dates trigger change event
    fireEvent(
      inputElement,
      new CustomEvent("_change", {
        detail: { name: "dateInput", value: newDate },
      })
    );
    expect(mockOnChangeHandler).toBeCalledWith("dateInput", new Date(newDate));
  });
});
