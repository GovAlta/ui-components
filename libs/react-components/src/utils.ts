export function fromOptionalBoolean(
  value?: boolean,
  settings: { omitIfFalse?: boolean } = {},
): string | undefined {
  return typeof value === "undefined"
    ? undefined
    : value
      ? "true"
      : settings.omitIfFalse
        ? undefined
        : "false";
}
