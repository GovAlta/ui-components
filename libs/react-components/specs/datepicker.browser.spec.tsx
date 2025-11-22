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
      { value: "2025-03-01", expected: "2025-02-28", formatted: "February 28, 2025", desc: "previous day", key: "{ArrowLeft}" },
      { value: "2025-03-01", expected: "2025-03-02", formatted: "March 2, 2025", desc: "next day", key: "{ArrowRight}" },
      { value: "2025-03-01", expected: "2025-02-22", formatted: "February 22, 2025", desc: "previous week", key: "{ArrowUp}" },
      { value: "2025-03-01", expected: "2025-03-08", formatted: "March 8, 2025", desc: "next week", key: "{ArrowDown}" },
      { value: "2025-03-01", expected: "2025-02-01", formatted: "February 1, 2025", desc: "previous month", key: "{PageUp}" },
      { value: "2025-03-01", expected: "2025-04-01", formatted: "April 1, 2025", desc: "next month", key: "{PageDown}" },
      { value: "2025-03-01", expected: "2024-03-01", formatted: "March 1, 2024", desc: "previous year", key: "{Shift>}{PageUp}" },
      { value: "2025-03-01", expected: "2026-03-01", formatted: "March 1, 2026", desc: "next year", key: "{Shift>}{PageDown}" },
    ].forEach(({ value, expected, formatted, desc, key }) => {
      it(`navigates to the ${desc} when ${key} is pressed`, async () => {
        const handleChange = vi.fn();
        const Component = () => {
          return <GoabDatePicker testId="date-picker" value={value} onChange={(detail) => {
            handleChange(detail.valueStr)
          }} />;
        };

        const result = render(<Component />);
        const input = result.getByTestId("calendar-input");

        await userEvent.type(input, key);

        await vi.waitFor(() => {
          const inputEl = input.element() as HTMLInputElement;
          expect(inputEl.value).toBe(formatted);
          expect(handleChange).toBeCalledWith(expected)
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

  describe("Width property", () => {
    it("applies custom width with px units", async () => {
      const Component = () => {
        return <GoabDatePicker testId="date-picker" width="400px" />;
      };

      const result = render(<Component />);
      const input = result.getByTestId("calendar-input");

      await vi.waitFor(() => {
        // Check the input element's computed style
        const computedStyle = window.getComputedStyle(input.element());
        const inputWidth = parseFloat(computedStyle.width);

        // The width should be close to 400px (the underlying goa-input component handles the width)
        expect(inputWidth).toBeGreaterThan(300);
        expect(inputWidth).toBeLessThan(450);
      });
    });

    it("applies custom width with ch units", async () => {
      const Component = () => {
        return <GoabDatePicker testId="date-picker" width="25ch" />;
      };

      const result = render(<Component />);
      const input = result.getByTestId("calendar-input");

      await vi.waitFor(() => {
        // Check computed width is applied (browser converts ch to px)
        const computedStyle = window.getComputedStyle(input.element());
        expect(computedStyle.width).toMatch(/^\d+(\.\d+)?px$/);

        // Should have a reasonable width for 25ch
        const inputWidth = parseFloat(computedStyle.width);
        expect(inputWidth).toBeGreaterThan(200);
        expect(inputWidth).toBeLessThan(600);
      });
    });

    it("uses default width when not specified", async () => {
      const Component = () => {
        return <GoabDatePicker testId="date-picker" />;
      };

      const result = render(<Component />);
      const input = result.getByTestId("calendar-input");

      await vi.waitFor(() => {
        // Default width should be 16ch - check computed width
        const computedStyle = window.getComputedStyle(input.element());
        const inputWidth = parseFloat(computedStyle.width);

        // 16ch should be around 150-300px depending on font
        expect(inputWidth).toBeGreaterThan(100);
        expect(inputWidth).toBeLessThan(400);
      });
    });

    it("supports percentage width units", async () => {
      const Component = () => {
        return (
          <div style={{ width: "800px" }} data-testid="container">
            <GoabDatePicker testId="date-picker" width="80%" />
          </div>
        );
      };

      const result = render(<Component />);
      const input = result.getByTestId("calendar-input");

      await vi.waitFor(() => {
        // Check computed width
        const computedStyle = window.getComputedStyle(input.element());
        expect(computedStyle.width).toMatch(/^\d+(\.\d+)?px$/);

        // Should be a reasonable percentage of container
        const inputWidth = parseFloat(computedStyle.width);
        expect(inputWidth).toBeGreaterThan(50);
        expect(inputWidth).toBeLessThan(800);
      });
    });

    it("maintains minimum width to ensure date display", async () => {
      const Component = () => {
        return <GoabDatePicker testId="date-picker" width="20ch" value={new Date()} />;
      };

      const result = render(<Component />);
      const input = result.getByTestId("calendar-input");

      await vi.waitFor(() => {
        const inputEl = input.element() as HTMLInputElement;

        // Check that date value is displayed
        expect(inputEl.value).toBeTruthy();
        expect(inputEl.value.length).toBeGreaterThan(0);

        // Check width is applied
        const computedStyle = window.getComputedStyle(inputEl);
        const inputWidth = parseFloat(computedStyle.width);

        // Should be wide enough to display date (20ch should be enough)
        expect(inputWidth).toBeGreaterThan(150);
      });
    });
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
    const datePickerMonthMarch = result.getByTestId("dropdown-item-3");
    const datePickerDay = result.getByTestId("input-day");
    const datePickerYear = result.getByTestId("input-year");

    const rootElChangeHandler = vi.fn();
    result.container.addEventListener("_change", (e: Event) => {
      const ce = e as CustomEvent;
      rootElChangeHandler(ce.detail.valueStr);
    });

    // Select month
    await datePickerMonth.click();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{Enter}");

    // should be null because date is invalid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith("");
    });
    rootElChangeHandler.mockClear();

    // Input day
    await datePickerDay.click();
    await userEvent.type(datePickerDay, "1");

    // Select month
    await userEvent.click(datePickerMonth);
    await userEvent.click(datePickerMonthMarch);

    // should be null because date is still invalid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith("");
    });
    rootElChangeHandler.mockClear();

    // Input year
    await datePickerYear.click();
    await userEvent.type(datePickerYear, "1999");

    // should not be null because date became valid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith("1999-03-01");
    });
    rootElChangeHandler.mockClear();

    // Clear day input
    await datePickerDay.click();
    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{Backspace}");

    // should be null because date became invalid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith("");
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
