import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import GoabxCheckboxList, { GoabxCheckboxListProps as CheckboxListProps } from "./checkbox-list";
import { describe, it, expect, vi } from "vitest";
import { GoabCheckboxListOnChangeDetail } from "@abgov/ui-components-common";

const testId = "test-id";

describe("GoabxCheckboxList", () => {
  it("should render", () => {
    render(<GoabxCheckboxList name="foo" />);

    const checkboxList = document.querySelector("goa-checkbox-list");
    expect(checkboxList?.getAttribute("name")).toBe("foo");
    expect(checkboxList?.getAttribute("version")).toBe("2");
    expect(checkboxList?.getAttribute("disabled")).toBeNull();
    expect(checkboxList?.getAttribute("error")).toBeNull();
  });

  it("should render with props", () => {
    const props: CheckboxListProps = {
      name: "foo",
      value: ["option1", "option2"],
      maxWidth: "480px",
      size: "compact",
      disabled: true,
      error: true,
      testId: testId,
      mt: "s",
      mr: "m",
      mb: "l",
      ml: "xl",
    };

    render(<GoabxCheckboxList {...props} />);

    const checkboxList = document.querySelector("goa-checkbox-list");
    expect(checkboxList?.getAttribute("name")).toBe("foo");
    expect(checkboxList?.getAttribute("maxwidth")).toBe("480px");
    expect(checkboxList?.getAttribute("size")).toBe("compact");
    expect(checkboxList?.getAttribute("version")).toBe("2");
    expect(checkboxList?.getAttribute("disabled")).toBe("true");
    expect(checkboxList?.getAttribute("error")).toBe("true");
    expect(checkboxList?.getAttribute("testid")).toBe(testId);
    expect(checkboxList?.getAttribute("mt")).toBe("s");
    expect(checkboxList?.getAttribute("mr")).toBe("m");
    expect(checkboxList?.getAttribute("mb")).toBe("l");
    expect(checkboxList?.getAttribute("ml")).toBe("xl");
  });

  it("should default version to 2", () => {
    render(<GoabxCheckboxList name="foo" />);

    const checkboxList = document.querySelector("goa-checkbox-list");
    expect(checkboxList?.getAttribute("version")).toBe("2");
  });

  it("should handle the onChange event", async function () {
    const onChangeStub = vi.fn();

    function onChange({ name, value }: GoabCheckboxListOnChangeDetail) {
      expect(name).toBe("foo");
      expect(value).toEqual(["option1"]);
      onChangeStub();
    }

    const props: CheckboxListProps = {
      name: "foo",
      value: [],
      onChange: onChange,
      testId: testId,
    };

    render(<GoabxCheckboxList {...props} />);
    const checkboxList = document.querySelector("goa-checkbox-list");

    checkboxList &&
      fireEvent(
        checkboxList,
        new CustomEvent("_change", {
          detail: { name: "foo", value: ["option1"] },
        }),
      );
    expect(onChangeStub).toBeCalled();
  });

  it("should render children", () => {
    render(
      <GoabxCheckboxList name="foo">
        <div data-testid="child">Child content</div>
      </GoabxCheckboxList>
    );

    const child = document.querySelector("[data-testid='child']");
    expect(child).toBeTruthy();
    expect(child?.textContent).toBe("Child content");
  });
});
