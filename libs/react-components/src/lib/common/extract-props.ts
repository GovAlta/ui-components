/**
 * Transform function type for converting prop names to attribute names.
 */
export type TransformFn = (input: string) => string;

/**
 * Converts a camelCase string to lowercase (e.g., "headingSize" -> "headingsize")
 */
export const lowercase: TransformFn = (input) => input.toLowerCase();

/**
 * Converts a camelCase string to kebab-case (e.g., "verticalPosition" -> "vertical-position")
 */
export const kebab: TransformFn = (input) =>
  input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

/**
 * Transforms React props to web component attributes.
 * Use object destructuring to extract props that need special handling,
 * then pass the rest through this function.
 *
 * @param props - The remaining props after destructuring
 * @param transform - Transform function (lowercase or kebab), defaults to lowercase
 * @returns Converted props ready to spread on the web component
 *
 * @example
 * export function GoabAccordion({open, onChange, headingContent, children, ...rest}: GoabAccordionProps) {
 *   const _props = transformProps<WCProps>(rest, lowercase);
 *   return (
 *     <goa-accordion open={open ? "true" : undefined} {..._props}>
 *       {children}
 *     </goa-accordion>
 *   );
 * }
 */
export function transformProps<WC = Record<string, unknown>>(
  props: object,
  transform: TransformFn = lowercase,
): WC {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(props)) {
    // Skip undefined values - they shouldn't be passed to web components
    if (value === undefined) continue;

    // Data attributes pass through unchanged
    if (key.startsWith("data-")) {
      result[key] = value;
    } else {
      result[transform(key)] = value;
    }
  }

  return result as WC;
}
