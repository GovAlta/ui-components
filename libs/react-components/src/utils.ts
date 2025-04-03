export function toOptionalBoolean(
  value?: boolean,
  settings: { omitIfFalse?: boolean } = {},
): boolean | undefined {
  return typeof value === "undefined"
    ? undefined
    : value
      ? true
      : settings.omitIfFalse
        ? undefined
        : false;
}

export function toOptionalBooleanAsString(
  value?: boolean,
  settings: { omitIfFalse?: boolean } = {},
): string | undefined {
	return toOptionalBoolean(value, settings)?.toString();
}
