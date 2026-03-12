import { describe, it, expect } from "vitest";
import { CalendarDate } from "./calendar-date";

describe("CalendarDate", () => {
  describe("parse", () => {
    it("parses a string date in YYYY-MM-DD format", () => {
      const result = CalendarDate.parse("2024-03-15");
      expect(result).toEqual([2024, 3, 15]);
    });

    it("parses a string date with ISO timestamp", () => {
      const result = CalendarDate.parse("2024-03-15T10:30:00Z");
      expect(result).toEqual([2024, 3, 15]);
    });

    it("parses a Date object", () => {
      const date = new Date(2024, 2, 15); // Month is 0-indexed
      const result = CalendarDate.parse(date);
      expect(result).toEqual([2024, 3, 15]); // Month is 1-indexed in result
    });

    it("parses an object with year, month, day", () => {
      const result = CalendarDate.parse({ year: 2024, month: 3, day: 15 });
      expect(result).toEqual([2024, 3, 15]);
    });
  });

  describe("constructor", () => {
    it("creates a CalendarDate from a string", () => {
      const calDate = new CalendarDate("2024-03-15");
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(3);
      expect(calDate.day).toBe(15);
    });

    it("creates a CalendarDate from a Date object", () => {
      const date = new Date(2024, 2, 15);
      const calDate = new CalendarDate(date);
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(3);
      expect(calDate.day).toBe(15);
    });

    it("creates a CalendarDate from an object", () => {
      const calDate = new CalendarDate({ year: 2024, month: 3, day: 15 });
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(3);
      expect(calDate.day).toBe(15);
    });

    it("creates a CalendarDate with current date when no value provided", () => {
      const calDate = new CalendarDate();
      const now = new Date();
      expect(calDate.year).toBe(now.getFullYear());
      expect(calDate.month).toBe(now.getMonth() + 1);
      expect(calDate.day).toBe(now.getDate());
    });
  });

  describe("getters", () => {
    const calDate = new CalendarDate("2024-03-15");

    it("returns the year", () => {
      expect(calDate.year).toBe(2024);
    });

    it("returns the month", () => {
      expect(calDate.month).toBe(3);
    });

    it("returns the day", () => {
      expect(calDate.day).toBe(15);
    });

    it("returns the date as a Date object", () => {
      const date = calDate.date;
      expect(date).toBeInstanceOf(Date);
      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(2); // 0-indexed
      expect(date.getDate()).toBe(15);
    });

    it("returns the day of week", () => {
      // March 15, 2024 is a Friday (5)
      expect(calDate.dayOfWeek).toBe(5);
    });

    it("returns the number of days in the month", () => {
      // March has 31 days
      expect(calDate.daysInMonth).toBe(31);
    });

    it("returns the first day of the month", () => {
      const firstDay = calDate.firstDayOfMonth;
      expect(firstDay.year).toBe(2024);
      expect(firstDay.month).toBe(3);
      expect(firstDay.day).toBe(1);
    });

    it("returns the last day of the month", () => {
      const lastDay = calDate.lastDayOfMonth;
      expect(lastDay.year).toBe(2024);
      expect(lastDay.month).toBe(3);
      expect(lastDay.day).toBe(31);
    });

    it("returns the previous day", () => {
      const prevDay = calDate.previousDay;
      expect(prevDay.year).toBe(2024);
      expect(prevDay.month).toBe(3);
      expect(prevDay.day).toBe(14);
    });

    it("returns the next day", () => {
      const nextDay = calDate.nextDay;
      expect(nextDay.year).toBe(2024);
      expect(nextDay.month).toBe(3);
      expect(nextDay.day).toBe(16);
    });

    it("returns the previous month", () => {
      const prevMonth = calDate.previousMonth;
      expect(prevMonth.year).toBe(2024);
      expect(prevMonth.month).toBe(2);
      expect(prevMonth.day).toBe(15);
    });

    it("returns the next month", () => {
      const nextMonth = calDate.nextMonth;
      expect(nextMonth.year).toBe(2024);
      expect(nextMonth.month).toBe(4);
      expect(nextMonth.day).toBe(15);
    });
  });

  describe("setters", () => {
    it("sets the year", () => {
      const calDate = new CalendarDate("2024-03-15");
      calDate.setYear(2025);
      expect(calDate.year).toBe(2025);
      expect(calDate.month).toBe(3);
      expect(calDate.day).toBe(15);
    });

    it("sets the month", () => {
      const calDate = new CalendarDate("2024-03-15");
      calDate.setMonth(6);
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(6);
      expect(calDate.day).toBe(15);
    });

    it("sets the day and returns the instance", () => {
      const calDate = new CalendarDate("2024-03-15");
      const result = calDate.setDay(20);
      expect(result).toBe(calDate);
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(3);
      expect(calDate.day).toBe(20);
    });
  });

  describe("addYears", () => {
    it("adds positive years", () => {
      const calDate = new CalendarDate("2024-03-15");
      calDate.addYears(2);
      expect(calDate.year).toBe(2026);
      expect(calDate.month).toBe(3);
      expect(calDate.day).toBe(15);
    });

    it("adds negative years", () => {
      const calDate = new CalendarDate("2024-03-15");
      calDate.addYears(-2);
      expect(calDate.year).toBe(2022);
      expect(calDate.month).toBe(3);
      expect(calDate.day).toBe(15);
    });

    it("returns the instance for chaining", () => {
      const calDate = new CalendarDate("2024-03-15");
      const result = calDate.addYears(1);
      expect(result).toBe(calDate);
    });
  });

  describe("addMonths", () => {
    it("adds positive months within the same year", () => {
      const calDate = new CalendarDate("2024-03-15");
      calDate.addMonths(2);
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(5);
      expect(calDate.day).toBe(15);
    });

    it("adds positive months across years", () => {
      const calDate = new CalendarDate("2024-11-15");
      calDate.addMonths(3);
      expect(calDate.year).toBe(2025);
      expect(calDate.month).toBe(2);
      expect(calDate.day).toBe(15);
    });

    it("adds negative months", () => {
      const calDate = new CalendarDate("2024-03-15");
      calDate.addMonths(-2);
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(1);
      expect(calDate.day).toBe(15);
    });

    it("handles month overflow correctly", () => {
      const calDate = new CalendarDate("2024-01-31");
      calDate.addMonths(1);
      // January 31 + 1 month = February 29, 2024 (leap year)
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(2);
      expect(calDate.day).toBe(29);
    });

    it("returns the instance for chaining", () => {
      const calDate = new CalendarDate("2024-03-15");
      const result = calDate.addMonths(1);
      expect(result).toBe(calDate);
    });
  });

  describe("addDays", () => {
    it("adds positive days within the same month", () => {
      const calDate = new CalendarDate("2024-03-15");
      calDate.addDays(5);
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(3);
      expect(calDate.day).toBe(20);
    });

    it("adds positive days across months", () => {
      const calDate = new CalendarDate("2024-03-29");
      calDate.addDays(5);
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(4);
      expect(calDate.day).toBe(3);
    });

    it("adds positive days across years", () => {
      const calDate = new CalendarDate("2024-12-30");
      calDate.addDays(5);
      expect(calDate.year).toBe(2025);
      expect(calDate.month).toBe(1);
      expect(calDate.day).toBe(4);
    });

    it("adds negative days", () => {
      const calDate = new CalendarDate("2024-03-15");
      calDate.addDays(-5);
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(3);
      expect(calDate.day).toBe(10);
    });

    it("adds negative days across months", () => {
      const calDate = new CalendarDate("2024-03-02");
      calDate.addDays(-5);
      expect(calDate.year).toBe(2024);
      expect(calDate.month).toBe(2);
      expect(calDate.day).toBe(26);
    });

    it("returns the instance for chaining", () => {
      const calDate = new CalendarDate("2024-03-15");
      const result = calDate.addDays(1);
      expect(result).toBe(calDate);
    });
  });

  describe("comparison methods", () => {
    describe("isSameDay", () => {
      it("returns true for the same day", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2024-03-15");
        expect(date1.isSameDay(date2)).toBe(true);
      });

      it("returns false for different days", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2024-03-16");
        expect(date1.isSameDay(date2)).toBe(false);
      });

      it("returns false for same day in different months", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2024-04-15");
        expect(date1.isSameDay(date2)).toBe(false);
      });
    });

    describe("isSameMonth", () => {
      it("returns true for the same month", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2024-03-20");
        expect(date1.isSameMonth(date2)).toBe(true);
      });

      it("returns false for different months", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2024-04-15");
        expect(date1.isSameMonth(date2)).toBe(false);
      });

      it("returns false for same month in different years", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2025-03-15");
        expect(date1.isSameMonth(date2)).toBe(false);
      });
    });

    describe("isBefore", () => {
      it("returns true when date is before comparison date", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2024-03-20");
        expect(date1.isBefore(date2)).toBe(true);
      });

      it("returns false when date is after comparison date", () => {
        const date1 = new CalendarDate("2024-03-20");
        const date2 = new CalendarDate("2024-03-15");
        expect(date1.isBefore(date2)).toBe(false);
      });

      it("returns false when dates are the same", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2024-03-15");
        expect(date1.isBefore(date2)).toBe(false);
      });
    });

    describe("isAfter", () => {
      it("returns true when date is after comparison date", () => {
        const date1 = new CalendarDate("2024-03-20");
        const date2 = new CalendarDate("2024-03-15");
        expect(date1.isAfter(date2)).toBe(true);
      });

      it("returns false when date is before comparison date", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2024-03-20");
        expect(date1.isAfter(date2)).toBe(false);
      });

      it("returns false when dates are the same", () => {
        const date1 = new CalendarDate("2024-03-15");
        const date2 = new CalendarDate("2024-03-15");
        expect(date1.isAfter(date2)).toBe(false);
      });
    });
  });

  describe("clone", () => {
    it("creates a new instance with the same date", () => {
      const original = new CalendarDate("2024-03-15");
      const cloned = original.clone();

      expect(cloned).not.toBe(original);
      expect(cloned.year).toBe(original.year);
      expect(cloned.month).toBe(original.month);
      expect(cloned.day).toBe(original.day);
    });

    it("creates an independent instance", () => {
      const original = new CalendarDate("2024-03-15");
      const cloned = original.clone();

      cloned.addDays(5);

      expect(original.day).toBe(15);
      expect(cloned.day).toBe(20);
    });
  });

  describe("isValid", () => {
    it("returns true for a valid date", () => {
      const calDate = new CalendarDate("2024-03-15");
      expect(calDate.isValid()).toBe(true);
    });

    it("returns true for edge case dates", () => {
      const leapDay = new CalendarDate("2024-02-29");
      expect(leapDay.isValid()).toBe(true);
    });
  });

  describe("format", () => {
    it("formats the date using date-fns format string", () => {
      const calDate = new CalendarDate("2024-03-15");
      expect(calDate.format("yyyy-MM-dd")).toBe("2024-03-15");
    });

    it("formats with different patterns", () => {
      const calDate = new CalendarDate("2024-03-15");
      expect(calDate.format("MMM d, yyyy")).toBe("Mar 15, 2024");
    });

    it("formats with full month name", () => {
      const calDate = new CalendarDate("2024-03-15");
      expect(calDate.format("MMMM d, yyyy")).toBe("March 15, 2024");
    });
  });

  describe("toString", () => {
    it("returns the date as hyphen-separated values", () => {
      const calDate = new CalendarDate({ year: 2024, month: 3, day: 15 });
      const result = calDate.toString();
      expect(result).toBe("2024-03-15");
    });

    it("can be used to create a new CalendarDate", () => {
      const original = new CalendarDate({ year: 2024, month: 3, day: 15 });
      const str = original.toString();
      const cloned = new CalendarDate(str);
      expect(cloned.year).toBe(original.year);
      expect(cloned.month).toBe(original.month);
      expect(cloned.day).toBe(original.day);
    });
  });

  describe("edge cases", () => {
    it("handles leap year correctly", () => {
      const leapDay = new CalendarDate("2024-02-29");
      expect(leapDay.daysInMonth).toBe(29);
      expect(leapDay.isValid()).toBe(true);
    });

    it("handles non-leap year correctly", () => {
      const feb2023 = new CalendarDate("2023-02-15");
      expect(feb2023.daysInMonth).toBe(28);
    });

    it("handles month boundaries when adding days", () => {
      const endOfMonth = new CalendarDate("2024-01-31");
      endOfMonth.addDays(1);
      expect(endOfMonth.month).toBe(2);
      expect(endOfMonth.day).toBe(1);
    });

    it("handles year boundaries when adding months", () => {
      const endOfYear = new CalendarDate("2024-12-15");
      endOfYear.addMonths(1);
      expect(endOfYear.year).toBe(2025);
      expect(endOfYear.month).toBe(1);
    });

    it("handles chaining multiple operations", () => {
      const calDate = new CalendarDate("2024-03-15");
      calDate.addYears(1).addMonths(2).addDays(5);
      expect(calDate.year).toBe(2025);
      expect(calDate.month).toBe(5);
      expect(calDate.day).toBe(20);
    });
  });
});
