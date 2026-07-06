import DatePicker from "./DatePicker.svelte";
import {
  createEvent,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/svelte";
import { addDays, format } from "date-fns";
import { it, expect, vi, describe } from "vitest";

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
      width: "20ch",
    });
    const input = container.querySelector("goa-input");

    expect(input?.getAttribute("width")).toBe("20ch");
  });

  it("uses default width when not specified for calendar type", async () => {
    const { container } = render(DatePicker, {
      type: "calendar",
    });
    const input = container.querySelector("goa-input");

    expect(input?.getAttribute("width")).toBe("16ch");
  });

  it("does not apply width style when not specified for input type", async () => {
    const { container } = render(DatePicker, {
      type: "input",
    });
    const formItem = container.querySelector("goa-form-item");

    expect(formItem?.getAttribute("style") ?? "").not.toContain("width");
  });
});

describe("focus and blur events", () => {
  it("dispatches _focus when focus enters and _blur when focus leaves the calendar popover", async () => {
    const name = "start-date";
    const { container } = render(DatePicker, { name });

    const popover = container.querySelector("goa-popover") as HTMLElement;

    const onFocus = vi.fn();
    const onBlur = vi.fn();
    container?.addEventListener("_focus", (e: Event) => {
      expect((e as CustomEvent).detail.name).toBe(name);
      onFocus();
    });
    container?.addEventListener("_blur", (e: Event) => {
      expect((e as CustomEvent).detail.name).toBe(name);
      onBlur();
    });

    popover.focus();
    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    popover.blur();
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });

  it("dispatches _focus and _blur for the input-type date picker", async () => {
    const name = "start-date";
    const { container } = render(DatePicker, { name, type: "input" });

    const formItem = container.querySelector("goa-form-item") as HTMLElement;
    formItem.tabIndex = -1;

    const onFocus = vi.fn();
    const onBlur = vi.fn();
    container?.addEventListener("_focus", onFocus);
    container?.addEventListener("_blur", onBlur);

    formItem.focus();
    await waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    formItem.blur();
    await waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
  });
});

describe("placeholder property", () => {
  it("defaults to the placeholder value", async () => {
    const { container } = render(DatePicker, {
      type: "input",
    });

    const monthInput = container.querySelector("[testid='input-month']");
    expect(monthInput?.getAttribute("value")).toBe("0");
  });
});

describe("day and year inputs", () => {
  it("renders day and year as number inputs with the spinner hidden", async () => {
    const { container } = render(DatePicker, {
      type: "input",
    });

    const dayInput = container.querySelector("[testid='input-day']");
    const yearInput = container.querySelector("[testid='input-year']");

    expect(dayInput?.getAttribute("type")).toBe("number");
    expect(dayInput?.classList.contains("no-spinner")).toBe(true);
    expect(yearInput?.getAttribute("type")).toBe("number");
    expect(yearInput?.classList.contains("no-spinner")).toBe(true);
  });

  it("emits a string date value when typed digits form a valid date", async () => {
    const { container } = render(DatePicker, { type: "input" });

    const handler = vi.fn();
    container.addEventListener("_change", handler);

    const fields: Record<string, string> = {
      year: "2025",
      month: "6",
      day: "15",
    };
    for (const [name, value] of Object.entries(fields)) {
      const el = container.querySelector(`[testid='input-${name}']`);
      el?.dispatchEvent(
        new CustomEvent("_change", {
          detail: { name, value },
          bubbles: true,
        }),
      );
    }

    await waitFor(() => {
      expect(handler).toHaveBeenCalled();
    });

    const { value } = handler.mock.calls.at(-1)[0].detail;
    expect(typeof value).toBe("string");
    expect(value).toBe("2025-06-15");
  });
});

describe("programmatic value changes for input type (#3275)", () => {
  it("populates month, day, and year from the initial value", async () => {
    const { container } = render(DatePicker, {
      type: "input",
      value: "2024-03-15",
    });

    const monthInput = container.querySelector("[testid='input-month']");
    const dayInput = container.querySelector("[testid='input-day']");
    const yearInput = container.querySelector("[testid='input-year']");

    expect(monthInput?.getAttribute("value")).toBe("3");
    expect(dayInput?.getAttribute("value")).toBe("15");
    expect(yearInput?.getAttribute("value")).toBe("2024");
  });

  it("updates the fields when value is changed programmatically", async () => {
    const { container, rerender } = render(DatePicker, {
      type: "input",
      value: "2024-03-15",
    });

    await rerender({ type: "input", value: "2025-11-02" });

    const monthInput = container.querySelector("[testid='input-month']");
    const dayInput = container.querySelector("[testid='input-day']");
    const yearInput = container.querySelector("[testid='input-year']");

    expect(monthInput?.getAttribute("value")).toBe("11");
    expect(dayInput?.getAttribute("value")).toBe("2");
    expect(yearInput?.getAttribute("value")).toBe("2025");
  });

  it("clears the fields when value is set to an empty string", async () => {
    const { container, rerender } = render(DatePicker, {
      type: "input",
      value: "2024-03-15",
    });

    await rerender({ type: "input", value: "" });

    const monthInput = container.querySelector("[testid='input-month']");
    const dayInput = container.querySelector("[testid='input-day']");
    const yearInput = container.querySelector("[testid='input-year']");

    expect(monthInput?.getAttribute("value")).toBe("0");
    expect(dayInput?.getAttribute("value")).toBe("");
    expect(yearInput?.getAttribute("value")).toBe("");
  });
});

describe("invalid date handling (#3275)", () => {
  it("resets to blank when given a nonexistent calendar date", async () => {
    const { container } = render(DatePicker, {
      type: "input",
      value: "2025-02-31",
    });

    const monthInput = container.querySelector("[testid='input-month']");
    const dayInput = container.querySelector("[testid='input-day']");
    const yearInput = container.querySelector("[testid='input-year']");

    expect(monthInput?.getAttribute("value")).toBe("0");
    expect(dayInput?.getAttribute("value")).toBe("");
    expect(yearInput?.getAttribute("value")).toBe("");
  });
});
