export type TransformFn = (input: string) => string;

export const lowercase: TransformFn = (input) => input.toLowerCase();

export const kebab: TransformFn = (input) =>
  input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

export function transformProps<WC = Record<string, unknown>>(
  props: object,
  transform: TransformFn = lowercase
): WC {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(props)) {
    if (value === undefined) continue;
    if (key.startsWith("data-")) {
      result[key] = value;
    } else {
      result[transform(key)] = value;
    }
  }
  return result as WC;
}
