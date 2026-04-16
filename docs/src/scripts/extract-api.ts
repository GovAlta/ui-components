/**
 * Component API Extraction Script
 *
 * Extracts props, events, and slots from Svelte component files and outputs
 * structured JSON matching the content model spec defined in Brief 1.
 *
 * Usage:
 *   npx tsx src/scripts/extract-api.ts button           # Extract single component
 *   npx tsx src/scripts/extract-api.ts button input     # Extract multiple components
 *   npx tsx src/scripts/extract-api.ts --all            # Extract all components
 *
 * Output: JSON files in docs/generated/component-apis/
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

// =============================================================================
// Configuration
// =============================================================================

// Resolve paths relative to the workspace root (ui-components/)
// This script lives at docs/src/scripts/ — three levels below the workspace root
const WORKSPACE_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);
const UI_COMPONENTS_PATH = path.join(
  WORKSPACE_ROOT,
  "libs/web-components/src/components",
);
const OUTPUT_PATH = path.join(WORKSPACE_ROOT, "docs/generated/component-apis");

// =============================================================================
// Output Types (matching content model spec)
// =============================================================================

interface ExtractedProp {
  name: string;
  type: string;
  typeLabel?: string; // TypeScript type name (e.g., "GoabButtonType")
  values?: string[]; // Allowed values for union types
  required: boolean;
  default: string | null;
  description: string; // From JSDoc comments in source (empty if not documented)
  deprecated?: boolean; // True if JSDoc has @deprecated tag
}

interface ExtractedEvent {
  name: string;
  type: string;
  description: string; // Empty - filled by human content
  frameworks: ("react" | "angular" | "web-component")[];
}

interface ExtractedSlot {
  name: string;
  description: string; // Empty - filled by human content
}

interface ExtractedComponentAPI {
  componentSlug: string;
  extractedFrom: string;
  props: ExtractedProp[];
  events: ExtractedEvent[];
  slots: ExtractedSlot[];
}

// =============================================================================
// Internal Parsing Types
// =============================================================================

interface ValidatorInfo {
  values: string[];
  deprecated?: string[];
  typeName?: string;
}

interface ParsedPropRaw {
  name: string;
  rawName: string;
  type: string;
  typeLabel?: string;
  values?: string[];
  required: boolean;
  default: string | null;
  isBooleanProp: boolean;
  description: string;
  deprecated: boolean;
}

// =============================================================================
// JSDoc Parser
// =============================================================================

interface JSDocInfo {
  description: string;
  required: boolean;
  internal: boolean;
  deprecated: boolean;
}

/**
 * Builds a map of prop names to their JSDoc info (description + required flag).
 * Scans through content looking for JSDoc comments immediately preceding export let statements.
 */
function buildJSDocMap(content: string): Map<string, JSDocInfo> {
  const jsDocMap = new Map<string, JSDocInfo>();

  // Pattern matches a single JSDoc comment followed directly by export let statement.
  // Uses [^*] and \*[^/] to match content within /** ... */ without crossing
  // into the next comment block (prevents file-level JSDoc from leaking into props).
  // Group 1: JSDoc content (between /** and */)
  // Group 2: prop name
  const pattern = /\/\*\*\s*((?:[^*]|\*(?!\/))*?)\s*\*\/\s*\n\s*export\s+let\s+(\w+)/g;

  let match;
  while ((match = pattern.exec(content)) !== null) {
    const rawComment = match[1];
    const propName = match[2];
    const { description, required, internal, deprecated } = parseJSDocContent(rawComment);
    jsDocMap.set(propName, { description, required, internal, deprecated });
  }

  return jsDocMap;
}

/**
 * Parses JSDoc comment content, extracting description and @required tag.
 */
function parseJSDocContent(rawComment: string): {
  description: string;
  required: boolean;
  internal: boolean;
  deprecated: boolean;
} {
  const cleaned = rawComment
    // Remove leading asterisks and whitespace from each line
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .join(" ")
    // Collapse multiple spaces
    .replace(/\s+/g, " ")
    .trim();

  // Check for JSDoc tags
  const required = /@required\b/i.test(cleaned);
  const internal = /@internal\b/i.test(cleaned);
  const deprecated = /@deprecated\b/i.test(cleaned);

  // Remove tags from description
  const description = cleaned
    .replace(/@required\s*/gi, "")
    .replace(/@internal\s*/gi, "")
    .trim();

  return { description, required, internal, deprecated };
}

