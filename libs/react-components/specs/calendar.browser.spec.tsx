import { render, RenderResult } from "vitest-browser-react";
import { GoabCalendar } from "../src";
import { expect, describe, it, vi } from "vitest";
import { userEvent } from "@vitest/browser/context";
import { format, addDays, addMonths, addYears } from "date-fns";

describe("Calendar", () => {
  const noop = () => {
    // noop
  };

  it("renders", async () => {
    const handleChange = vi.fn();

    const Component = () => {
      return <GoabCalendar testId="cal" onChange={handleChange} />;
    };

    const result = render(<Component />);

    await vi.waitFor(() => {
      const calendar = result.getByTestId("cal");
      expect(calendar.element()).toBeTruthy();
    });
  });

  it("renders with a value", async () => {
    const value = "2024-03-15";
    const handleChange = vi.fn();

    const Component = () => {
      return <GoabCalendar testId="calendar" value={value} onChange={handleChange} />;
    };

    const result = render(<Component />);
    const selectedDate = result.getByTestId("2024-03-15");

    await vi.waitFor(() => {
      expect(selectedDate.element()).toBeTruthy();
      expect(selectedDate.element().classList.contains("selected")).toBe(true);
    });
  });

  it("dispatches change event when clicked", async () => {
    const handleChange = vi.fn();
    const today = new Date();
    const todayStr = format(today, "yyyy-MM-dd");

    const Component = () => {
      return <GoabCalendar testId="calendar" name="birthdate" onChange={handleChange} />;
    };

    const result = render(<Component />);
    const dateButton = result.getByTestId(todayStr);

    await dateButton.click();

    await vi.waitFor(() => {
      expect(handleChange).toHaveBeenCalledWith({
        name: "birthdate",
        value: expect.any(String),
      });
    });
  });

  it("respects min date constraint", async () => {
    const handleChange = vi.fn();
    const value = "2025-11-15";
    const today = new Date(value);
    const minDate = format(today, "yyyy-MM-dd");
    const pastDate = format(addDays(today, -5), "yyyy-MM-dd");

    const Component = () => {
      return (
        <GoabCalendar
          testId="calendar"
          min={minDate}
          value={value}
          onChange={handleChange}
        />
      );
    };

    const result = render(<Component />);
    const pastDateButton = result.getByTestId(pastDate);

    await vi.waitFor(() => {
      expect(pastDateButton.element().classList.contains("disabled")).toBe(true);
    });

    await pastDateButton.click();

    // Should not trigger change for disabled date
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("respects max date constraint", async () => {
    const handleChange = vi.fn();
    const testDate = new Date(2024, 2, 15); // March 15, 2024
    const maxDate = format(testDate, "yyyy-MM-dd");
    const futureDate = format(addDays(testDate, 5), "yyyy-MM-dd");

    const Component = () => {
      return (
        <GoabCalendar
          testId="cal-test"
          value={maxDate}
          max={maxDate}
          onChange={handleChange}
        />
      );
    };

    const result = render(<Component />);

    // Wait for component to render
    await vi.waitFor(() => {
      expect(result.getByTestId("cal-test").element()).toBeTruthy();
    });

    const futureDateButton = result.getByTestId(futureDate);

    await vi.waitFor(() => {
      expect(futureDateButton.element().classList.contains("disabled")).toBe(true);
    });

    await futureDateButton.click();

    // Should not trigger change for disabled date
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(handleChange).not.toHaveBeenCalled();
  });

  describe("Month and Year selection", () => {
    it("changes the month when month dropdown is changed", async () => {
      const handleChange = vi.fn();

      const Component = () => {
        return (
          <div data-testid="container">
            <GoabCalendar testId="calendar" value="2024-03-15" onChange={handleChange} />
          </div>
        );
      };

      const result = render(<Component />);

      const monthsDropdown = result.getByTestId("months");
      const june = result.getByTestId("dropdown-item-6");
      const firstDayOfJune = result.getByTestId("2024-06-01");

      // select June
      await monthsDropdown.click();
      await june.click();

      // Wait for dropdown to be interactive
      await vi.waitFor(() => {
        expect(firstDayOfJune).toBeVisible();
      });
    });

    it("changes the year when year dropdown is changed", async () => {
      const handleChange = vi.fn();

      const Component = () => {
        return (
          <div data-testid="container">
            <GoabCalendar testId="calendar" value="2024-03-15" onChange={handleChange} />
          </div>
        );
      };

      const result = render(<Component />);
      const yearsDropdown = result.getByTestId("years");
      const nextYear = result.getByTestId("dropdown-item-2025");
      const firstDay = result.getByTestId("2025-03-01");

      // select June
      await yearsDropdown.click();
      await nextYear.click();

      // Wait for dropdown to be interactive
      await vi.waitFor(() => {
        expect(firstDay).toBeVisible();
      });
    });
  });

  describe("Keyboard Navigation", () => {
    it("navigates to previous day with ArrowLeft and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initialDate = result.getByTestId(startDateStr);

      await initialDate.click();
      await userEvent.keyboard("{ArrowLeft}");
      await userEvent.keyboard("{Enter}");

      const prevDate = format(addDays(startDate, -1), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(prevDate),
        });
      });
    });

    it("navigates to next day with ArrowRight and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{ArrowRight}");
      await userEvent.keyboard("{Enter}");

      const nextDate = format(addDays(startDate, 1), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(nextDate),
        });
      });
    });

    it("navigates to previous week with ArrowUp and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{ArrowUp}");
      await userEvent.keyboard("{Enter}");

      const prevWeekDate = format(addDays(startDate, -7), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(prevWeekDate),
        });
      });
    });

    it("navigates to next week with ArrowDown and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{Enter}");

      const nextWeekDate = format(addDays(startDate, 7), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(nextWeekDate),
        });
      });
    });

    it("navigates to first day of month with Home and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{Home}");
      await userEvent.keyboard("{Enter}");

      const firstDay = format(new Date(2024, 2, 1), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(firstDay),
        });
      });
    });

    it("navigates to last day of month with End and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{End}");
      await userEvent.keyboard("{Enter}");

      const lastDay = format(new Date(2024, 2, 31), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(lastDay),
        });
      });
    });

    it("navigates to previous month with PageUp and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{PageUp}");
      await userEvent.keyboard("{Enter}");

      const prevMonthDate = format(addMonths(startDate, -1), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(prevMonthDate),
        });
      });
    });

    it("navigates to next month with PageDown and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{PageDown}");
      await userEvent.keyboard("{Enter}");

      const nextMonthDate = format(addMonths(startDate, 1), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(nextMonthDate),
        });
      });
    });

    it("navigates to previous year with Shift+PageUp and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{Shift>}{PageUp}");
      await userEvent.keyboard("{Enter}");

      const prevYearDate = format(addYears(startDate, -1), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(prevYearDate),
        });
      });
    });

    it("navigates to next year with Shift+PageDown and selects with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{Shift>}{PageDown}");
      await userEvent.keyboard("{Enter}");

      const nextYearDate = format(addYears(startDate, 1), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(nextYearDate),
        });
      });
    });

    it("selects the focused date with Enter", async () => {
      const handleChange = vi.fn();
      const startDate = new Date(2024, 2, 15); // March 15, 2024
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{ArrowRight}"); // Move to next day
      await userEvent.keyboard("{Enter}"); // Select it

      const expectedDate = format(addDays(startDate, 1), "yyyy-MM-dd");
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(expectedDate),
        });
      });
    });

    it("does not navigate beyond min date constraint", async () => {
      const handleChange = vi.fn();
      const minDate = new Date(2024, 2, 10); // March 10, 2024
      const startDate = new Date(2024, 2, 11); // March 11, 2024
      const minDateStr = format(minDate, "yyyy-MM-dd");
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            min={minDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{ArrowLeft}"); // Try to move before min
      await userEvent.keyboard("{Enter}"); // Try to select

      // Should still select March 11 (start date), not March 10
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(startDateStr),
        });
      });
    });

    it("does not navigate beyond max date constraint", async () => {
      const handleChange = vi.fn();
      const maxDate = new Date(2024, 2, 20); // March 20, 2024
      const startDate = new Date(2024, 2, 19); // March 19, 2024
      const maxDateStr = format(maxDate, "yyyy-MM-dd");
      const startDateStr = format(startDate, "yyyy-MM-dd");

      const Component = () => {
        return (
          <GoabCalendar
            testId="cal-wrapper"
            value={startDateStr}
            max={maxDateStr}
            onChange={handleChange}
          />
        );
      };

      const result = render(<Component />);
      const initDate = result.getByTestId(startDateStr);

      await initDate.click();
      await userEvent.keyboard("{ArrowRight}"); // Try to move after max
      await userEvent.keyboard("{Enter}"); // Try to select

      // Should still select March 19 (start date), not March 20
      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: expect.stringContaining(startDateStr),
        });
      });
    });
  });

  describe("Given a date is selected", () => {
    const currentValue = "2026-01-31";
    const handleChange = vi.fn();

    let result: RenderResult;

    beforeEach(async () => {
      const Component = () => {
        return (
          <GoabCalendar
            testId="test-calendar"
            value={currentValue}
            onChange={handleChange}
          />
        );
      };
      result = render(<Component />);
    });

    it("focuses the value selected date", async () => {
      await vi.waitFor(() => {
        const selected = result.getByTestId(currentValue);
        expect(selected.element().classList.contains("selected")).toBe(true);
      });
    });

    it("does not select a day in the next month when another month is selected", async () => {
      // Move from January to February 2026
      const monthsDropdown = result.getByTestId("months");
      const februaryItem = result.getByTestId("dropdown-item-2");

      // select February
      await monthsDropdown.click();
      await februaryItem.click();

      await vi.waitFor(() => {
        const firstDayOfFeb = result.getByTestId("2026-02-01");
        expect(firstDayOfFeb).toBeVisible();
      });

      await vi.waitFor(() => {
        // Feb 2026 is four weeks that fit perfectly in the calendar view. Jan 31
        // should not be visible or in the calendar at all.
        expect(result.container.getElementsByClassName("selected").length).toBe(0);
        // Value didn't change
        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    it("does not select a day in the next year when another year is selected", async () => {
      // Move from 2026 to January 2027
      const yearsDropdown = result.getByTestId("years");
      const jan2027Item = result.getByTestId("dropdown-item-2027");
      const firstDayOfJan2027 = result.getByTestId("2027-01-01");

      // select 2027
      await yearsDropdown.click();
      await jan2027Item.click();

      // Wait for dropdown to be interactive
      await vi.waitFor(() => {
        expect(firstDayOfJan2027).toBeVisible();
      });

      await vi.waitFor(() => {
        expect(result.container.getElementsByClassName("selected").length).toBe(0);
        // Value didn't change
        expect(handleChange).not.toHaveBeenCalled();
      });
    });

    it("will keep the selection when navigating back to the original month", async () => {
      // Move from January to February 2026
      const monthsDropdown = result.getByTestId("months");
      const februaryItem = result.getByTestId("dropdown-item-2");
      const firstDayOfFeb = result.getByTestId("2026-02-01");

      // select February
      await monthsDropdown.click();
      await februaryItem.click();

      await vi.waitFor(() => {
        expect(firstDayOfFeb).toBeVisible();
      });

      const januaryItem = result.getByTestId("dropdown-item-1");
      const firstDayOfJan = result.getByTestId("2026-01-01");

      // select January again
      await monthsDropdown.click();
      await januaryItem.click();

      await vi.waitFor(() => {
        expect(firstDayOfJan).toBeVisible();
      });

      await vi.waitFor(() => {
        const selected = result.getByTestId(currentValue);
        expect(selected.element().classList.contains("selected")).toBe(true);
      });
    });
  });

  describe("Visual states", () => {
    it("highlights today's date", async () => {
      const handleChange = vi.fn();
      const today = new Date();
      const todayStr = format(today, "yyyy-MM-dd");

      const Component = () => {
        return <GoabCalendar testId="calendar" onChange={handleChange} />;
      };

      const result = render(<Component />);
      const todayButton = result.getByTestId(todayStr);

      await vi.waitFor(() => {
        expect(todayButton.element().classList.contains("today")).toBe(true);
      });
    });

    it("highlights the selected date", async () => {
      const handleChange = vi.fn();
      const selectedDate = "2024-03-15";

      const Component = () => {
        return (
          <GoabCalendar testId="calendar" value={selectedDate} onChange={handleChange} />
        );
      };

      const result = render(<Component />);
      const selectedButton = result.getByTestId(selectedDate);

      await vi.waitFor(() => {
        expect(selectedButton.element().classList.contains("selected")).toBe(true);
      });
    });

    it("displays days from previous and next months", async () => {
      const handleChange = vi.fn();
      const testDate = "2024-03-15"; // March 2024

      const Component = () => {
        return (
          <GoabCalendar testId="calendar" value={testDate} onChange={handleChange} />
        );
      };

      const result = render(<Component />);

      // March 1, 2024 is a Friday, so we should see days from previous month
      // Last days of February 2024
      const lastDayOfFeb = result.getByTestId("2024-02-29"); // Leap year

      await vi.waitFor(() => {
        expect(lastDayOfFeb.element()).toBeTruthy();
        expect(lastDayOfFeb.element().classList.contains("other-month")).toBe(true);
      });
    });
  });

  describe("Edge cases", () => {
    it("handles leap year correctly", async () => {
      const handleChange = vi.fn();
      const leapDay = "2024-02-29";

      const Component = () => {
        return <GoabCalendar testId="calendar" value={leapDay} onChange={handleChange} />;
      };

      const result = render(<Component />);
      const leapDayButton = result.getByTestId(leapDay);

      await vi.waitFor(() => {
        expect(leapDayButton.element()).toBeTruthy();
        expect(leapDayButton.element().classList.contains("selected")).toBe(true);
      });
    });

    it("handles month transitions when selecting dates from other months", async () => {
      const handleChange = vi.fn();
      const testDate = "2024-03-01"; // March 1, 2024 (Friday)

      const Component = () => {
        return (
          <GoabCalendar testId="calendar" value={testDate} onChange={handleChange} />
        );
      };

      const result = render(<Component />);

      // Click on a day from February (displayed at the beginning of March calendar)
      const febDay = result.getByTestId("2024-02-29");
      await febDay.click();

      await vi.waitFor(() => {
        expect(handleChange).toHaveBeenCalledWith({
          name: "",
          value: "2024-02-29",
        });
      });
    });
  });

  describe("Bug fixes", () => {
    describe("3156", () => {
      it("should render all months", async () => {
        // The calendar contained falsey values
        const Component = () => {
          return <GoabCalendar name="favcolor" onChange={noop} />;
        };

        const result = render(<Component />);
        const falseyOption = result.getByTestId("dropdown-item-1");

        await vi.waitFor(() => {
          expect(falseyOption.element()).toBeTruthy();
        });
      });
    });

    // #3305: If you selected a date that didn't exist in the next month
    // (e.g., Jan 31 to Feb), the calendar would not render February at all.
    describe("3305", async () => {
      const handleChange = vi.fn();
      let result: RenderResult;

      beforeEach(async () => {
        const Component = () => {
          return <GoabCalendar testId="test-calendar" onChange={handleChange} />;
        };

        result = render(<Component />);
      });

      it("can show February after selecting Jan 31", async () => {
        // Move from January to February 2026
        const yearsDropdown = result.getByTestId("years");
        const year2027Item = result.getByTestId("dropdown-item-2027");

        // Select 2027
        await yearsDropdown.click();
        await year2027Item.click();

        // Select January (2027)
        const monthsDropdown = result.getByTestId("months");
        const januaryItem = result.getByTestId("dropdown-item-1");
        const lastDayOfJan = result.getByTestId("2027-01-31");

        // Select January
        await monthsDropdown.click();
        await januaryItem.click();

        // Wait for dropdown to be interactive
        await vi.waitFor(() => {
          expect(lastDayOfJan).toBeVisible();
        });

        await lastDayOfJan.click();
        await vi.waitFor(() => {
          expect(handleChange).toHaveBeenCalledWith({
            name: "",
            value: "2027-01-31",
          });
        });

        handleChange.mockReset();

        // Select February
        const februaryItem = result.getByTestId("dropdown-item-2");

        await monthsDropdown.click();
        await februaryItem.click();

        const firstDayOfFeb = result.getByTestId("2027-02-01");
        const lastDayOfFeb = result.getByTestId("2027-02-28");

        // Wait for calendar to be interactive at February, which means a pass.
        await vi.waitFor(() => {
          expect(firstDayOfFeb).toBeVisible();
          expect(lastDayOfFeb).toBeVisible();
          expect(handleChange).not.toHaveBeenCalled();
        });
      });
    });
  });
});
