import { render, cleanup } from "@testing-library/react";
import { fireEvent, waitFor } from "@testing-library/dom";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useState } from "react";
import GoabCheckboxList from "./checkbox-list";
import { GoabCheckbox } from "../checkbox/checkbox";
import { GoabCheckboxListOnChangeDetail } from "@abgov/ui-components-common";

const testId = "checkbox-list-test";

describe("GoabCheckboxList (React)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("should render", () => {
    render(
      <GoabCheckboxList
        name="foo"
        value={["a", "b"]}
        disabled
        error
        testId={testId}
        maxWidth="480px"
        mt="s"
        mr="m"
        mb="l"
        ml="xl"
      />,
    );

    const el = document.querySelector("goa-checkbox-list");
    expect(el?.getAttribute("name")).toBe("foo");
    expect(el?.getAttribute("disabled")).toBe("true");
    expect(el?.getAttribute("error")).toBe("true");
    expect(el?.getAttribute("testid")).toBe(testId);
    expect(el?.getAttribute("maxwidth")).toBe("480px");
    expect(el?.getAttribute("mt")).toBe("s");
    expect(el?.getAttribute("mr")).toBe("m");
    expect(el?.getAttribute("mb")).toBe("l");
    expect(el?.getAttribute("ml")).toBe("xl");
    // value is set as a property (not reflected to attribute); verified via change event below
  });

  it("should render checkbox children", async () => {
    render(
      <GoabCheckboxList name="basic">
        <GoabCheckbox name="basic1" value="basic1" text="Basic 1" />
        <GoabCheckbox name="basic2" value="basic2" text="Basic 2" />
        <GoabCheckbox name="basic3" value="basic3" text="Basic 3" />
      </GoabCheckboxList>,
    );

    const list = document.querySelector("goa-checkbox-list");
    expect(list).toBeTruthy();

    const checkboxes = list?.querySelectorAll("goa-checkbox");
    expect(checkboxes?.length).toBe(3);

    const first = checkboxes?.[0] as HTMLElement & { value?: string };
    expect(first.getAttribute("name")).toBe("basic1");
    expect(first.getAttribute("text")).toBe("Basic 1");
  });

  it("should change disabled and error", () => {
    const { rerender } = render(
      <GoabCheckboxList name="test" disabled={false} error={false} />,
    );

    let el = document.querySelector("goa-checkbox-list");
    expect(el?.getAttribute("disabled")).toBeNull();
    expect(el?.getAttribute("error")).toBeNull();

    rerender(<GoabCheckboxList name="test" disabled={true} error={true} />);

    el = document.querySelector("goa-checkbox-list");
    expect(el?.getAttribute("disabled")).toBe("true");
    expect(el?.getAttribute("error")).toBe("true");
  });

  it("should handle the onChange event and pass detail", () => {
    const onChange = vi.fn();

    render(<GoabCheckboxList name="foo" onChange={onChange} />);

    const el = document.querySelector("goa-checkbox-list");
    expect(el).toBeTruthy();

    const detail: GoabCheckboxListOnChangeDetail = {
      name: "foo",
      value: ["x", "y"],
    };

    el &&
      fireEvent(
        el,
        new CustomEvent("_change", {
          detail,
        }),
      );

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(detail);
  });

  it("should update onChange handler when prop changes", () => {
    const onChange1 = vi.fn();
    const onChange2 = vi.fn();

    const { rerender } = render(<GoabCheckboxList name="foo" onChange={onChange1} />);

    const el = document.querySelector("goa-checkbox-list");
    const detail: GoabCheckboxListOnChangeDetail = {
      name: "foo",
      value: ["x"],
    };

    // Fire event with first handler
    el && fireEvent(el, new CustomEvent("_change", { detail }));
    expect(onChange1).toHaveBeenCalledTimes(1);
    expect(onChange2).not.toHaveBeenCalled();

    // Update handler
    rerender(<GoabCheckboxList name="foo" onChange={onChange2} />);

    // Fire event with second handler
    el && fireEvent(el, new CustomEvent("_change", { detail }));
    expect(onChange1).toHaveBeenCalledTimes(1); // Should not be called again
    expect(onChange2).toHaveBeenCalledTimes(1);
  });

  it("should update child checked attribute on rerender", () => {
    const { rerender } = render(
      <GoabCheckboxList name="manual">
        <GoabCheckbox name="email" value="email" text="Email" checked={false} />
      </GoabCheckboxList>,
    );

    let email = document.querySelector('goa-checkbox[name="email"]');
    expect(email?.getAttribute("checked")).toBeNull();

    rerender(
      <GoabCheckboxList name="manual">
        <GoabCheckbox name="email" value="email" text="Email" checked={true} />
      </GoabCheckboxList>,
    );

    email = document.querySelector('goa-checkbox[name="email"]');
    expect(email?.getAttribute("checked")).toBe("true");
  });
  it("should handle component unmounting", () => {
    const { unmount } = render(<GoabCheckboxList name="test" onChange={vi.fn()} />);

    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it("should handle component remounting", () => {
    const { unmount } = render(<GoabCheckboxList name="test" onChange={vi.fn()} />);
    unmount();

    expect(() => {
      render(<GoabCheckboxList name="test" onChange={vi.fn()} />);
    }).not.toThrow();
  });

  it("should handle value changes", async () => {
    const TestComponent = () => {
      const [values, setValues] = useState<string[]>(["initial"]);

      return (
        <div>
          <span data-testid="values-out">{values.join(",")}</span>
          <button data-testid="change-btn" onClick={() => setValues(["changed"])}>
            Change
          </button>
          <GoabCheckboxList name="test" value={values} />
        </div>
      );
    };

    const { getByTestId } = render(<TestComponent />);

    // Initial state
    expect(getByTestId("values-out").textContent).toBe("initial");

    // Click to change
    fireEvent.click(getByTestId("change-btn"));

    // State updated (wait for React to flush updates)
    await vi.waitFor(() => {
      expect(getByTestId("values-out").textContent).toBe("changed");
    });
  });

  it("should handle empty and undefined values", () => {
    const { rerender } = render(<GoabCheckboxList name="test" value={[]} />);

    let el = document.querySelector("goa-checkbox-list");
    expect(el).toBeTruthy();

    // Test with undefined
    rerender(<GoabCheckboxList name="test" value={undefined} />);
    el = document.querySelector("goa-checkbox-list");
    expect(el).toBeTruthy();
  });
});