// =============================================================================
// Svelte Parser
// =============================================================================

function extractTagName(content: string): string | null {
  // Pattern 1: customElement="goa-tag"
  const simpleMatch = content.match(/customElement\s*=\s*["']([^"']+)["']/);
  if (simpleMatch) return simpleMatch[1];

  // Pattern 2: customElement={{ tag: "goa-tag", ... }}
  const objectMatch = content.match(/customElement\s*=\s*\{\{\s*tag:\s*["']([^"']+)["']/);
  if (objectMatch) return objectMatch[1];

  return null;
}

/**
 * Extracts type aliases from the Svelte file (both module and instance scripts).
 * Resolves composite aliases like `type Size = HeadingSize | BodySize` by
 * recursively expanding references until all values are string literals.
 */
function extractTypeAliases(content: string): Map<string, string[]> {
  const aliases = new Map<string, string[]>();

  // Match: type Name = "value1" | "value2" | OtherType;
  const typeMatches = content.matchAll(/\btype\s+(\w+)\s*=\s*([^;]+);/g);

  for (const match of typeMatches) {
    const name = match[1];
    const definition = match[2].trim();

    const members = definition
      .split("|")
      .map((v) => v.trim())
      .filter((v) => v.length > 0);

    aliases.set(name, members);
  }

  // Resolve composite aliases (expand references to other aliases)
  // Iterate until stable — handles chained aliases
  let changed = true;
  while (changed) {
    changed = false;
    for (const [name, members] of aliases) {
      const expanded: string[] = [];
      for (const member of members) {
        const clean = member.replace(/["']/g, "");
        if (aliases.has(clean) && clean !== name) {
          expanded.push(...aliases.get(clean)!);
          changed = true;
        } else {
          expanded.push(member);
        }
      }
      aliases.set(name, expanded);
    }
  }

  return aliases;
}

function extractValidators(content: string): Map<string, ValidatorInfo> {
  const validators = new Map<string, ValidatorInfo>();

  // Pattern: const [Name, validateName] = typeValidator("description", ["value1", "value2"], { options });
  const validatorMatches = content.matchAll(
    /const\s+\[(\w+),\s*validate\w+\]\s*=\s*typeValidator\s*\([\s\S]*?\[([\s\S]*?)\][\s\S]*?\);/g,
  );

  for (const match of validatorMatches) {
    const name = match[1];
    const valuesStr = match[2];

    const values = valuesStr
      .split(",")
      .map((v) => v.trim().replace(/["']/g, ""))
      .filter((v) => v.length > 0);

    // Check for deprecated values
    const fullMatch = match[0];
    let deprecated: string[] | undefined;
    const deprecatedMatch = fullMatch.match(/deprecated:\s*\[([\s\S]*?)\]/);
    if (deprecatedMatch) {
      deprecated = deprecatedMatch[1]
        .split(",")
        .map((v) => v.trim().replace(/["']/g, ""))
        .filter((v) => v.length > 0);
    }

    validators.set(name, { values, deprecated });
  }

  // Map type aliases to validators: type TypeName = (typeof ValidatorName)[number];
  const typeAliasMatches = content.matchAll(
    /type\s+(\w+)\s*=\s*\(\s*typeof\s+(\w+)\s*\)\s*\[\s*number\s*\]/g,
  );
  for (const match of typeAliasMatches) {
    const typeName = match[1];
    const validatorName = match[2];
    const validatorData = validators.get(validatorName);
    if (validatorData) {
      validators.set(typeName, { ...validatorData, typeName });
    }
  }

  return validators;
}

function extractProps(
  content: string,
  validators: Map<string, ValidatorInfo>,
  componentName: string,
  typeAliases: Map<string, string[]>,
): ParsedPropRaw[] {
  const props: ParsedPropRaw[] = [];

  // Build JSDoc map for descriptions
  const jsDocMap = buildJSDocMap(content);

  // Internal props to skip (used by public forms system, not useful for devs)
  const internalProps = new Set([
    "publicformsummaryorder",
    "action",
    "actionarg",
    "actionargs",
  ]);

  // Match: export let propName: Type = defaultValue;
  const propMatches = content.matchAll(
    /export\s+let\s+(\w+)(?:\s*:\s*([^=;]+?))?(?:\s*=\s*([^;]+?))?;/g,
  );

  for (const match of propMatches) {
    const rawName = match[1];
    let type = match[2]?.trim() || "any";
    const defaultStr = match[3]?.trim();

    // Skip private props (starting with _)
    if (rawName.startsWith("_")) continue;

    // Skip internal props
    if (internalProps.has(rawName.toLowerCase())) continue;

    const name = toReactPropName(rawName);
    let typeLabel: string | undefined;
    let values: string[] | undefined;

    // Check if this prop has a validator for allowed values
    if (validators.has(type)) {
      const validatorData = validators.get(type)!;
      values = validatorData.values;
      // Generate typeLabel based on component name and prop type
      typeLabel = generateTypeLabel(componentName, type, validatorData);
      type = values.map((v) => `"${v}"`).join(" | ");
    }

    // Handle special types
    if (type.includes("GoAIconType") || type.includes("GoaIconType")) {
      typeLabel = "GoAIconType";
      type = "GoAIconType";
    } else if (type === "Spacing" || type.includes("Spacing")) {
      typeLabel = "Spacing";
      type = "Spacing";
    }

    // Parse default value
    let defaultValue: string | null = parseDefaultValue(defaultStr);

    // Detect boolean props serialized as strings
    let isBooleanProp = false;
    if (type === "string" && (defaultValue === "true" || defaultValue === "false")) {
      type = "boolean";
      isBooleanProp = true;
    }

    // Resolve type aliases (e.g., Size -> "heading-xl" | "heading-l" | ...)
    // Split type into union members, expand any alias references, filter undefined/null
    {
      const members = type
        .split("|")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
      const expanded: string[] = [];
      let didResolve = false;

      for (const member of members) {
        const clean = member.replace(/["']/g, "");
        // Skip undefined/null — they just mean the prop is optional
        if (clean === "undefined" || clean === "null") {
          didResolve = true;
          continue;
        }
        if (typeAliases.has(clean)) {
          expanded.push(...typeAliases.get(clean)!);
          didResolve = true;
        } else {
          expanded.push(member);
        }
      }

      if (didResolve && expanded.length > 0) {
        const primitives = new Set(["string", "boolean", "number", "any", "object"]);
        type = expanded
          .map((v) => {
            const c = v.replace(/["']/g, "");
            if (primitives.has(c)) return c;
            return `"${c}"`;
          })
          .join(" | ");
      }
    }

    // Handle inline union types
    if (!values && type.includes("|") && !type.includes("typeof")) {
      values = type
        .split("|")
        .map((v) => v.trim().replace(/["']/g, ""))
        .filter((v) => v.length > 0 && !v.includes("("));
    }

    // Get JSDoc info from map (description + required flag)
    const jsDocInfo = jsDocMap.get(rawName);

    // Skip @internal props — not for public API docs
    if (jsDocInfo?.internal) continue;

    const description = jsDocInfo?.description || "";
    // Use @required from JSDoc if present, otherwise fall back to checking if no default value
    const isRequired = jsDocInfo?.required || defaultStr === undefined;

    props.push({
      name,
      rawName,
      type: cleanType(type),
      typeLabel,
      values,
      required: isRequired,
      default: defaultValue,
      isBooleanProp,
      description,
      deprecated: jsDocInfo?.deprecated || false,
    });
  }

  return props;
}

// Known limitation: only scans the top-level Svelte file, so components that
// delegate event dispatching to child Svelte files will have missing events.
// Affected: push-drawer (_close), file-upload-card (_cancel, _delete),
//           form (_complete, _continue, _stateChange).
// This will be resolved when #3361 (JSDoc in wrappers) lands and the extractor
// can read events from the React/Angular wrappers instead.
function extractEvents(content: string): string[] {
  const eventNames = new Set<string>();

  // Pattern 1: dispatch(element, "_eventName", ...)
  const dispatchMatches = content.matchAll(/dispatch\s*\(\s*[^,]+,\s*["']([^"']+)["']/g);
  for (const match of dispatchMatches) {
    const eventName = match[1];
    // Skip internal events (like "help-text::announce")
    if (eventName.includes("::")) continue;
    eventNames.add(eventName);
  }

  // Pattern 2: dispatchEvent(new CustomEvent("_eventName", ...))
  const customEventMatches = content.matchAll(
    /dispatchEvent\s*\(\s*new\s+CustomEvent\s*\(\s*["']([^"']+)["']/g,
  );
  for (const match of customEventMatches) {
    const eventName = match[1];
    if (!eventName.includes("::")) {
      eventNames.add(eventName);
    }
  }

  // Pattern 3: _rootEl?.dispatchEvent(new CustomEvent("_eventName", ...))
  const rootElMatches = content.matchAll(
    /_rootEl\??\s*\.?\s*dispatchEvent\s*\(\s*new\s+CustomEvent\s*\(\s*["']([^"']+)["']/g,
  );
  for (const match of rootElMatches) {
    const eventName = match[1];
    if (!eventName.includes("::")) {
      eventNames.add(eventName);
    }
  }

  return Array.from(eventNames);
}

function extractSlots(content: string): string[] {
  const slotNames: string[] = [];
  const seenNames = new Set<string>();

  // Named slots: <slot name="slotName">
  const namedSlotMatches = content.matchAll(/<slot\s+name\s*=\s*["']([^"']+)["']/g);
  for (const match of namedSlotMatches) {
    const name = match[1];
    if (!seenNames.has(name)) {
      seenNames.add(name);
      slotNames.push(name);
    }
  }

  // Default slot: <slot> or <slot />
  const hasDefaultSlot = /<slot\s*(?:\/?>|>[^<]*<\/slot>)/.test(content);
  if (hasDefaultSlot && !seenNames.has("default")) {
    slotNames.unshift("default");
  }

  return slotNames;
}

// =============================================================================
// Type Label Generation
// =============================================================================

function generateTypeLabel(
  componentName: string,
  typeName: string,
  _validatorData: ValidatorInfo,
): string {
  // Generate TypeScript type name: Goab{Component}{Type}
  const componentPart = capitalize(toCamelCase(componentName));
  // Remove trailing 's' from Types, Sizes, etc.
  let typePart = typeName.replace(/s$/, "");

  // Avoid duplication if type already includes component name
  // e.g., ButtonType for button component should become GoabButtonType, not GoabButtonButtonType
  const lowerComponent = componentPart.toLowerCase();
  const lowerType = typePart.toLowerCase();
  if (lowerType.startsWith(lowerComponent)) {
    // Type already includes component name, just use the type part
    return `Goab${typePart}`;
  }

  return `Goab${componentPart}${typePart}`;
}

// =============================================================================
// Event Transformation
// =============================================================================

function transformEvents(rawEventNames: string[]): ExtractedEvent[] {
  const events: ExtractedEvent[] = [];

  for (const rawName of rawEventNames) {
    // Skip internal events
    if (rawName.includes("::") || rawName.includes(":")) continue;

    // Raw event name (e.g., "_click") -> base name (e.g., "click")
    const baseName = rawName.replace(/^_/, "");

    // React event name: onClick, onChange, etc.
    const reactName = `on${capitalize(baseName)}`;

    // Add React event
    events.push({
      name: reactName,
      type: "(event: Event) => void",
      description: "",
      frameworks: ["react"],
    });

    // Add Angular event (uses the raw name with underscore)
    events.push({
      name: rawName,
      type: "CustomEvent",
      description: "",
      frameworks: ["angular"],
    });
  }

  return events;
}

// =============================================================================
// Utilities
// =============================================================================

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str: string): string {
  return str
    .split("-")
    .map((part, index) => (index === 0 ? part : capitalize(part)))
    .join("");
}

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function toReactPropName(name: string): string {
  const mappings: Record<string, string> = {
    leadingicon: "leadingIcon",
    trailingicon: "trailingIcon",
    arialabel: "ariaLabel",
    arialabelledby: "ariaLabelledBy",
    testid: "testId",
    maxwidth: "maxWidth",
    maxheight: "maxHeight",
    maxlength: "maxLength",
    minlength: "minLength",
    autocomplete: "autoComplete",
    autocapitalize: "autoCapitalize",
    textalign: "textAlign",
    calloutvariant: "calloutVariant",
    handletrailingiconclick: "handleTrailingIconClick",
    trailingiconarialabel: "trailingIconAriaLabel",
    disableglobalclosepopover: "disableGlobalClosePopover",
    labelsize: "labelSize",
    helptext: "helpText",
    errormessage: "errorMessage",
    inputmode: "inputMode",
    readonly: "readOnly",
    tabindex: "tabIndex",
    steppertext: "stepperText",
    counterstep: "counterStep",
    relativecontent: "relativeContent",
    mindate: "minDate",
    maxdate: "maxDate",
    headingsize: "headingSize",
    maxcount: "maxCount",
    relativeto: "relativeTo",
  };

  return mappings[name.toLowerCase()] || name;
}

function cleanType(type: string): string {
  return type
    .replace(/\s+/g, " ")
    .replace(/\(\s*typeof\s+\w+\s*\)\s*\[\s*number\s*\]/g, "")
    .trim();
}

function parseDefaultValue(str: string | undefined): string | null {
  if (str === undefined) return null;
  if (str === "null" || str === "undefined") return null;
  if (str.startsWith('"') || str.startsWith("'")) {
    return str.replace(/["']/g, "");
  }
  if (str === "true" || str === "false") return str;
  if (!isNaN(Number(str))) return str;
  if (str === "{}") return "{}";
  if (str === "[]") return "[]";
  return str;
}

// =============================================================================
// Main Extraction
// =============================================================================

function extractComponentAPI(componentName: string): ExtractedComponentAPI | null {
  const componentPath = path.join(UI_COMPONENTS_PATH, componentName);
  if (!fs.existsSync(componentPath) || !fs.statSync(componentPath).isDirectory()) {
    console.error(`Component directory not found: ${componentName}`);
    return null;
  }

  // Find the main Svelte file
  const svelteFileName = `${capitalize(toCamelCase(componentName))}.svelte`;
  let svelteFilePath = path.join(componentPath, svelteFileName);

  if (!fs.existsSync(svelteFilePath)) {
    // Try to find any .svelte file
    const files = fs.readdirSync(componentPath);
    const svelteFile = files.find((f) => f.endsWith(".svelte"));
    if (!svelteFile) {
      console.error(`No Svelte file found in: ${componentName}`);
      return null;
    }
    svelteFilePath = path.join(componentPath, svelteFile);
  }

  const content = fs.readFileSync(svelteFilePath, "utf-8");

  // Check if it's a custom element
  const tagName = extractTagName(content);
  if (!tagName) {
    console.error(`Not a custom element: ${componentName}`);
    return null;
  }

  // Extract data
  const typeAliases = extractTypeAliases(content);
  const validators = extractValidators(content);
  const rawProps = extractProps(content, validators, componentName, typeAliases);
  const rawEventNames = extractEvents(content);
  const slotNames = extractSlots(content);

  // Transform to output format
  const props: ExtractedProp[] = rawProps.map((p) => ({
    name: p.name,
    type: p.type,
    typeLabel: p.typeLabel,
    values: p.values,
    required: p.required,
    default: p.default,
    description: p.description, // From JSDoc comments in source
    ...(p.deprecated && { deprecated: true }),
  }));

  const events = transformEvents(rawEventNames);

  const slots: ExtractedSlot[] = slotNames.map((name) => ({
    name,
    description: "", // Filled by human content
  }));

  // Relative path from workspace root
  const relativePath = path.relative(WORKSPACE_ROOT, svelteFilePath);

  return {
    componentSlug: toKebabCase(componentName),
    extractedFrom: relativePath,
    props,
    events,
    slots,
  };
}

function saveComponentAPI(api: ExtractedComponentAPI): void {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  const filePath = path.join(OUTPUT_PATH, `${api.componentSlug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(api, null, 2));
  console.log(`  Created: ${filePath}`);
}

// =============================================================================
// CLI
// =============================================================================

function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage:");
    console.log("  npx tsx extract-api.ts button           # Extract single component");
    console.log(
      "  npx tsx extract-api.ts button input     # Extract multiple components",
    );
    console.log("  npx tsx extract-api.ts --all            # Extract all components");
    process.exit(1);
  }

  let componentNames: string[];

  if (args.includes("--all")) {
    // Get all component directories
    componentNames = fs.readdirSync(UI_COMPONENTS_PATH).filter((name) => {
      const componentPath = path.join(UI_COMPONENTS_PATH, name);
      return fs.statSync(componentPath).isDirectory();
    });
  } else {
    componentNames = args;
  }

  console.log("\n Component API Extraction");
  console.log("═".repeat(50));
  console.log(`\nExtracting ${componentNames.length} component(s)...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const componentName of componentNames) {
    console.log(`Processing: ${componentName}`);
    try {
      const api = extractComponentAPI(componentName);
      if (api) {
        saveComponentAPI(api);
        successCount++;
      } else {
        failCount++;
      }
    } catch (error) {
      console.error(`  Error: ${error}`);
      failCount++;
    }
  }

  console.log("\n" + "═".repeat(50));
  console.log(`Complete: ${successCount} succeeded, ${failCount} failed`);
  console.log(`Output: ${OUTPUT_PATH}\n`);
}

main();
