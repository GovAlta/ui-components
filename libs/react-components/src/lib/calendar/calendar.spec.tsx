import { fireEvent, render } from "@testing-library/react";
import { addMonths } from "date-fns";
import { describe, it, expect, vi } from "vitest";

import Calendar from "./calendar";

const noop = () => { /* do nothing */ };

describe("Calendar", () => {
  it("should render successfully", () => {
    const { baseElement, container } = render(<Calendar onChange={noop} />);
    expect(baseElement).toBeTruthy();

    const calendar = container.querySelector("goa-calendar");
    expect(calendar).toBeTruthy();
  });

  it("handle the event", () => {
    const onChange = vi.fn();
    const name = "birthdate";
    const { container } = render(<Calendar onChange={onChange} name={name} />);
    const calendar = container.querySelector("goa-calendar");

    const detail = { type: "date", value: new Date(), name };
    calendar && fireEvent(calendar, new CustomEvent("_change", { detail }));
    expect(onChange).toBeCalled();
  });

  it("should set the props correctly", () => {
    const value = new Date();
    const min = addMonths(value, -1);
    const max = addMonths(value, 1);

    const { baseElement } = render(
      <Calendar
        name="calendar"
        value={value}
        min={min}
        max={max}
        testId="foo"
        onChange={noop}
      />
    );
    const el = baseElement.querySelector("goa-calendar");
    expect(baseElement).toBeTruthy();
    expect(el?.getAttribute("value")).toBe(value.toISOString());
    expect(el?.getAttribute("min")).toBe(min.toISOString());
    expect(el?.getAttribute("max")).toBe(max.toISOString());
    expect(el?.getAttribute("testid")).toBe("foo");
  });

  it("should pass data-grid attributes", () => {
    const { baseElement } = render(
      <Calendar
        onChange={noop}
        data-grid="cell"
      />
    );
    const el = baseElement.querySelector("goa-calendar");
    expect(el?.getAttribute("data-grid")).toBe("cell");
  });
});
