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
