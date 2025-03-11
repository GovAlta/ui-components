export function fromOptionalBoolean(value?: boolean): string | undefined {
  return typeof value === 'undefined' ? undefined : value ? "true" : "false";
}
