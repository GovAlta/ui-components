import DatePicker from "./DatePicker.svelte";
import {
  createEvent,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/svelte";
import {
  addDays,
  format,
  addMonths,
  addYears,
} from "date-fns";
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
  const relative = "true";

  const { container } = render(DatePicker, { value, relative });

  const popover = container.querySelector("goa-popover");
  const input = container.querySelector("goa-input");

  expect(popover?.getAttribute("relative")).toBe("true");
  expect(input?.getAttribute("value")).toBe(format(value, "PPP"));
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

it("allows for date navigation via the keyboard", async () => {
  const inputDate = new Date();
  const currentDate = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate(),
  );

  const { container } = render(DatePicker, { value: inputDate });
  const input = container.querySelector("goa-input");
  expect(input).toBeTruthy();
  expect(inputDate).toBeTruthy();

  if (!input) return;

  const arrowLeftEvent = createEvent.keyDown(input, { key: "ArrowLeft" });
  const arrowRightEvent = createEvent.keyDown(input, { key: "ArrowRight" });
  const arrowDownEvent = createEvent.keyDown(input, { key: "ArrowDown" });
  const arrowUpEvent = createEvent.keyDown(input, { key: "ArrowUp" });
  const pageUpEvent = createEvent.keyDown(input, { key: "PageUp" });
  const pageDownEvent = createEvent.keyDown(input, { key: "PageDown" });
  const shiftPageUpEvent = createEvent.keyDown(input, {
    key: "PageUp",
    shiftKey: true,
  });
  const shiftPageDownEvent = createEvent.keyDown(input, {
    key: "PageDown",
    shiftKey: true,
  });

  const handler = vi.fn();
  container?.addEventListener("_change", (e: Event) => {
    const ce = e as CustomEvent
    handler(ce.detail.value);
  });

  // left arrow
  const expectedLA = addDays(currentDate, -1);
  await fireEvent(input, arrowLeftEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expectedLA);
  });

  // right arrow
  const expectedRA = addDays(currentDate, 1);
  await fireEvent(input, arrowRightEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expectedRA);
  });

  // up arrow
  const expectedUA = addDays(currentDate, -7);
  await fireEvent(input, arrowUpEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expectedUA);
  });

  // down arrow
  const expectedDA = addDays(currentDate, 7);
  await fireEvent(input, arrowDownEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expectedDA);
  });

  // page up
  const expectedPU = addMonths(currentDate, -1);
  await fireEvent(input, pageUpEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expectedPU);
  });

  // page down
  const expectedPD = addMonths(currentDate, 1);
  await fireEvent(input, pageDownEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expectedPD);
  });

  // shift page up
  const expectedSPU = addYears(currentDate, -1);
  await fireEvent(input, shiftPageUpEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expectedSPU);
  });

  // shift page down
  const expectedSPD = addYears(currentDate, 1);
  await fireEvent(input, shiftPageDownEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expectedSPD);
  });
});
