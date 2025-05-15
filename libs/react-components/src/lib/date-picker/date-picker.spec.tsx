import { render } from "@testing-library/react";
import { addMonths } from "date-fns";
import { describe, it, expect } from "vitest";

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
        type="input"
        onChange={noop}
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
    expect(el?.getAttribute("type")).toBe("input");
  });

});
