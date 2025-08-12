import { render } from "vitest-browser-react";
import { GoabDatePicker } from "../src";
import { expect, describe, it, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { addDays, format, addMonths, addYears } from "date-fns";

describe("DatePicker", () => {
  it("renders", async () => {
    const Component = () => {
      return <GoabDatePicker testId="date-picker" />;
    };

    const result = render(<Component />);

    await vi.waitFor(() => {
      const datePicker = result.getByTestId("date-picker");
      expect(datePicker.element()).toBeTruthy();
    });
  });

  it("renders with props", async () => {
    const value = addDays(new Date(), -10);
    const Component = () => {
      return <GoabDatePicker testId="date-picker" value={value} />;
    };

    const result = render(<Component />);
    const input = result.getByTestId("calendar-input");

    await vi.waitFor(() => {
      const inputEl = input.element() as HTMLInputElement;
      expect(inputEl.value).toBe(format(value, "MMMM d, yyyy"));
    });
  });

  it("shows an error state", async () => {
    const value = new Date();

    const Component = () => {
      return <GoabDatePicker testId="date-picker" value={value} error={true} />;
    };

    const result = render(<Component />);
    const input = result.getByTestId("calendar-input");

    await vi.waitFor(() => {
      expect(input.element().getAttribute("aria-invalid")).toBe("true");
    });
  });

  it("dispatches a value on date selection", async () => {
    const handleChange = vi.fn();
    const selectedDate = new Date();

    const Component = () => {
      return <GoabDatePicker testId="date-picker" onChange={handleChange} />;
    };

    const result = render(<Component />);
    const input = result.getByTestId("calendar-input");
    const dateToSelect = result.getByTestId(format(selectedDate, "yyyy-MM-dd"));

    await input.click();
    await dateToSelect.click();

    await vi.waitFor(() => {
      expect(handleChange).toHaveBeenCalled();
    });
  });

  describe("DatePicker Keyboard Navigation", () => {
    [
      { desc: "previous day", key: "{ArrowLeft}", diff: { fn: addDays, value: -1}},
      { desc: "next day", key: "{ArrowRight}", diff: { fn: addDays, value: 1}},
      { desc: "previous week", key: "{ArrowUp}", diff: { fn: addDays, value: -7}},
      { desc: "next week", key: "{ArrowDown}", diff: { fn: addDays, value: 7}},
      { desc: "previous month", key: "{PageUp}", diff: { fn: addMonths, value: -1}},
      { desc: "next month", key: "{PageDown}", diff: { fn: addMonths, value: 1}},
      { desc: "previous year", key: "{Shift>}{PageUp}", diff: { fn: addYears, value: -1}},
      { desc: "next year", key: "{Shift>}{PageDown}", diff: { fn: addYears, value: 1}},
    ].forEach(({ desc, key, diff }) => {
      it(`navigates to the ${desc} when ${key} is pressed`, async () => {
        const inputDate = new Date();
        const currentDate = new Date(
          inputDate.getFullYear(),
          inputDate.getMonth(),
          inputDate.getDate()
        );

        const handleChange = vi.fn();
        const Component = () => {
          return <GoabDatePicker testId="date-picker" value={inputDate} onChange={(detail) => {
            handleChange(detail.value)
          }} />;
        };
        const result = render(<Component />);
        const input = result.getByTestId("calendar-input");

        await userEvent.type(input, key);

        const expectedDate = diff.fn(currentDate, diff.value);
        await vi.waitFor(() => {
          const inputEl = input.element() as HTMLInputElement;
          expect(inputEl.value).toBe(format(expectedDate, "MMMM d, yyyy"));
        });
      })
    })
  });

  it("renders with disabled prop", async () => {
    const Component = () => {
      return <GoabDatePicker testId="date-picker" disabled={true} />;
    };

    const result = render(<Component />);
    const input = result.getByTestId("calendar-input");
    const popover = result.getByTestId("calendar-popover");

    await vi.waitFor(() => {
      const inputEl = input.element() as HTMLInputElement;
      const popoverEl = popover.element() as HTMLInputElement;

      expect(inputEl.disabled).toBe(true);
      expect(popoverEl.disabled).toBe(true);
    });
  });

  it("prevents interaction when disabled", async () => {
    const handleChange = vi.fn();

    const Component = () => {
      return <GoabDatePicker testId="date-picker" disabled={true} onChange={handleChange} />;
    };

    const result = render(<Component />);
    const input = result.getByTestId("calendar-input");

    // verify input is disabled
    await vi.waitFor(() => {
      const inputEl = (input.element()) as HTMLInputElement;
      expect(inputEl.disabled).toBe(true);
    })
  });
});
