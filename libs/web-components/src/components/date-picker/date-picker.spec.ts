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
