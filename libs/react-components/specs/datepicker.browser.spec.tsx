import { render } from "vitest-browser-react";
import { GoabDatePicker } from "../src";
import { expect, describe, it, vi, beforeAll } from "vitest";
import { page, userEvent } from "@vitest/browser/context";
import { format } from "date-fns";

describe("DatePicker", () => {
  it("renders", async () => {
    const Component = () => {
      return <GoabDatePicker testId="date-picker" />;
    };

    const result = render(<Component />);
    const datePicker = result.getByTestId("date-picker");

    await vi.waitFor(() => {
      expect(datePicker).toBeInTheDocument();
    });
  });

  it("renders with props", async () => {
    const value = "2026-01-30";
    const Component = () => {
      return <GoabDatePicker testId="date-picker" value={value} />;
    };

    const result = render(<Component />);
    const input = result.getByTestId("calendar-input");

    await vi.waitFor(() => {
      const inputEl = input.element() as HTMLInputElement;
      expect(inputEl.value).toBe("January 30, 2026");
    });
  });

  it("shows an error state", async () => {
    const value = "2026-03-01";

    const Component = () => {
      return <GoabDatePicker testId="date-picker" value={value} error={true} />;
    };

    const result = render(<Component />);
    const input = result.getByTestId("calendar-input");

    await vi.waitFor(() => {
      expect(input.element().getAttribute("aria-invalid")).toBe("true");
    });
  });

  it("passes the browser event in change detail", async () => {
    const handleChange = vi.fn();
    const selectedDate = new Date(2026, 2, 2);
    const formattedDate = format(selectedDate, "yyyy-MM-dd");

    const Component = () => {
      return (
        <GoabDatePicker
          name="event-date"
          testId="date-picker"
          value="2026-03-01"
          onChange={handleChange}
        />
      );
    };

    const result = render(<Component />);
    const input = result.getByTestId("calendar-input");
    const dateToSelect = result.getByTestId(formattedDate);

    await vi.waitFor(() => {
      expect(input).toBeVisible();
    });
    await userEvent.click(input);

    await vi.waitFor(() => {
      expect(dateToSelect).toBeVisible();
    });

    await userEvent.click(dateToSelect);

    await vi.waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      const detail = handleChange.mock.calls[0][0];
      expect(detail.name).toBe("event-date");
      expect(detail.valueStr).toBe(formattedDate);
      expect(detail.event).toBeInstanceOf(Event);
    });
  });

  describe("DatePicker Keyboard Navigation", () => {
    [
      {
        value: "2025-03-01",
        expected: "2025-02-28",
        formatted: "February 28, 2025",
        desc: "previous day",
        key: "{ArrowLeft}",
      },
      {
        value: "2025-03-01",
        expected: "2025-03-02",
        formatted: "March 2, 2025",
        desc: "next day",
        key: "{ArrowRight}",
      },
      {
        value: "2025-03-01",
        expected: "2025-02-22",
        formatted: "February 22, 2025",
        desc: "previous week",
        key: "{ArrowUp}",
      },
      {
        value: "2025-03-01",
        expected: "2025-03-08",
        formatted: "March 8, 2025",
        desc: "next week",
        key: "{ArrowDown}",
      },
      {
        value: "2025-03-01",
        expected: "2025-02-01",
        formatted: "February 1, 2025",
        desc: "previous month",
        key: "{PageUp}",
      },
      {
        value: "2025-03-01",
        expected: "2025-04-01",
        formatted: "April 1, 2025",
        desc: "next month",
        key: "{PageDown}",
      },
      {
        value: "2025-03-01",
        expected: "2024-03-01",
        formatted: "March 1, 2024",
        desc: "previous year",
        key: "{Shift>}{PageUp}",
      },
      {
        value: "2025-03-01",
        expected: "2026-03-01",
        formatted: "March 1, 2026",
        desc: "next year",
        key: "{Shift>}{PageDown}",
      },
    ].forEach(({ value, expected, formatted, desc, key }) => {
      it(`navigates to the ${desc} when ${key} is pressed`, async () => {
        const handleChange = vi.fn();
        const Component = () => {
          return (
            <GoabDatePicker
              testId="date-picker"
              value={value}
              onChange={(detail) => {
                handleChange(detail.valueStr);
              }}
            />
          );
        };

        const result = render(<Component />);
        const input = result.getByTestId("calendar-input");

        await vi.waitFor(() => {
          expect(input).toBeVisible();
        });
        await userEvent.type(input, key);

        await vi.waitFor(() => {
          const inputEl = input.element() as HTMLInputElement;
          expect(inputEl.value).toBe(formatted);
          expect(handleChange).toBeCalledWith(expected);
        });
      });
    });
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
      return (
        <GoabDatePicker testId="date-picker" disabled={true} onChange={handleChange} />
      );
    };

    const result = render(<Component />);
    const input = result.getByTestId("calendar-input");

    // verify input is disabled
    await vi.waitFor(() => {
      const inputEl = input.element() as HTMLInputElement;
      expect(inputEl.disabled).toBe(true);
    });
  });

  it("dispatches onFocus and onBlur when focus enters and leaves the calendar picker", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const Component = () => {
      return (
        <div>
          <button data-testid="before">Before</button>
          <GoabDatePicker
            name="event-date"
            testId="date-picker"
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <input data-testid="outside-input" />
        </div>
      );
    };

    const result = render(<Component />);
    const before = result.getByTestId("before");
    const input = result.getByTestId("calendar-input");
    const outside = result.getByTestId("outside-input");

    await vi.waitFor(() => {
      expect(input).toBeVisible();
    });

    await userEvent.click(before);
    await userEvent.tab();

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onFocus.mock.calls[0][0].name).toBe("event-date");
    });

    await userEvent.click(outside);

    await vi.waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
      expect(onBlur.mock.calls[0][0].name).toBe("event-date");
    });
  });

  describe("Width property", () => {
    it("applies custom width with px units", async () => {
      const Component = () => {
        return <GoabDatePicker testId="date-picker" width="400px" />;
      };

      const result = render(<Component />);
      const input = result.getByTestId("calendar-input");

      await vi.waitFor(() => {
        const inputEl = input.element() as HTMLInputElement;
        expect(inputEl.closest<HTMLElement>(".container")?.style.width).toBe("400px");
      });
    });

    it("applies custom width with ch units", async () => {
      const Component = () => {
        return <GoabDatePicker testId="date-picker" width="25ch" />;
      };

      const result = render(<Component />);
      const input = result.getByTestId("calendar-input");

      await vi.waitFor(() => {
        expect((input.element() as HTMLInputElement).style.width).toBe("26ch");
      });
    });

    it("uses default width when not specified", async () => {
      const Component = () => {
        return <GoabDatePicker testId="date-picker" />;
      };

      const result = render(<Component />);
      const input = result.getByTestId("calendar-input");

      await vi.waitFor(() => {
        expect((input.element() as HTMLInputElement).style.width).toBe("17ch");
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
        const inputEl = input.element() as HTMLInputElement;
        const inputHost = (inputEl.getRootNode() as ShadowRoot).host as HTMLElement;
        const percentageWrapper = inputHost.parentElement?.parentElement;

        expect(percentageWrapper?.style.width).toBe("80%");
        expect(inputEl.closest<HTMLElement>(".container")?.style.width).toBe("100%");
      });
    });

    it("maintains minimum width to ensure date display", async () => {
      const Component = () => {
        return <GoabDatePicker testId="date-picker" width="20ch" value="2026-03-01" />;
      };

      const result = render(<Component />);
      const input = result.getByTestId("calendar-input");

      await vi.waitFor(() => {
        const inputEl = input.element() as HTMLInputElement;

        expect(inputEl.value).toBe("March 1, 2026");
        expect(inputEl.style.width).toBe("21ch");
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
    const datePickerMonthJanuary = result.getByTestId("dropdown-item-1");
    const datePickerMonthMarch = result.getByTestId("dropdown-item-3");
    const datePickerDay = result.getByTestId("input-day");
    const datePickerYear = result.getByTestId("input-year");

    const rootElChangeHandler = vi.fn();
    result.container.addEventListener("_change", (e: Event) => {
      const ce = e as CustomEvent;
      rootElChangeHandler(ce.detail.valueStr);
    });

    // Select month
    await userEvent.click(datePickerMonth);
    await vi.waitFor(() => {
      expect(datePickerMonthJanuary).toBeVisible();
    });
    await userEvent.click(datePickerMonthJanuary);

    // should be null because date is invalid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith("");
    });
    rootElChangeHandler.mockClear();

    // Input day
    await userEvent.click(datePickerDay);
    await userEvent.type(datePickerDay, "1");

    // Select month
    await userEvent.click(datePickerMonth);
    await vi.waitFor(() => {
      expect(datePickerMonthMarch).toBeVisible();
    });
    await userEvent.click(datePickerMonthMarch);

    // should be null because date is still invalid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith("");
    });
    rootElChangeHandler.mockClear();

    // Input year
    await userEvent.click(datePickerYear);
    await userEvent.type(datePickerYear, "1999");

    // should not be null because date became valid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith("1999-03-01");
    });
    rootElChangeHandler.mockClear();

    // Clear day input
    await userEvent.clear(datePickerDay);

    // should be null because date became invalid
    await vi.waitFor(() => {
      expect(rootElChangeHandler).toHaveBeenCalledWith("");
    });
    rootElChangeHandler.mockClear();
  });

  it("dispatches onFocus once across fields and onBlur only once focus leaves all of them", async () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();

    const Component = () => {
      return (
        <div>
          <button data-testid="before-input">Before</button>
          <GoabDatePicker
            type="input"
            name="datePickerInputType"
            testId="datePicker"
            onFocus={onFocus}
            onBlur={onBlur}
          />
          <input data-testid="outside-input" />
        </div>
      );
    };

    render(<Component />);
    const before = page.getByTestId("before-input");
    const datePickerDay = page.getByTestId("input-day");
    const datePickerYear = page.getByTestId("input-year");
    const outside = page.getByTestId("outside-input");

    await vi.waitFor(() => {
      expect(before).toBeVisible();
      expect(datePickerDay).toBeVisible();
      expect(datePickerYear).toBeVisible();
    });

    await userEvent.click(before);
    await userEvent.tab();

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    // Moving focus between the date picker's own fields should not re-fire onFocus or fire onBlur.
    await userEvent.click(datePickerDay);
    await userEvent.click(datePickerYear);

    await vi.waitFor(() => {
      expect(onFocus).toHaveBeenCalledTimes(1);
      expect(onBlur).not.toHaveBeenCalled();
    });

    await userEvent.click(outside);

    await vi.waitFor(() => {
      expect(onBlur).toHaveBeenCalledTimes(1);
    });
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

    const monthInput = result.getByTestId("input-month").getByTestId("input");
    const datePickerDay = result.getByTestId("input-day");
    const datePickerYear = result.getByTestId("input-year");

    await vi.waitFor(() => {
      expect(monthInput).toBeDisabled();
      expect(datePickerDay).toBeDisabled();
      expect(datePickerYear).toBeDisabled();
    });
  });
});

