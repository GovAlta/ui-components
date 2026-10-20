export const SUPPORTED_LANGUAGES = ["en-CA", "fr-CA"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export interface Translations {
  calendar: {
    month: string;
    year: string;
    dayFormat: string;
    yearFormat: string;
    selectMonth: string;
    selectMonthCompact: string;
    months: readonly string[];
    weekdays: readonly string[];
    monthAriaLabel: (name: string) => string;
    yearAriaLabel: (name: string) => string;
  };
}
