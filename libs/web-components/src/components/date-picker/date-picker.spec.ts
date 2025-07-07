import DatePicker from "./DatePicker.svelte";
import {
  createEvent,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/svelte";
import { addDays, format, addMonths, addYears } from "date-fns";
import { it, expect, vi } from "vitest";

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

describe("DatePicker Keyboard Navigation", () => {
  const setupTest = () => {
    const inputDate = new Date();
    const currentDate = new Date(
      inputDate.getFullYear(),
      inputDate.getMonth(),
      inputDate.getDate(),
    );

    const { container } = render(DatePicker, { value: inputDate });
    const input = container.querySelector("goa-input");
    expect(input).toBeTruthy();

    const handler = vi.fn();
    container?.addEventListener("_change", (e: Event) => {
      const ce = e as CustomEvent;
      handler(ce.detail.value);
    });

    return { input, currentDate, handler };
  };

  it("navigates to the previous day when left arrow is pressed", async () => {
    const { input, currentDate, handler } = setupTest();
    const arrowLeftEvent = createEvent.keyDown(input!, { key: "ArrowLeft" });

    await fireEvent(input!, arrowLeftEvent);

    const expectedDate = addDays(currentDate, -1);
    await waitFor(() => {
      expect(handler).toHaveBeenCalledWith(expectedDate);
    });
  });

  it("navigates to the next day when right arrow is pressed", async () => {
    const { input, currentDate, handler } = setupTest();
    const arrowRightEvent = createEvent.keyDown(input!, { key: "ArrowRight" });

    await fireEvent(input!, arrowRightEvent);

    const expectedDate = addDays(currentDate, 1);
    await waitFor(() => {
      expect(handler).toHaveBeenCalledWith(expectedDate);
    });
  });

  it("navigates to the previous week when up arrow is pressed", async () => {
    const { input, currentDate, handler } = setupTest();
    const arrowUpEvent = createEvent.keyDown(input!, { key: "ArrowUp" });

    await fireEvent(input!, arrowUpEvent);

    const expectedDate = addDays(currentDate, -7);
    await waitFor(() => {
      expect(handler).toHaveBeenCalledWith(expectedDate);
    });
  });

  it("navigates to the next week when down arrow is pressed", async () => {
    const { input, currentDate, handler } = setupTest();
    const arrowDownEvent = createEvent.keyDown(input!, { key: "ArrowDown" });

    await fireEvent(input!, arrowDownEvent);

    const expectedDate = addDays(currentDate, 7);
    await waitFor(() => {
      expect(handler).toHaveBeenCalledWith(expectedDate);
    });
  });

  it("navigates to the previous month when PageUp is pressed", async () => {
    const { input, currentDate, handler } = setupTest();
    const pageUpEvent = createEvent.keyDown(input!, { key: "PageUp" });

    await fireEvent(input!, pageUpEvent);

    const expectedDate = addMonths(currentDate, -1);
    await waitFor(() => {
      expect(handler).toHaveBeenCalledWith(expectedDate);
    });
  });

  it("navigates to the next month when PageDown is pressed", async () => {
    const { input, currentDate, handler } = setupTest();
    const pageDownEvent = createEvent.keyDown(input!, { key: "PageDown" });

    await fireEvent(input!, pageDownEvent);

    const expectedDate = addMonths(currentDate, 1);
    await waitFor(() => {
      expect(handler).toHaveBeenCalledWith(expectedDate);
    });
  });

  it("navigates to the previous year when Shift+PageUp is pressed", async () => {
    const { input, currentDate, handler } = setupTest();
    const shiftPageUpEvent = createEvent.keyDown(input!, {
      key: "PageUp",
      shiftKey: true,
    });

    await fireEvent(input!, shiftPageUpEvent);

    const expectedDate = addYears(currentDate, -1);
    await waitFor(() => {
      expect(handler).toHaveBeenCalledWith(expectedDate);
    });
  });

  it("navigates to the next year when Shift+PageDown is pressed", async () => {
    const { input, currentDate, handler } = setupTest();
    const shiftPageDownEvent = createEvent.keyDown(input!, {
      key: "PageDown",
      shiftKey: true,
    });

    await fireEvent(input!, shiftPageDownEvent);

    const expectedDate = addYears(currentDate, 1);
    await waitFor(() => {
      expect(handler).toHaveBeenCalledWith(expectedDate);
    });
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
