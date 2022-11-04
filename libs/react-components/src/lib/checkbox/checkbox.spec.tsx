import React, { useState } from "react";
import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import GoACheckbox, { Props as CheckboxProps } from "./checkbox";

const testId = "test-id";

describe("GoA Checkbox", () => {
  it("should render", () => {
    const props: CheckboxProps = {
      id: "abc",
      name: "foo",
      value: "bar",
      text: "to display",
      disabled: false,
      checked: true,
      error: false,
      testId: testId,
    };

    render(<GoACheckbox {...props} />);

    const checkbox = screen.getByTestId(testId);
    expect(checkbox).toBeTruthy();
    expect(checkbox.getAttribute("id")).toBe("abc");
    expect(checkbox.getAttribute("name")).toBe("foo");
    expect(checkbox.getAttribute("value")).toBe("bar");
    expect(checkbox.getAttribute("text")).toBe("to display");
    expect(checkbox.getAttribute("disabled")).toBe("false");
    expect(checkbox.getAttribute("checked")).toBe("true");
    expect(checkbox.getAttribute("error")).toBe("false");
    expect(checkbox.getAttribute("data-testid")).toBe(testId);
  });

  it("should handle the onChange event", async function () {
    const onChangeStub = jest.fn();

    function onChange(name: string, checked: boolean, value: string) {
      expect(name).toBe("foo");
      expect(value).toBe("bar");
      expect(checked).toBeTruthy();
      onChangeStub();
    }

    const props: CheckboxProps = {
      name: "foo",
      value: "bar",
      text: "to display",
      disabled: true,
      checked: false,
      error: false,
      onChange: onChange,
      testId: testId,
    };

    const { getByTestId } = render(<GoACheckbox {...props} />);
    const checkbox = getByTestId(testId);
    expect(checkbox).toBeTruthy();

    await fireEvent(
      checkbox,
      new CustomEvent("_change", { detail: { value: "bar", checked: true } })
    );
    expect(onChangeStub).toBeCalled();
  });
});
