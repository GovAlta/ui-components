import { render } from "@testing-library/react";
import { addMonths } from "date-fns";
import { describe, it, expect, vi } from "vitest";

import DatePicker from "./date-picker";

const noop = () => {
  /* do nothing */
};

describe("DatePicker", () => {
  it("should render", () => {
    const { baseElement } = render(<DatePicker name="foo" onChange={noop} />);

    const el = baseElement.querySelector("goa-date-picker");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("name")).toBe("foo");
    expect(el?.getAttribute("error")).toBeNull();
    expect(el?.getAttribute("disabled")).toBeNull();
  });

  it("should render with properties", () => {
    const value = new Date();
    const min = addMonths(value, -1);
    const max = addMonths(value, 1);

    const { baseElement } = render(
      <DatePicker
        name="foo"
        min={min}
        max={max}
        value={value}
        testId="foo"
        error
        disabled
        onChange={noop}
        width={"40ch"}
      />,
    );

    expect(baseElement).toBeTruthy();

    const el = baseElement.querySelector("goa-date-picker");
    expect(el).toBeTruthy();
    expect(el?.getAttribute("name")).toBe("foo");
    expect(el?.getAttribute("value")).toBe(value.toISOString());
    expect(el?.getAttribute("error")).toBe("true");
    expect(el?.getAttribute("disabled")).toBe("true");
    expect(el?.getAttribute("min")).toBe(min.toISOString());
    expect(el?.getAttribute("max")).toBe(max.toISOString());
    expect(el?.getAttribute("testid")).toBe("foo");
    expect(el?.getAttribute("width")).toBe("40ch");
  });

  it("should handle event", async () => {
    const name = "foo";
    const value = new Date();

    const onChange = vi.fn();
    const { baseElement } = render(
      <DatePicker name={name} value={value} onChange={onChange} />,
    );

    const el = baseElement.querySelector("goa-date-picker");

    el?.dispatchEvent(
      new CustomEvent("_change", {
        composed: true,
        bubbles: true,
        detail: { type: "date", name, value },
      }),
    );

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toBeCalledWith({ name, value, type: "date" });
  });
});
