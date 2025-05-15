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
      { desc: "previous day", key: "{ArrowLeft}", diff: { fn: addDays, value: -1 } },
      { desc: "next day", key: "{ArrowRight}", diff: { fn: addDays, value: 1 } },
      { desc: "previous week", key: "{ArrowUp}", diff: { fn: addDays, value: -7 } },
      { desc: "next week", key: "{ArrowDown}", diff: { fn: addDays, value: 7 } },
      { desc: "previous month", key: "{PageUp}", diff: { fn: addMonths, value: -1 } },
      { desc: "next month", key: "{PageDown}", diff: { fn: addMonths, value: 1 } },
      { desc: "previous year", key: "{Shift>}{PageUp}", diff: { fn: addYears, value: -1 } },
      { desc: "next year", key: "{Shift>}{PageDown}", diff: { fn: addYears, value: 1 } },
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
          const newValue = format(expectedDate, "MMMM d, yyyy");
          expect(inputEl.value).toBe(newValue);
          expect(handleChange).toBeCalledWith(expectedDate)
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

describe("Date Picker input type", () => {
  it("dispatches date or null value when any field in input type date picker changes", async () => {
    const Component = () => {
      return (
        <div data-testid={"container"}>
          <GoabDatePicker
            type="input"
            name="datePickerInputType"
            testId="datePicker"
          ></GoabDatePicker>
        </div>
      );
    };

    const result = render(<Component />);
    const datePickerMonth = result.getByTestId("input-month");
    const datePickerDay = result.getByTestId("input-day");
    const datePickerYear = result.getByTestId("input-year");

    expect(datePickerMonth).toBeTruthy();
    expect(datePickerDay).toBeTruthy();
    expect(datePickerYear).toBeTruthy();

    const rootElChangeHandler = vi.fn();
    result.container.addEventListener("_change", (e: Event) => {
      const ce = e as CustomEvent;
      rootElChangeHandler(ce.detail.value);
    });

    // Select month
    if (datePickerMonth) {
      await datePickerMonth.click();
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");
    }

    // should be null because date is invalid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith(null);
    });
    rootElChangeHandler.mockClear();

    // Input day
    if (datePickerDay) {
      await datePickerDay.click();
      await userEvent.type(datePickerDay, "1");
    }

    // should be null because date is still invalid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith(null);
    });
    rootElChangeHandler.mockClear();

    // Input year
    if (datePickerYear) {
      await datePickerYear.click();
      await userEvent.type(datePickerYear, "1999");
    }

    // should not be null because date became valid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith("1999-01-01");
    });
    rootElChangeHandler.mockClear();

    // Clear day input
    if (datePickerDay) {
      await datePickerDay.click();
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("{Backspace}");
    }

    // should be null because date became invalid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith(null);
    });
    rootElChangeHandler.mockClear();
  });

  it("should have disabled property on input when disabled is true and type is input", async () => {
    const Component = () => {
      return (
        <div data-testid={"container"}>
          <GoabDatePicker
            type="input"
            name="datePickerInputType"
            testId="datePicker"
            disabled={true}
          ></GoabDatePicker>
        </div>
      );
    };

    const result = render(<Component />);
    const monthInput = result.getByTestId("input");
    const datePickerDay = result.getByTestId("input-day");
    const datePickerYear = result.getByTestId("input-year");

    await vi.waitFor(() => {
      expect(monthInput).toBeDisabled();
      expect(datePickerDay).toBeDisabled();
      expect(datePickerYear).toBeDisabled();
    });
  });
});
