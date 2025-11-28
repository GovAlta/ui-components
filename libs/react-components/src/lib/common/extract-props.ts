/**
 * Props that are always excluded from web component attributes.
 * These are React-specific props that should never be passed to web components.
 */
const ALWAYS_EXCLUDED_PROPS = ["children", "ref"];

export type AttributeMapping = "lowercase" | "kebab";

export interface ExtractPropsOptions {
  /**
   * Props to exclude from the converted output.
   * Note: "children" and "ref" are always excluded automatically.
   */
  exclude?: string[];

  /**
   * How to convert prop names to attribute names.
   * - "lowercase": headingSize -> headingsize (default, for most components)
   * - "kebab": verticalPosition -> vertical-position (for components with explicit attribute mappings)
   */
  attributeMapping?: AttributeMapping;
}

/**
 * Converts a camelCase string to lowercase (e.g., "headingSize" -> "headingsize")
 */
function camelToLower(str: string): string {
  return str.toLowerCase();
}

/**
 * Converts a camelCase string to kebab-case (e.g., "verticalPosition" -> "vertical-position")
 */
function camelToKebab(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Extracts and converts React props to web component attributes.
 *
 * This function handles the conversion of React camelCase props to the appropriate
 * web component attribute format, while separating out props that need special handling.
 * Data-grid props (data-grid, data-grid-*, etc.) are passed through unchanged.
 *
 * @param props - The React component props
 * @param options - Configuration options
 * @returns Converted props ready to spread on the web component
 *
 * @example
 * // For accordion (uses lowercase attributes)
 * const _props = extractProps<WCProps>(props, {
 *   exclude: ["open", "onChange"],
 * });
 *
 * // For temporary-notification-ctrl (uses kebab-case attributes)
 * const _props = extractProps<WCProps>(props, {
 *   exclude: ["testId"],
 *   attributeMapping: "kebab"
 * });
 */
export function extractProps<WC = Record<string, any>>(
  props: Record<string, any>,
  options: ExtractPropsOptions = {}
): WC {
  const { exclude = [], attributeMapping = "lowercase" } = options;
  const excludeSet = new Set([
    ...ALWAYS_EXCLUDED_PROPS,
    ...(exclude as string[]),
  ]);

  const _props: Record<string, any> = {};

  const convertKey =
    attributeMapping === "kebab" ? camelToKebab : camelToLower;

  Object.entries(props).forEach(([key, value]) => {
    // Handle excluded props - skip them (access via props directly)
    if (excludeSet.has(key)) {
      return;
    }

    // Skip undefined values - they shouldn't be passed to web components
    if (value === undefined) {
      return;
    }

    // Data-grid props pass through unchanged
    if (key.startsWith("data-")) {
      _props[key] = value;
      return;
    }

    // Convert and add to _props
    const convertedKey = convertKey(key);
    _props[convertedKey] = value;
  });

  return _props as WC;
}
