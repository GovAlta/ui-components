import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import GoACheckbox, { Props as CheckboxProps } from "./checkbox";
import { describe, it, expect, vi } from "vitest";

const testId = "test-id";

describe("GoA Checkbox", () => {
  it("should render", () => {
    const props: CheckboxProps = {
      id: "abc",
      name: "foo",
      value: "bar",
      text: "to display",
      maxWidth: "480px",
      disabled: false,
      checked: true,
      error: false,
      testId: testId,
      mt: "s",
      mr: "m",
      mb: "l",
      ml: "xl",
    };

    render(<GoACheckbox {...props} />);

    const checkbox = document.querySelector("goa-checkbox");
    expect(checkbox).toBeTruthy();
    expect(checkbox?.getAttribute("id")).toBe("abc");
    expect(checkbox?.getAttribute("name")).toBe("foo");
    expect(checkbox?.getAttribute("value")).toBe("bar");
    expect(checkbox?.getAttribute("text")).toBe("to display");
    expect(checkbox?.getAttribute("maxwidth")).toBe("480px");
    expect(checkbox?.getAttribute("disabled")).toBe("false");
    expect(checkbox?.getAttribute("checked")).toBe("true");
    expect(checkbox?.getAttribute("error")).toBe("false");
    expect(checkbox?.getAttribute("testid")).toBe(testId);
    expect(checkbox?.getAttribute("mt")).toBe("s");
    expect(checkbox?.getAttribute("mr")).toBe("m");
    expect(checkbox?.getAttribute("mb")).toBe("l");
    expect(checkbox?.getAttribute("ml")).toBe("xl");
  });

  it("should render with text description", () => {
    render(<GoACheckbox name={"foo"} checked={false} description={"description text"} />);

    const checkbox = document.querySelector("goa-checkbox");
    expect(checkbox?.getAttribute("description")).toBe("description text");
  });

  it("should render with slot description", () => {
    const result = render(
      <GoACheckbox name={"foo"} checked={false} description={<div>description slot</div>}/>);

    const checkbox = document.querySelector("goa-checkbox");
    expect(checkbox?.getAttribute("description")).toBe(null);
    expect(result.container.querySelector('div[slot="description"]')?.innerHTML)
      .toContain("description slot");
  });

  it("should handle the onChange event", async function () {
    const onChangeStub = vi.fn();

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

    render(<GoACheckbox {...props} />);
    const checkbox = document.querySelector("goa-checkbox");
    expect(checkbox).toBeTruthy();

    checkbox && fireEvent(
      checkbox,
      new CustomEvent("_change", { detail: { value: "bar", checked: true } })
    );
    expect(onChangeStub).toBeCalled();
  });
});
