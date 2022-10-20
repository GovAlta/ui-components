import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { fireEvent, screen } from "@testing-library/dom";
import { GoAInputText, InputProps } from "./input";
import { GoAIconType } from "../icons";

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
      onTrailingIconClick: noop,
    };

    render(<GoAInputText {...props} />);

    const input = screen.getByTestId(testId);
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
    const { getByTestId } = render(<GoAInputText {...props} />);

    const input = getByTestId(testId);
    expect(input).toBeTruthy();

    fireEvent(
      input,
      new CustomEvent("_change", { detail: { name: "foo", value: newValue } })
    );
    expect(validateOnChange).toBeCalled();
  });
});
