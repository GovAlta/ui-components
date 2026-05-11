import { render } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import GoabDropdownMultiselect, {
  GoabDropdownMultiselectProps,
} from "./dropdown-multiselect";
import { describe, it, expect, vi } from "vitest";
import { GoabDropdownMultiselectOnChangeDetail } from "@abgov/ui-components-common";

const testId = "test-multiselect";

describe("GoabDropdownMultiselect", () => {
  it("should render", () => {
    render(<GoabDropdownMultiselect name="choices" />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("name")).toBe("choices");
    expect(el?.getAttribute("disabled")).toBeNull();
    expect(el?.getAttribute("error")).toBeNull();
  });

  it("should render with all props", () => {
    const props: GoabDropdownMultiselectProps = {
      name: "choices",
      value: ["a", "b"],
      disabled: true,
      error: true,
      testId,
      maxWidth: "400px",
      size: "compact",
      placeholder: "Pick one",
      popoverPosition: "above",
      popoverMaxWidth: "500px",
      popoverMinWidth: "200px",
      popoverPadded: false,
      popoverWidth: "300px",
      mt: "s",
      mr: "m",
      mb: "l",
      ml: "xl",
    };

    render(<GoabDropdownMultiselect {...props} />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("name")).toBe("choices");
    expect(el?.getAttribute("disabled")).toBe("true");
    expect(el?.getAttribute("error")).toBe("true");
    expect(el?.getAttribute("testid")).toBe(testId);
    expect(el?.getAttribute("maxwidth")).toBe("400px");
    expect(el?.getAttribute("size")).toBe("compact");
    expect(el?.getAttribute("placeholder")).toBe("Pick one");
    expect(el?.getAttribute("popoverposition")).toBe("above");
    expect(el?.getAttribute("popovermaxwidth")).toBe("500px");
    expect(el?.getAttribute("popoverminwidth")).toBe("200px");
    expect(el?.getAttribute("popoverpadded")).toBe("false");
    expect(el?.getAttribute("popoverwidth")).toBe("300px");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
  });

  it("should not set disabled when false", () => {
    render(<GoabDropdownMultiselect name="choices" disabled={false} />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("disabled")).toBeNull();
  });

  it("should not set error when false", () => {
    render(<GoabDropdownMultiselect name="choices" error={false} />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("error")).toBeNull();
  });

  it("should set popoverpadded='true' when popoverPadded=true", () => {
    render(<GoabDropdownMultiselect name="choices" popoverPadded={true} />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("popoverpadded")).toBe("true");
  });

  it("should not set popoverpadded when popoverPadded is undefined", () => {
    render(<GoabDropdownMultiselect name="choices" />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("popoverpadded")).toBeNull();
  });

  it("should handle the onChange event", () => {
    const onChangeStub = vi.fn();

    function onChange({ name, value, labels }: GoabDropdownMultiselectOnChangeDetail) {
      expect(name).toBe("choices");
      expect(value).toEqual(["a"]);
      expect(labels).toEqual(["Option A"]);
      onChangeStub();
    }

    render(
      <GoabDropdownMultiselect name="choices" testId={testId} onChange={onChange} />,
    );

    const el = document.querySelector("goa-dropdown-multiselect");
    el &&
      fireEvent(
        el,
        new CustomEvent("_change", {
          detail: { name: "choices", value: ["a"], labels: ["Option A"] },
        }),
      );

    expect(onChangeStub).toHaveBeenCalledOnce();
  });

  it("should handle the onPopoverOpen event", () => {
    const openSpy = vi.fn();

    render(
      <GoabDropdownMultiselect name="choices" onPopoverOpen={openSpy} />,
    );

    const el = document.querySelector("goa-dropdown-multiselect");
    el &&
      fireEvent(
        el,
        new CustomEvent("_popoveropen", { bubbles: true }),
      );

    expect(openSpy).toHaveBeenCalledOnce();
  });

  it("should handle the onPopoverClose event", () => {
    const closeSpy = vi.fn();

    render(
      <GoabDropdownMultiselect name="choices" onPopoverClose={closeSpy} />,
    );

    const el = document.querySelector("goa-dropdown-multiselect");
    el &&
      fireEvent(
        el,
        new CustomEvent("_popoverclose", { bubbles: true }),
      );

    expect(closeSpy).toHaveBeenCalledOnce();
  });

  it("should render children", () => {
    render(
      <GoabDropdownMultiselect name="choices">
        <div data-testid="child">Child content</div>
      </GoabDropdownMultiselect>,
    );

    const child = document.querySelector("[data-testid='child']");
    expect(child).toBeTruthy();
    expect(child?.textContent).toBe("Child content");
  });

  it("should default size to 'default'", () => {
    render(<GoabDropdownMultiselect name="choices" />);

    const el = document.querySelector("goa-dropdown-multiselect");
    expect(el?.getAttribute("size")).toBe("default");
  });
});
