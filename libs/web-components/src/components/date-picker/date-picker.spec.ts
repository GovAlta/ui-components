import DatePicker from "./DatePicker.svelte";
import {
  createEvent,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/svelte";
import {
  addDays,
  getDaysInMonth,
  format,
  getDaysInYear,
  addMonths,
  addYears,
} from "date-fns";

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

  expect(popover.getAttribute("relative")).toBe("true");
  expect(input.getAttribute("value")).toBe(format(value, "PPP"));
});

it("dispatches a value on date selection", async () => {
  const { container } = render(DatePicker);
  const popover = container.querySelector("goa-popover");
  const input = container.querySelector("goa-input");

  const selectedDate = new Date();

  const handler = jest.fn();
  popover.addEventListener("_change", ({ detail }: CustomEvent) => {
    handler();
    expect(detail.value).toBe(selectedDate);
  });

  input.dispatchEvent(
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
  let expected = new Date(
    inputDate.getFullYear(),
    inputDate.getMonth(),
    inputDate.getDate(),
  );

  const { container } = render(DatePicker, { value: inputDate });
  const input = container.querySelector("goa-input");
  expect(inputDate).toBeTruthy();

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

  const handler = jest.fn();
  container.addEventListener("_change", ({ detail }: CustomEvent) => {
    handler(detail.value);
  });

  // left arrow
  expected = addDays(expected, -1);
  await fireEvent(input, arrowLeftEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expected);
  });

  // right arrow
  expected = addDays(expected, 1);
  await fireEvent(input, arrowRightEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expected);
  });

  // up arrow
  expected = addDays(expected, -7);
  await fireEvent(input, arrowUpEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expected);
  });

  // down arrow
  expected = addDays(expected, 7);
  await fireEvent(input, arrowDownEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expected);
  });

  // page up
  expected = addMonths(expected, -1);
  await fireEvent(input, pageUpEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expected);
  });

  // page down
  expected = addMonths(expected, 1);
  await fireEvent(input, pageDownEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expected);
  });

  // shift page up
  expected = addYears(expected, -1);
  await fireEvent(input, shiftPageUpEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expected);
  });

  // shift page down
  expected = addYears(expected, 1);
  await fireEvent(input, shiftPageDownEvent);
  await waitFor(() => {
    expect(handler).toHaveBeenCalledWith(expected);
  });
});
