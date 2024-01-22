export function toBoolean(value: string): boolean {
  // this is how false will need to be represented
  if (value === "false") {
    return false;
  }
  // for element props empty strings are also a true value
  // ex. <input type="text" disabled />  /* is a disabled input */
  if (value === "") {
    return true;
  }
  return !!value;
}

export function fromBoolean(value: boolean): string {
  return value ? "true" : "false";
}

export function isValidDate(d: Date): boolean {
  return !isNaN(d.getDate());
}

export function validateRequired(componentName: string, props: Record<string, unknown>) {
  Object.entries(props).forEach(prop => {
    if (!prop[1]) {
      console.warn(`${componentName}: ${prop[0]} is required`);
    }
  });
}

// To avoid console errors due to late binding, we need to use setTimeout before calling typeValidator
export function typeValidator(
  message: string,
  values: string[],
  required = false,
): [string[], (value: string | null) => void] {
  const validator = (value: string | null): void => {
    if (!required && !value) {
      return;
    }
    if (required && !value) {
      console.error(`[${value}] is an invalid ${message.toLowerCase()}`);
      return;
    }
    if (!values.includes(value || "")) {
      console.error(`[${value}] is an invalid ${message.toLowerCase()}`);
    }
  };
  return [values, validator];
}

export function getTimestamp(val?: Date) {
  const months = [
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
  ];
  const now = val || new Date();
  const hour24 = now.getHours();
  const min0 = now.getMinutes();

  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hour = (hour24 === 0 && 12) || (hour24 > 12 && hour24 - 12) || hour24;
  const meridium = (hour24 === 0 && "AM") || (hour24 >= 12 && "PM") || "AM";
  const min = (min0 < 10 && `0${min0}`) || min0;
  const ordinal =
    (date % 10 === 1 && date !== 11 && "st") ||
    (date % 10 === 2 && date !== 12 && "nd") ||
    (date % 10 === 3 && date !== 13 && "rd") ||
    "th";

  return `${month} ${date}${ordinal} ${year}, ${hour}:${min} ${meridium}`;
}

export function cssVar(name: string, value: string | number): string {
  return value ? `${name}: ${value};` : "";
}

export function pluralize(word: string, count: number) {
  if (count === 1) return word;
  return `${word}s`;
}

export function clamp(value: number, min: number, max: number): number {
  return value > max
    ? max
    : value < min
      ? min
      : value
}
