import DatePicker from "./DatePicker.svelte";
import {
  createEvent,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/svelte";
import userEvent, { UserEvent } from "@testing-library/user-event";
import { addDays, format, addMonths, addYears } from "date-fns";
import { it, expect, vi, describe } from "vitest";

let user: UserEvent;

beforeEach(() => {
  user = userEvent.setup();
});

it("it renders", async () => {
  const { container } = render(DatePicker);
  const popover = container.querySelector("goa-popover");
  const input = container.querySelector("goa-input");
  const calendar = container.querySelector("goa-calendar");

  expect(popover).toBeTruthy();
  expect(input).toBeTruthy();
  expect(calendar).toBeTruthy();
});

it("renders with props", async () => {
  const value = addDays(new Date(), -10);

  const { container } = render(DatePicker, { value });

  const input = container.querySelector("goa-input");

  expect(input?.getAttribute("value")).toBe(format(value, "MMMM d, yyyy"));
});

it("shows an error state", async () => {
  const value = new Date();
  const error = "true";
  const { container } = render(DatePicker, { value, error });
  const input = container.querySelector("goa-input");

  expect(input?.getAttribute("error")).toBe("true");
});

it("dispatches a value on date selection", async () => {
  const { container } = render(DatePicker);
  const popover = container.querySelector("goa-popover");
  const input = container.querySelector("goa-input");
  const selectedDate = new Date();
  const handler = vi.fn();

  expect(popover).toBeTruthy();
  expect(input).toBeTruthy();

  popover?.addEventListener("_change", (e: Event) => {
    const ce = e as CustomEvent;
    handler();
    expect(ce.detail.value).toBe(selectedDate);
  });

  input?.dispatchEvent(
    new CustomEvent("_change", {
      composed: true,
      bubbles: true,
      detail: { type: "date", value: selectedDate },
    }),
  );

  await waitFor(() => {
    expect(handler).toBeCalled();
  });
});

describe("input type date picker", () => {
  it("validates invalid input type datepicker value (partially filled)", async () => {
    const { container } = render(DatePicker, {
      name: "datePickerInputType",
      type: "input",
      value: "2025-02", // Partially filled, invalid date
    });

    const datePickerDay = container.querySelector("goa-input[name='day']");
    const datePickerMonth = container.querySelector("goa-dropdown[name='month']");
    const datePickerYear = container.querySelector("goa-input[name='year']");

    expect(datePickerDay?.getAttribute("value")).toBe("");
    expect(datePickerMonth?.getAttribute("value")).toBe("");
    expect(datePickerYear?.getAttribute("value")).toBe("");
  });

  it("validates invalid input type datepicker value (not in YYYY-MM-DD format)", async () => {
    const { container } = render(DatePicker, {
      name: "datePickerInputType",
      type: "input",
      value: "Mon Jul 07 2025 07:25:44 GMT-0600 (Mountain Daylight Time)", // not in YYYY-MM-DD format
    });

    const datePickerDay = container.querySelector("goa-input[name='day']");
    const datePickerMonth = container.querySelector("goa-dropdown[name='month']");
    const datePickerYear = container.querySelector("goa-input[name='year']");

    expect(datePickerDay?.getAttribute("value")).toBe("");
    expect(datePickerMonth?.getAttribute("value")).toBe("");
    expect(datePickerYear?.getAttribute("value")).toBe("");
  });

  it("validates invalid input type datepicker value (not in YYYY-MM-DD format)", async () => {
    const { container } = render(DatePicker, {
      name: "datePickerInputType",
      type: "input",
      value: "2025-12345", // not in YYYY-MM-DD format
    });

    const datePickerDay = container.querySelector("goa-input[name='day']");
    const datePickerMonth = container.querySelector("goa-dropdown[name='month']");
    const datePickerYear = container.querySelector("goa-input[name='year']");

    expect(datePickerDay?.getAttribute("value")).toBe("");
    expect(datePickerMonth?.getAttribute("value")).toBe("");
    expect(datePickerYear?.getAttribute("value")).toBe("");
  });

  // NOTE: Date picker input type Feb 31st converts to March 3rd in react but, not in angular
  it("validates invalid input type datepicker value (February 31st does not exist)", async () => {
    const { container } = render(DatePicker, {
      name: "datePickerInputType",
      type: "input",
      value: "2025-02-31", // Invalid because February 31st does not exist
    });

    const datePickerDay = container.querySelector("goa-input[name='day']");
    const datePickerMonth = container.querySelector("goa-dropdown[name='month']");
    const datePickerYear = container.querySelector("goa-input[name='year']");

    expect(datePickerDay?.getAttribute("value")).toBe("");
    expect(datePickerMonth?.getAttribute("value")).toBe("");
    expect(datePickerYear?.getAttribute("value")).toBe("");
  });

  it("validates valid date in YYYY-MM-DD format provided as input type datepicker value", async () => {
    const { container } = render(DatePicker, {
      name: "datePickerInputType",
      type: "input",
      value: "2025-02-28", // Valid date
    });

    const datePickerDay = container.querySelector("goa-input[name='day']");
    const datePickerMonth = container.querySelector("goa-dropdown[name='month']");
    const datePickerYear = container.querySelector("goa-input[name='year']");

    expect(datePickerDay?.getAttribute("value")).toBe("28");
    expect(datePickerMonth?.getAttribute("value")).toBe("1");
    expect(datePickerYear?.getAttribute("value")).toBe("2025");
  });

  it("validates valid javascript Date in ISO format provided as input type datepicker value", async () => {
    const { container } = render(DatePicker, {
      name: "datePickerInputType",
      type: "input",
      value: new Date("2025-02-28").toISOString(), // Valid date
    });

    const datePickerDay = container.querySelector("goa-input[name='day']");
    const datePickerMonth = container.querySelector("goa-dropdown[name='month']");
    const datePickerYear = container.querySelector("goa-input[name='year']");

    expect(datePickerDay?.getAttribute("value")).toBe("28");
    expect(datePickerMonth?.getAttribute("value")).toBe("1");
    expect(datePickerYear?.getAttribute("value")).toBe("2025");
  });
});

it("renders with disabled prop", async () => {
  const { container } = render(DatePicker, { disabled: "true" });
  const input = container.querySelector("goa-input");
  const popover = container.querySelector("goa-popover");

  expect(input?.getAttribute("disabled")).toBe("true");
  expect(popover?.getAttribute("disabled")).toBe("true");
});

it("prevents interaction when disabled", async () => {
  const { container } = render(DatePicker, { disabled: "true" });
  const input = container.querySelector("goa-input");

  expect(input).toBeTruthy();

  if (!input) return;

  const clickEvent = createEvent.click(input);
  const handler = vi.fn();
  container?.addEventListener("_change", handler);

  await fireEvent(input, clickEvent);
  await waitFor(() => {
    expect(handler).not.toBeCalled();
  });
});

describe("width property", () => {
  it("applies custom width to calendar type datepicker", async () => {
    const { container } = render(DatePicker, {
      type: "calendar",
      width: "20ch"
    });
    const input = container.querySelector("goa-input");

    expect(input?.getAttribute("width")).toBe("20ch");
  });

  it("uses default width when not specified for calendar type", async () => {
    const { container } = render(DatePicker, {
      type: "calendar"
    });
    const input = container.querySelector("goa-input");

    expect(input?.getAttribute("width")).toBe("16ch");
  });

  it("applies custom width to input type datepicker", async () => {
    const { container } = render(DatePicker, {
      type: "input",
      width: "400px"
    });
    const formItem = container.querySelector("goa-form-item");

    expect(formItem?.getAttribute("style")).toContain("width: 400px");
  });

  it("does not apply width style when not specified for input type", async () => {
    const { container } = render(DatePicker, {
      type: "input"
    });
    const formItem = container.querySelector("goa-form-item");

    expect(formItem?.getAttribute("style")).toBe("");
  });
});
