export function toBoolean(value: string): boolean {
  // this is how false will need to be represented
  if (value === "false") {
    return false;
  }
  // for element props empty strings are also a true value
  // ex. <input type="text" disabled />  /* is a disabled input */
  if (value === "") {
    return true
  }

  return !!value;
}

export function fromBoolean(value: boolean): string {
  return value ? "true" : "false";
}
