/**
 * Calendar Component Configurations
 *
 * Calendar displays dates for selection.
 */

import type { ComponentConfigurations } from "./types";

const reactCalendarSetup = `const handleDateChange = (detail: GoabCalendarOnChangeDetail) => {
  // Handle the selected date (detail.value is the date string)
};`;

const angularCalendarSetup = `export class SomeOtherComponent {
  handleDateChange(event: GoabCalendarOnChangeDetail) {
    // Handle the selected date (event.value is the date string)
  }
}`;

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
        react: {
          ts: reactCalendarSetup,
          jsx: `<GoabCalendar name="calendar" onChange={handleDateChange} />`,
        },
        angular: {
          ts: angularCalendarSetup,
          template: `<goab-calendar name="calendar" (onChange)="handleDateChange($event)"></goab-calendar>`,
        },
        webComponents: `<goa-calendar version="2" name="calendar"></goa-calendar>`,
      },
    },
    {
      id: "with-value",
      name: "With selected date",
      description: "Calendar with preset selection",
      code: {
        react: {
          ts: reactCalendarSetup,
          jsx: `<GoabCalendar name="calendar" value="2024-06-15" onChange={handleDateChange} />`,
        },
        angular: {
          ts: angularCalendarSetup,
          template: `<goab-calendar name="calendar" value="2024-06-15" (onChange)="handleDateChange($event)"></goab-calendar>`,
        },
        webComponents: `<goa-calendar version="2" name="calendar" value="2024-06-15"></goa-calendar>`,
      },
    },
    {
      id: "with-range",
      name: "Date range",
      description: "Calendar with min/max dates",
      code: {
        react: {
          ts: reactCalendarSetup,
          jsx: `<GoabCalendar
  name="booking"
  min="2024-01-01"
  max="2024-12-31"
  onChange={handleDateChange}
/>`,
        },
        angular: {
          ts: angularCalendarSetup,
          template: `<goab-calendar
  name="booking"
  min="2024-01-01"
  max="2024-12-31"
  (onChange)="handleDateChange($event)">
</goab-calendar>`,
        },
        webComponents: `<goa-calendar version="2"
  name="booking"
  min="2024-01-01"
  max="2024-12-31">
</goa-calendar>`,
      },
    },
  ],
};
