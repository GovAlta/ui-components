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

export function typeValidator(
  message: string,
  values: string[],
  required = false,
): [string[], (value: string) => void] {
  const validator = (value: string): void => {
    if (!required && !value) {
      return;
    }
    if (!values.includes(value)) {
      console.error(`[${value}] is an invalid ${message.toLowerCase()}`);
    }
  };
  return [values, validator];
}
