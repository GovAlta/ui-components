import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import GoabDropdownMultiselect, {
  GoabDropdownMultiselectProps,
} from "./dropdown-multiselect";
import { GoabDropdownItem } from "../dropdown/dropdown-item";
import { describe, it, expect, vi } from "vitest";
import { GoabDropdownMultiselectOnChangeDetail } from "@abgov/ui-components-common";

describe("GoabDropdownMultiselect", () => {
  it("should render with required props", () => {
    render(<GoabDropdownMultiselect name="fruit" />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("name")).toBe("fruit");
    expect(el?.getAttribute("disabled")).toBeNull();
    expect(el?.getAttribute("error")).toBeNull();
  });

  it("should render with all props", () => {
    const props: GoabDropdownMultiselectProps = {
      name: "fruit",
      value: ["apple", "banana"],
      placeholder: "Select fruit",
      disabled: true,
      error: true,
      testId: "test-multiselect",
      ariaLabel: "Choose fruit",
      ariaLabelledBy: "fruit-label",
      maxHeight: "300px",
      width: "400px",
      size: "compact",
      labelFormat: "count",
      showSelectAll: true,
      mt: "s",
      mr: "m",
      mb: "l",
      ml: "xl",
    };

    render(<GoabDropdownMultiselect {...props} />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("name")).toBe("fruit");
    expect(el?.getAttribute("placeholder")).toBe("Select fruit");
    expect(el?.getAttribute("disabled")).toBe("true");
    expect(el?.getAttribute("error")).toBe("true");
    expect(el?.getAttribute("testid")).toBe("test-multiselect");
    expect(el?.getAttribute("aria-label")).toBe("Choose fruit");
    expect(el?.getAttribute("aria-labelledby")).toBe("fruit-label");
    expect(el?.getAttribute("max-height")).toBe("300px");
    expect(el?.getAttribute("width")).toBe("400px");
    expect(el?.getAttribute("size")).toBe("compact");
    expect(el?.getAttribute("label-format")).toBe("count");
    expect(el?.getAttribute("show-select-all")).toBe("true");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });

  it("should not set disabled or error attributes when false", () => {
    render(<GoabDropdownMultiselect name="fruit" disabled={false} error={false} />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("disabled")).toBeNull();
    expect(el?.getAttribute("error")).toBeNull();
  });

  it("should fire onChange callback on _change event", () => {
    const onChange = vi.fn();
    render(<GoabDropdownMultiselect name="fruit" onChange={onChange} />);

    const el = document.querySelector("goa-dropdown-multiselect") as HTMLElement;
    const detail: Omit<GoabDropdownMultiselectOnChangeDetail, "event"> = {
      name: "fruit",
      value: ["apple"],
      labels: ["Apple"],
    };

    fireEvent(el, new CustomEvent("_change", { detail, bubbles: true }));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].name).toBe("fruit");
    expect(onChange.mock.calls[0][0].value).toEqual(["apple"]);
    expect(onChange.mock.calls[0][0].labels).toEqual(["Apple"]);
  });

  it("should render children", () => {
    render(
      <GoabDropdownMultiselect name="fruit">
        <GoabDropdownItem value="apple" label="Apple" />
      </GoabDropdownMultiselect>,
    );

    const child = document.querySelector("goa-dropdown-item");
    expect(child).toBeTruthy();
  });
});
