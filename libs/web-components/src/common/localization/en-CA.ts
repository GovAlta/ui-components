import type { Translations } from "./types";

export const enCAMessages: Translations = {
  calendar: {
    month: "Month",
    year: "Year",
    dayFormat: "Day (DD)",
    yearFormat: "Year (YYYY)",
    selectMonth: "—Select a month—",
    selectMonthCompact: "—Month—",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    weekdays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    monthAriaLabel: (name) => `${name} month`,
    yearAriaLabel: (name) => `${name} year`,
  },
};
