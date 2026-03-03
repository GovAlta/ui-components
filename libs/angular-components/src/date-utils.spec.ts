import { formatDate } from "./date-utils";

describe("formatDate", () => {
  it("should format date as YYYY-MM-DD", () => {
    const date = new Date(2024, 0, 5); // January 5, 2024
    expect(formatDate(date)).toBe("2024-01-05");
  });

  it("should pad month and day with zeros", () => {
    const date = new Date(2024, 8, 9); // September 9, 2024
    expect(formatDate(date)).toBe("2024-09-09");
  });

  it("should render the values in local timezone", () => {
    // Create a date that is January 2, 2024 in UTC, which will still be
    // January 1, 2024 in Mountain timezones
    const date = new Date(`2024-01-02T00:00:00Z`); // January 2, 2024 in UTC
    expect(formatDate(date)).toBe("2024-01-01");
  });
});