describe("DatePicker calendar popover position", () => {
  beforeAll(async () => {
    await page.viewport(1280, 800);
  });

  it("opens the calendar left-aligned when there is room on the right", async () => {
    const Component = () => (
      <div
        data-testid="left-alignment-case"
        style={{ position: "absolute", top: 0, left: "100px" }}
      >
        <GoabDatePicker testId="date-picker" value="2026-03-01" />
      </div>
    );

    render(<Component />);
    const testCase = page.getByTestId("left-alignment-case");
    const input = testCase.getByTestId("calendar-input");
    // The calendar contains month/year dropdowns with their own nested popovers,
    // so take the first (outermost) popover parts: the calendar's own.
    const popoverContent = testCase.getByTestId("popover-content").first();
    const popoverTarget = testCase.getByTestId("popover-target").first();

    // Wait for the popover to be mounted before clicking: on a slow run a click
    // that lands before the popover's wiring is live does nothing.
    await vi.waitFor(() => {
      expect(popoverTarget).toBeVisible();
    });
    await userEvent.click(input);

    await vi.waitFor(() => {
      expect(popoverContent).toBeVisible();
      const content = popoverContent.element().getBoundingClientRect();
      const target = popoverTarget.element().getBoundingClientRect();
      // Left-aligned: the calendar opens at the input's left edge
      expect(Math.abs(content.left - target.left)).toBeLessThanOrEqual(2);
    });
  });

  it("opens the calendar right-aligned at full width when squeezed against the screen edge - issue 3860", async () => {
    // Pin the date picker near the right edge (fully on screen). Left-aligned, the
    // calendar would be clipped by the screen and forced narrow. It should open
    // leftward instead, aligning its right edge to its trigger to keep full width.
    const Component = () => (
      <div
        data-testid="right-alignment-case"
        style={{ position: "absolute", top: 0, left: "1000px" }}
      >
        <GoabDatePicker testId="date-picker" value="2026-03-01" />
      </div>
    );

    render(<Component />);
    const testCase = page.getByTestId("right-alignment-case");
    const input = testCase.getByTestId("calendar-input");
    // The calendar contains month/year dropdowns with their own nested popovers,
    // so take the first (outermost) popover parts: the calendar's own.
    const popoverContent = testCase.getByTestId("popover-content").first();
    const popoverTarget = testCase.getByTestId("popover-target").first();

    // Wait for the popover to be mounted before clicking: on a slow run a click
    // that lands before the popover's wiring is live does nothing.
    await vi.waitFor(() => {
      expect(popoverTarget).toBeVisible();
    });
    await userEvent.click(input);

    await vi.waitFor(() => {
      expect(popoverContent).toBeVisible();
      const content = popoverContent.element().getBoundingClientRect();
      const target = popoverTarget.element().getBoundingClientRect();
      // Right-aligned: the calendar's right edge meets its trigger's right edge and
      // the calendar stays fully on screen at its natural width.
      expect(Math.abs(content.right - target.right)).toBeLessThanOrEqual(5);
      expect(content.right).toBeLessThanOrEqual(window.innerWidth);
    });
  });
});
