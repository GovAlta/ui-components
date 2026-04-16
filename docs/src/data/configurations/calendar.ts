/**
 * Calendar Component Configurations
 *
 * Calendar displays dates for selection.
 */

import type { ComponentConfigurations } from "./types";

export const calendarConfigurations: ComponentConfigurations = {
  componentSlug: "calendar",
  componentName: "Calendar",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic calendar",
      description: "Simple date calendar",
      code: {
        react: `<GoabCalendar name="calendar" onChange={handleDateChange} />`,
        angular: `<goab-calendar name="calendar" (onChange)="handleDateChange($event)"></goab-calendar>`,
        webComponents: `<goa-calendar version="2" name="calendar"></goa-calendar>`,
      },
    },
    {
      id: "with-value",
      name: "With selected date",
      description: "Calendar with preset selection",
      code: {
        react: `<GoabCalendar name="calendar" value="2024-06-15" onChange={handleDateChange} />`,
        angular: `<goab-calendar name="calendar" value="2024-06-15" (onChange)="handleDateChange($event)"></goab-calendar>`,
        webComponents: `<goa-calendar version="2" name="calendar" value="2024-06-15"></goa-calendar>`,
      },
    },
    {
      id: "with-range",
      name: "Date range",
      description: "Calendar with min/max dates",
      code: {
        react: `<GoabCalendar
  name="booking"
  min="2024-01-01"
  max="2024-12-31"
  onChange={handleDateChange}
/>`,
        angular: `<goab-calendar
  name="booking"
  min="2024-01-01"
  max="2024-12-31"
  (onChange)="handleDateChange($event)">
</goab-calendar>`,
        webComponents: `<goa-calendar version="2"
  name="booking"
  min="2024-01-01"
  max="2024-12-31">
</goa-calendar>`,
      },
    },
  ],
};
