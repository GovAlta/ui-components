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
import * as ts from "typescript";

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
const DOCS_COMPONENT_CONTENT_PATH = path.join(
  WORKSPACE_ROOT,
  "docs/src/content/components",
);

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
  frameworks: ("react" | "angular" | "webComponents")[];
}

interface ExtractedSlot {
  name: string;
  type?: string;
  description: string; // Empty - filled by human content
  required?: boolean;
}

interface ExtractedComponentAPI {
  componentSlug: string;
  extractedFrom: string;
  frameworks: {
    react: {
      props: ExtractedProp[];
      events: ExtractedEvent[];
      slots: ExtractedSlot[];
    };
    angular: {
      props: ExtractedProp[];
      events: ExtractedEvent[];
      slots: ExtractedSlot[];
    };
    webComponents: {
      props: ExtractedProp[];
      events: ExtractedEvent[];
      slots: ExtractedSlot[];
    };
  };
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

interface WrapperExtraction {
  found: boolean;
  props: ExtractedProp[];
  events: ExtractedEvent[];
  slotDescriptions: Record<string, string>;
  slotNameAliases: Record<string, string>;
  slotRequired: Record<string, boolean>;
}

const INTERNAL_PROP_NAMES = new Set(["publicformsummaryorder", "filterablecontext", "version"]);
const INTERNAL_SLOT_NAMES = new Set(["version"]);
const INTERNAL_EVENT_NAMES = new Set(["_revealChange", "_update"]);

const DOCS_EXCLUDED_COMPONENTS = new Set(["focus-trap", "form-stepper", "scrollable"]);
const DOCS_FORCED_COMPONENTS = new Set(["table-sort-header"]);
const WRAPPER_COMPONENT_ALIASES: Record<string, string> = {
  "temporary-notification": "temporary-notification-ctrl",
};
const WEB_COMPONENT_INTERNAL_EVENT_OVERRIDES: Record<string, Set<string>> = {
  "work-side-menu-group": new Set(["_hoverItem"]),
  "work-side-menu-item": new Set([
    "_blurItem",
    "_desktopPopoverClose",
    "_desktopPopoverOpen",
    "_hoverItem",
    "_itemCurrent",
    "_mobilePopoverClose",
    "_mobilePopoverOpen",
    "_mountItem",
    "_navigate",
  ]),
};
const WEB_COMPONENT_EVENT_TYPE_OVERRIDES: Record<string, Record<string, string>> = {
  dropdown: {
    _change: "CustomEvent<{ name?: string; value?: string; event: Event }>",
  },
  "file-upload-input": {
    _selectFile: "CustomEvent<{ file: File; event: Event }>",
  },
};
const SLOT_TYPE_OVERRIDES: Record<
  string,
  Partial<Record<"react" | "angular" | "webComponents", Record<string, string>>>
> = {
  footer: {
    react: {
      nav: "GoabAppFooterNavSection",
      meta: "GoabAppFooterMetaSection",
    },
    angular: {
      nav: "GoabAppFooterNavSection",
      meta: "GoabAppFooterMetaSection",
    },
    webComponents: {
      nav: "goa-app-footer-nav-section",
      meta: "goa-app-footer-meta-section",
    },
  },
};
const ALLOW_INTERNAL_PROP_BY_COMPONENT: Record<string, Set<string>> = {
  "microsite-header": new Set(["version"]),
};

function shouldSkipInternalProp(componentName: string, propName: string): boolean {
  const normalizedComponentName = toKebabCase(componentName);
  const normalizedName = propName.toLowerCase();
  if (ALLOW_INTERNAL_PROP_BY_COMPONENT[normalizedComponentName]?.has(normalizedName)) {
    return false;
  }
  return INTERNAL_PROP_NAMES.has(normalizedName);
}

function shouldAllowInternalProp(componentName: string, propName: string): boolean {
  const normalizedComponentName = toKebabCase(componentName);
  return Boolean(
    ALLOW_INTERNAL_PROP_BY_COMPONENT[normalizedComponentName]?.has(propName.toLowerCase()),
  );
}

function isInternalPropName(propName: string): boolean {
  return INTERNAL_PROP_NAMES.has(propName.toLowerCase());
}

function isStandardV1V2VersionProp(prop: ExtractedProp | undefined): boolean {
  if (!prop || prop.name.toLowerCase() !== "version") return false;

  const values = (prop.values || []).map((value) => String(value).replace(/['"]/g, "").trim());
  if (values.length === 2 && values.includes("1") && values.includes("2")) {
    return true;
  }

  const normalizedType = String(prop.type || "")
    .replace(/['"]/g, "")
    .replace(/\s+/g, "");

  return normalizedType === "1|2";
}

function specializeAngularValuePropFromReact(
  angularProps: ExtractedProp[],
  reactProps: ExtractedProp[],
): void {
  const angularValueProp = angularProps.find((prop) => prop.name === "value");
  const reactValueProp = reactProps.find((prop) => prop.name === "value");

  if (!angularValueProp || !reactValueProp) return;
  if (angularValueProp.type !== "unknown | null | undefined") return;
  if (!reactValueProp.type || reactValueProp.type === "unknown") return;

  angularValueProp.type = reactValueProp.type;
  angularValueProp.values = reactValueProp.values;
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
    .replace(/@deprecated\s*/gi, "")
    .trim();

  return { description, required, internal, deprecated };
}

function parseDescriptionFromJSDoc(rawComment: string | undefined): string {
  if (!rawComment) return "";
  const { description } = parseJSDocContent(rawComment);
  return description;
}

function extractDefaultFromDescription(description: string): {
  description: string;
  defaultValue: string | null;
} {
  const defaultMatch = description.match(/@default\s+([^@]+)/i);
  const defaultValue = defaultMatch ? defaultMatch[1].trim().replace(/^["']|["']$/g, "") : null;
  const cleanDescription = description.replace(/@default\s+([^@]+)/gi, "").trim();
  return {
    description: cleanDescription,
    defaultValue,
  };
}

function isReadonlyDescription(description: string): boolean {
  return /read[ -]?only\b|set by the component\b/i.test(description);
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
  const customElementPropAttributeMap = extractCustomElementPropAttributeMap(content);

  // Build JSDoc map for descriptions
  const jsDocMap = buildJSDocMap(content);

  // Match: export let propName: Type = defaultValue;
  const propMatches = content.matchAll(
    /export\s+let\s+(\w+)(?:\s*:\s*([^=;]+?))?(?:\s*=\s*([^;]+?))?;/g,
  );

  for (const match of propMatches) {
    const rawName = match[1];
    const defaultStr = match[3]?.trim();
    let type = match[2]?.trim() || inferTypeFromDefault(defaultStr);

    // Skip private props (starting with _)
    if (rawName.startsWith("_")) continue;

    // Keep `version` on Web Component docs; wrappers are filtered later.
    if (rawName.toLowerCase() !== "version" && shouldSkipInternalProp(componentName, rawName)) {
      continue;
    }

    const name = customElementPropAttributeMap.get(rawName) || rawName.toLowerCase();
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
      typeLabel = "GoabIconType";
      type = "GoabIconType";
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

    // Keep Svelte `version` visible in Web Component docs.
    if (
      jsDocInfo?.internal &&
      rawName.toLowerCase() !== "version" &&
      !shouldAllowInternalProp(componentName, rawName)
    ) {
      continue;
    }

    // Skip @deprecated props — not for public API docs
    if (jsDocInfo?.deprecated) continue;

    const description = jsDocInfo?.description || "";
    const isReadonly = isReadonlyDescription(description);
    // Use @required from JSDoc if present, otherwise fall back to checking if no default value.
    // Read-only, component-managed values should not be presented as consumer-required props.
    const isRequired = Boolean(jsDocInfo?.required) || (!isReadonly && defaultStr === undefined);

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

function extractCustomElementPropAttributeMap(content: string): Map<string, string> {
  const map = new Map<string, string>();
  const optionsTagMatch = content.match(/<svelte:options[\s\S]*?\/>/);
  if (!optionsTagMatch) return map;

  const optionsTag = optionsTagMatch[0];
  const propAttributeMatches = optionsTag.matchAll(
    /(?:^|\n)\s*(\w+)\s*:\s*\{[^{}]*attribute\s*:\s*["']([^"']+)["'][^{}]*\}/g,
  );

  for (const match of propAttributeMatches) {
    const propName = match[1];
    const attributeName = match[2];
    map.set(propName, attributeName);
  }

  return map;
}

// Known limitation: only scans the top-level Svelte file, so components that
// delegate event dispatching to child Svelte files will have missing events.
// Events from React/Angular wrappers fill this gap for those frameworks.
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

  return slotNames;
}

function parseWrapperPropValues(type: string): string[] | undefined {
  if (!type.includes("|")) return undefined;
  const values = type
    .split("|")
    .map((v) => v.trim().replace(/['"]/g, ""))
    .filter((v) => v.length > 0 && v !== "undefined" && v !== "null");
  return values.length > 0 ? values : undefined;
}

function inferTypeFromDefault(defaultValue: string | undefined): string {
  if (!defaultValue) return "any";

  const trimmed = defaultValue.trim();
  if (trimmed === "true" || trimmed === "false") return "boolean";
  if (!isNaN(Number(trimmed))) return "number";
  if (/^["'`]/.test(trimmed)) return "string";
  if (trimmed.startsWith("[")) return "unknown[]";
  if (trimmed.startsWith("{")) return "Record<string, unknown>";

  return "any";
}

function normalizeName(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function getMatchingSlotName(propName: string, slotNames: string[]): string | null {
  if (propName === "children") {
    return "default";
  }

  const normalizedPropName = normalizeName(propName);
  const directMatch =
    slotNames.find((slotName) => normalizeName(slotName) === normalizedPropName) ?? null;
  if (directMatch) return directMatch;

  // Common wrapper naming pattern: slot "account" exposed as prop "accountContent".
  const contentSuffixMatch = propName.match(/^(.+?)content$/i);
  if (contentSuffixMatch?.[1]) {
    const baseName = normalizeName(contentSuffixMatch[1]);
    return slotNames.find((slotName) => normalizeName(slotName) === baseName) ?? null;
  }

  return null;
}

interface ReactCallbackAliasInfo {
  typeParam?: string;
  defaultTypeArg?: string;
  detailType: string;
}

interface ReactInterfaceInfo {
  name: string;
  exported: boolean;
  extendsNames: string[];
  declaration: ts.InterfaceDeclaration;
}

function getTypeReferenceName(typeNode: ts.TypeReferenceNode, sourceFile: ts.SourceFile): string {
  const typeName = typeNode.typeName.getText(sourceFile);
  return typeName.split(".").pop() || typeName;
}

function createTsSourceFile(filePath: string, content: string): ts.SourceFile {
  const scriptKind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
  return ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, scriptKind);
}

function getNodeDecorators(node: ts.Node): readonly ts.Decorator[] {
  if (typeof ts.canHaveDecorators === "function" && ts.canHaveDecorators(node)) {
    return ts.getDecorators(node) ?? [];
  }

  const legacyDecorators = (node as { decorators?: readonly ts.Decorator[] }).decorators;
  return legacyDecorators ?? [];
}

function getDecoratorCall(node: ts.Node, decoratorName: string): ts.CallExpression | null {
  for (const decorator of getNodeDecorators(node)) {
    const expression = decorator.expression;
    if (ts.isCallExpression(expression) && ts.isIdentifier(expression.expression)) {
      if (expression.expression.text === decoratorName) {
        return expression;
      }
    }

    if (ts.isIdentifier(expression) && expression.text === decoratorName) {
      return null;
    }
  }

  return null;
}

function hasDecorator(node: ts.Node, decoratorName: string): boolean {
  for (const decorator of getNodeDecorators(node)) {
    const expression = decorator.expression;
    if (ts.isCallExpression(expression) && ts.isIdentifier(expression.expression)) {
      if (expression.expression.text === decoratorName) {
        return true;
      }
    }

    if (ts.isIdentifier(expression) && expression.text === decoratorName) {
      return true;
    }
  }

  return false;
}

function parseReactInterfaces(content: string, filePath: string): Map<string, ReactInterfaceInfo> {
  const interfaces = new Map<string, ReactInterfaceInfo>();
  const sourceFile = createTsSourceFile(filePath, content);

  for (const statement of sourceFile.statements) {
    if (!ts.isInterfaceDeclaration(statement)) continue;

    const name = statement.name.text;
    const exported = statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false;
    const extendsNames =
      statement.heritageClauses
        ?.filter((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword)
        .flatMap((clause) =>
          clause.types
            .map((typeNode) => typeNode.expression.getText(sourceFile))
            .map((value) => value.split(".").pop() || value)
            .filter(Boolean),
        ) ?? [];

    interfaces.set(name, {
      name,
      exported,
      extendsNames,
      declaration: statement,
    });
  }

  return interfaces;
}

function resolvePrimaryReactPropsInterface(
  componentName: string,
  interfaces: Map<string, ReactInterfaceInfo>,
): string | null {
  const componentPart = capitalize(toCamelCase(componentName));
  const candidates = [`Goab${componentPart}Props`, `GoA${componentPart}Props`];

  for (const name of candidates) {
    const match = interfaces.get(name);
    if (match?.exported) return name;
  }

  for (const name of candidates) {
    if (interfaces.has(name)) return name;
  }

  for (const info of interfaces.values()) {
    if (info.exported && /^(?:Goab|GoA)\w+Props$/.test(info.name)) {
      return info.name;
    }
  }

  for (const info of interfaces.values()) {
    if (/^(?:Goab|GoA)\w+Props$/.test(info.name)) {
      return info.name;
    }
  }

  return null;
}

function collectReactInterfaceMembers(
  interfaceName: string,
  interfaces: Map<string, ReactInterfaceInfo>,
  sourceFile: ts.SourceFile,
  visited: Set<string> = new Set<string>(),
): ts.TypeElement[] {
  if (visited.has(interfaceName)) return [];
  visited.add(interfaceName);

  const info = interfaces.get(interfaceName);
  if (!info) return [];

  const inheritedMembers = info.extendsNames.flatMap((baseName) =>
    collectReactInterfaceMembers(baseName, interfaces, sourceFile, visited),
  );

  return [...inheritedMembers, ...info.declaration.members];
}

function getFunctionLikeFirstParameterType(
  fn: ts.FunctionDeclaration | ts.ArrowFunction | ts.FunctionExpression,
): ts.TypeNode | null {
  return fn.parameters[0]?.type ?? null;
}

function resolvePrimaryReactComponentParameterType(
  componentName: string,
  sourceFile: ts.SourceFile,
): ts.TypeNode | null {
  const componentPart = capitalize(toCamelCase(componentName));
  const candidates = [`Goab${componentPart}`, `GoA${componentPart}`];

  for (const statement of sourceFile.statements) {
    if (
      ts.isFunctionDeclaration(statement) &&
      statement.name &&
      candidates.includes(statement.name.text) &&
      statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      return getFunctionLikeFirstParameterType(statement);
    }

    if (
      ts.isVariableStatement(statement) &&
      statement.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword)
    ) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || !candidates.includes(declaration.name.text)) continue;
        if (!declaration.initializer) continue;

        if (ts.isArrowFunction(declaration.initializer) || ts.isFunctionExpression(declaration.initializer)) {
          return getFunctionLikeFirstParameterType(declaration.initializer);
        }
      }
    }
  }

  return null;
}

function collectReactTypeNodeMembers(
  typeNode: ts.TypeNode | null,
  interfaces: Map<string, ReactInterfaceInfo>,
  sourceFile: ts.SourceFile,
  visitedTypeRefs: Set<string> = new Set<string>(),
): ts.TypeElement[] {
  if (!typeNode) return [];

  if (ts.isParenthesizedTypeNode(typeNode)) {
    return collectReactTypeNodeMembers(typeNode.type, interfaces, sourceFile, visitedTypeRefs);
  }

  if (ts.isIntersectionTypeNode(typeNode)) {
    return typeNode.types.flatMap((memberType) =>
      collectReactTypeNodeMembers(memberType, interfaces, sourceFile, visitedTypeRefs),
    );
  }

  if (ts.isTypeLiteralNode(typeNode)) {
    return [...typeNode.members];
  }

  if (ts.isTypeReferenceNode(typeNode)) {
    const typeName = getTypeReferenceName(typeNode, sourceFile);
    if (visitedTypeRefs.has(typeName)) return [];
    visitedTypeRefs.add(typeName);
    return collectReactInterfaceMembers(typeName, interfaces, sourceFile);
  }

  return [];
}

function hasReactMarginsInHierarchy(
  interfaceName: string,
  interfaces: Map<string, ReactInterfaceInfo>,
  visited: Set<string> = new Set<string>(),
): boolean {
  if (visited.has(interfaceName)) return false;
  visited.add(interfaceName);

  const info = interfaces.get(interfaceName);
  if (!info) return false;

  if (info.extendsNames.includes("Margins")) {
    return true;
  }

  return info.extendsNames.some((baseName) =>
    hasReactMarginsInHierarchy(baseName, interfaces, visited),
  );
}

function extractReactCallbackAliases(sourceFile: ts.SourceFile): Map<string, ReactCallbackAliasInfo> {
  const aliases = new Map<string, ReactCallbackAliasInfo>();
  for (const statement of sourceFile.statements) {
    if (!ts.isTypeAliasDeclaration(statement)) continue;
    if (!ts.isFunctionTypeNode(statement.type)) continue;

    const aliasName = statement.name.text;
    const typeParam = statement.typeParameters?.[0]?.name.text;
    const defaultTypeArg = statement.typeParameters?.[0]?.default?.getText(sourceFile)?.trim();
    const detailType = cleanType(
      statement.type.parameters[0]?.type?.getText(sourceFile)?.trim() || "unknown",
    );

    aliases.set(aliasName, {
      typeParam,
      defaultTypeArg,
      detailType,
    });
  }

  return aliases;
}

function parseGenericAliasUsage(type: string): { alias: string; typeArg?: string } {
  const aliasMatch = type.match(/^([A-Za-z_]\w*)(?:<\s*([^>]+)\s*>)?$/);
  if (!aliasMatch) {
    return { alias: type };
  }

  return {
    alias: aliasMatch[1],
    typeArg: aliasMatch[2]?.trim(),
  };
}

function resolveReactCallbackEventType(
  callbackType: string,
  callbackAliases: Map<string, ReactCallbackAliasInfo>,
): string {
  if (callbackType.includes("=>")) {
    return callbackType;
  }

  const { alias, typeArg } = parseGenericAliasUsage(callbackType);
  const aliasInfo = callbackAliases.get(alias);
  if (!aliasInfo) {
    return callbackType;
  }

  const toFunctionSignature = (detailType: string) => `(detail: ${detailType}) => void`;

  if (!aliasInfo.typeParam) {
    return toFunctionSignature(aliasInfo.detailType);
  }

  const resolvedTypeArg = typeArg || aliasInfo.defaultTypeArg;
  if (!resolvedTypeArg) {
    return toFunctionSignature(aliasInfo.detailType);
  }

  const typeParamPattern = new RegExp(`\\b${aliasInfo.typeParam}\\b`, "g");
  let resolvedDetailType = aliasInfo.detailType.replace(typeParamPattern, resolvedTypeArg);

  // Keep docs concise when the generic argument matches the alias default.
  if (aliasInfo.defaultTypeArg && resolvedTypeArg === aliasInfo.defaultTypeArg) {
    const defaultGenericPattern = new RegExp(`\\<\\s*${escapeRegExp(resolvedTypeArg)}\\s*\\>`, "g");
    resolvedDetailType = resolvedDetailType.replace(defaultGenericPattern, "");
  }

  return toFunctionSignature(resolvedDetailType);
}

function isReactCallbackAliasType(
  type: string,
  callbackAliases: Map<string, ReactCallbackAliasInfo>,
): boolean {
  if (type.includes("=>")) {
    return true;
  }

  const { alias } = parseGenericAliasUsage(type);
  return callbackAliases.has(alias);
}

function isFunctionType(type: string): boolean {
  return /^\(\s*[^)]*\)\s*=>\s*.+$/.test(type.trim());
}

function isSlotCarrierType(type: string): boolean {
  return /React(?:\.[A-Za-z]+)?(?:Node|Element)(?:<.+?>)?|JSX\.Element|TemplateRef\s*<.+?>/.test(type);
}

function isPureSlotCarrierType(type: string): boolean {
  const members = type
    .split("|")
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && part !== "null" && part !== "undefined");

  if (members.length === 0) return false;
  return members.every((part) => isSlotCarrierType(part));
}

function toEventCallbackType(type: string): string {
  if (type === "void") {
    return "() => void";
  }
  return `(event: ${type}) => void`;
}

function dedupeByName<T extends { name: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

function createEmptyWrapperExtraction(found: boolean = false): WrapperExtraction {
  return {
    found,
    props: [],
    events: [],
    slotDescriptions: {},
    slotNameAliases: {},
    slotRequired: {},
  };
}

function findImmediateJsDocBefore(content: string, markerIndex: number): string | undefined {
  const beforeMarker = content.slice(0, markerIndex);
  const start = beforeMarker.lastIndexOf("/**");
  if (start === -1) return undefined;

  const end = beforeMarker.indexOf("*/", start + 3);
  if (end === -1) return undefined;

  const tail = beforeMarker.slice(end + 2);
  if (!/^\s*$/.test(tail)) return undefined;

  return beforeMarker.slice(start + 3, end);
}

function extractAngularBaseComponentProps(): Map<string, ExtractedProp> {
  const baseFile = path.join(
    WORKSPACE_ROOT,
    "libs/angular-components/src/lib/components/base.component.ts",
  );

  if (!fs.existsSync(baseFile)) return new Map<string, ExtractedProp>();

  const content = fs.readFileSync(baseFile, "utf-8");
  const sourceFile = createTsSourceFile(baseFile, content);
  const props = new Map<string, ExtractedProp>();

  const classDecls = sourceFile.statements.filter(
    (node): node is ts.ClassDeclaration => ts.isClassDeclaration(node),
  );

  for (const classDecl of classDecls) {
    for (const member of classDecl.members) {
      if (!ts.isPropertyDeclaration(member)) continue;
      if (!hasDecorator(member, "Input")) continue;
      if (!member.name || !ts.isIdentifier(member.name)) continue;

      const rawComment = findImmediateJsDocBefore(content, member.getStart(sourceFile));
      const propName = member.name.text;
      const optionalMarker = member.questionToken ? "?" : member.exclamationToken ? "!" : "";
      const rawDefault = member.initializer?.getText(sourceFile)?.trim();
      const rawType = cleanType(member.type?.getText(sourceFile)?.trim() || inferTypeFromDefault(rawDefault));
      const fullDescription = parseDescriptionFromJSDoc(rawComment);
      const { description, defaultValue: descriptionDefault } = extractDefaultFromDescription(fullDescription);
      const defaultValue = descriptionDefault ?? parseDefaultValue(rawDefault);

      props.set(propName, {
        name: propName,
        type: rawType,
        values: parseWrapperPropValues(rawType),
        required: optionalMarker === "!",
        default: defaultValue,
        description,
      });
    }
  }

  return props;
}

function findFirstFileByName(root: string, targetName: string): string | null {
  if (!fs.existsSync(root)) return null;
  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (entry.isFile() && entry.name === targetName) {
        return fullPath;
      }
    }
  }

  return null;
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findFirstFileContaining(
  root: string,
  extensions: string[],
  searchText: string,
): string | null {
  if (!fs.existsSync(root)) return null;
  const stack = [root];
  const searchPattern = new RegExp(
    `(?:<\\s*${escapeRegExp(searchText)}(?=[\\s>/])|["']${escapeRegExp(searchText)}["'])`,
  );

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (
        entry.isFile() &&
        extensions.some((ext) => entry.name.endsWith(ext)) &&
        !entry.name.includes(".spec.")
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (searchPattern.test(content)) {
          return fullPath;
        }
      }
    }
  }

  return null;
}

function findFirstFileMatchingPattern(
  root: string,
  extensions: string[],
  pattern: RegExp,
): string | null {
  if (!fs.existsSync(root)) return null;
  const stack = [root];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    const entries = fs.readdirSync(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (
        entry.isFile() &&
        extensions.some((ext) => entry.name.endsWith(ext)) &&
        !entry.name.includes(".spec.")
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        if (pattern.test(content)) {
          return fullPath;
        }
      }
    }
  }

  return null;
}

function extractReactWrapperApi(
  componentName: string,
  tagName: string,
  slotNames: string[],
  wrapperComponentName: string = componentName,
): WrapperExtraction {
  const reactRoot = path.join(WORKSPACE_ROOT, "libs/react-components/src/lib");
  const reactFileNameCandidates = [
    `${wrapperComponentName}.tsx`,
    `${wrapperComponentName.replace(/-/g, "")}.tsx`,
  ];
  const reactTagPattern = new RegExp(`<\\s*${escapeRegExp(tagName)}(?=[\\s>/])`);

  const reactFile =
    reactFileNameCandidates.map((name) => findFirstFileByName(reactRoot, name)).find(Boolean) ??
    findFirstFileMatchingPattern(reactRoot, [".tsx"], reactTagPattern) ??
    findFirstFileContaining(reactRoot, [".tsx"], tagName);

  if (!reactFile) return createEmptyWrapperExtraction();

  const content = fs.readFileSync(reactFile, "utf-8");
  const sourceFile = createTsSourceFile(reactFile, content);
  const interfaces = parseReactInterfaces(content, reactFile);
  const primaryInterfaceName = resolvePrimaryReactPropsInterface(wrapperComponentName, interfaces);
  if (!primaryInterfaceName) return createEmptyWrapperExtraction(true);

  const interfaceMembers = collectReactInterfaceMembers(primaryInterfaceName, interfaces, sourceFile);
  const componentParameterType = resolvePrimaryReactComponentParameterType(
    wrapperComponentName,
    sourceFile,
  );
  const componentParameterMembers = collectReactTypeNodeMembers(
    componentParameterType,
    interfaces,
    sourceFile,
    new Set<string>([primaryInterfaceName]),
  );
  const reactMembers = [...interfaceMembers, ...componentParameterMembers];
  const callbackAliases = extractReactCallbackAliases(sourceFile);

  const props: ExtractedProp[] = [];
  const events: ExtractedEvent[] = [];
  const slotDescriptions: Record<string, string> = {};
  const slotNameAliases: Record<string, string> = {};
  const slotRequired: Record<string, boolean> = {};

  for (const member of reactMembers) {
    if (!ts.isPropertySignature(member)) continue;
    if (!member.name || !ts.isIdentifier(member.name)) continue;

    const rawComment = findImmediateJsDocBefore(content, member.getStart(sourceFile));
    const propName = member.name.text;
    const optional = Boolean(member.questionToken);
    const rawType = cleanType(member.type?.getText(sourceFile)?.trim() || "any");
    const { internal, deprecated } = parseJSDocContent(rawComment || "");

    // Skip @deprecated props and internal-only props — not for public API docs
    if (deprecated || (internal && !shouldAllowInternalProp(componentName, propName))) continue;

    const fullDescription = parseDescriptionFromJSDoc(rawComment);
    const { description, defaultValue } = extractDefaultFromDescription(fullDescription);
    const isReadonly = isReadonlyDescription(description);
    const isRequired = !optional && !isReadonly;

    if (shouldSkipInternalProp(componentName, propName)) continue;

    const values = parseWrapperPropValues(rawType);
    const slotName = getMatchingSlotName(propName, slotNames);

    if (slotName && isSlotCarrierType(rawType)) {
      if (description) {
        slotDescriptions[slotName] = description;
      }
      slotNameAliases[slotName] = propName;
      slotRequired[slotName] = Boolean(slotRequired[slotName]) || isRequired;
      if (isPureSlotCarrierType(rawType)) {
        continue;
      }
    }

    if (
      propName.startsWith("on") &&
      (isReactCallbackAliasType(rawType, callbackAliases) || isFunctionType(rawType))
    ) {
      events.push({
        name: propName,
        type: isReactCallbackAliasType(rawType, callbackAliases)
          ? resolveReactCallbackEventType(rawType, callbackAliases)
          : rawType,
        description,
        frameworks: ["react"],
      });
      continue;
    }

    props.push({
      name: propName,
      type: rawType,
      values,
      required: isRequired,
      default: defaultValue,
      description,
    });
  }

  // Inject inherited margin props when the interface extends Margins
  if (hasReactMarginsInHierarchy(primaryInterfaceName, interfaces)) {
    const existingNames = new Set(props.map((p) => p.name));
    const marginProps: ExtractedProp[] = ["mt", "mr", "mb", "ml"]
      .filter((name) => !existingNames.has(name))
      .map((name) => ({
        name,
        type: "Spacing",
        required: false,
        default: null,
        description: "",
      }));
    props.push(...marginProps);
  }

  const dedupedProps = dedupeByName(props).sort((a, b) => a.name.localeCompare(b.name));
  const dedupedEvents = dedupeByName(events).sort((a, b) => a.name.localeCompare(b.name));

  return {
    found: true,
    props: dedupedProps,
    events: dedupedEvents,
    slotDescriptions,
    slotNameAliases,
    slotRequired,
  };
}

function extractAngularWrapperApi(
  componentName: string,
  tagName: string,
  slotNames: string[],
  wrapperComponentName: string = componentName,
): WrapperExtraction {
  const angularRoot = path.join(WORKSPACE_ROOT, "libs/angular-components/src/lib/components");
  const angularSelector = tagName.replace(/^goa-/, "goab-");
  const angularFileNameCandidates = [
    `${wrapperComponentName}.ts`,
    `${wrapperComponentName.replace(/-/g, "")}.ts`,
  ];
  const angularSelectorPattern = new RegExp(`selector\\s*:\\s*["']${escapeRegExp(angularSelector)}["']`);
  const angularTagPattern = new RegExp(`<\\s*${escapeRegExp(tagName)}(?=[\\s>/])`);

  const angularFile =
    angularFileNameCandidates
      .map((name) => findFirstFileByName(angularRoot, name))
      .find(Boolean) ??
    findFirstFileMatchingPattern(angularRoot, [".ts"], angularSelectorPattern) ??
    findFirstFileMatchingPattern(angularRoot, [".ts"], angularTagPattern) ??
    findFirstFileContaining(angularRoot, [".ts"], tagName);

  if (!angularFile) return createEmptyWrapperExtraction();

  const content = fs.readFileSync(angularFile, "utf-8");
  const sourceFile = createTsSourceFile(angularFile, content);

  const props: ExtractedProp[] = [];
  const events: ExtractedEvent[] = [];
  const slotDescriptions: Record<string, string> = {};
  const slotNameAliases: Record<string, string> = {};
  const slotRequired: Record<string, boolean> = {};

  const classDecl = sourceFile.statements.find(
    (node): node is ts.ClassDeclaration => ts.isClassDeclaration(node) && hasDecorator(node, "Component"),
  );

  if (!classDecl) return createEmptyWrapperExtraction(true);

  for (const member of classDecl.members) {
    if (!ts.isPropertyDeclaration(member)) continue;
    if (!member.name || !ts.isIdentifier(member.name)) continue;

    const inputDecorator = getDecoratorCall(member, "Input");
    if (!inputDecorator && !hasDecorator(member, "Input")) continue;

    const rawComment = findImmediateJsDocBefore(content, member.getStart(sourceFile));
    const { internal, deprecated } = parseJSDocContent(rawComment || "");
    const inputConfig = inputDecorator?.arguments[0]?.getText(sourceFile) || "";
    const propName = member.name.text;
    const optionalMarker = member.questionToken ? "?" : member.exclamationToken ? "!" : "";
    const rawDefault = member.initializer?.getText(sourceFile)?.trim();
    const rawType = cleanType(member.type?.getText(sourceFile)?.trim() || inferTypeFromDefault(rawDefault));

    const fullDescription = parseDescriptionFromJSDoc(rawComment);
    const { description, defaultValue: descriptionDefault } = extractDefaultFromDescription(fullDescription);
    const isReadonly = isReadonlyDescription(description);
    const isRequiredByDecorator = /required\s*:\s*true/.test(inputConfig);
    const required = !isReadonly && (isRequiredByDecorator || optionalMarker === "!" || (optionalMarker !== "?" && rawDefault === undefined));

    // Skip @deprecated props and internal-only props — not for public API docs
    if (deprecated || (internal && !shouldAllowInternalProp(componentName, propName))) continue;

    if (shouldSkipInternalProp(componentName, propName)) continue;

    const values = parseWrapperPropValues(rawType);
    const slotName = getMatchingSlotName(propName, slotNames);

    if (slotName && isSlotCarrierType(rawType)) {
      if (description) {
        slotDescriptions[slotName] = description;
      }
      slotNameAliases[slotName] = propName;
      slotRequired[slotName] = Boolean(slotRequired[slotName]) || required;
      if (isPureSlotCarrierType(rawType)) {
        continue;
      }
    }

    const defaultValue = descriptionDefault ?? parseDefaultValue(rawDefault);

    props.push({
      name: propName,
      type: rawType,
      values,
      required,
      default: defaultValue,
      description,
    });
  }

  for (const member of classDecl.members) {
    if (!ts.isPropertyDeclaration(member)) continue;
    if (!member.name || !ts.isIdentifier(member.name)) continue;
    const outputDecorator = getDecoratorCall(member, "Output");
    if (!outputDecorator && !hasDecorator(member, "Output")) continue;

    const rawComment = findImmediateJsDocBefore(content, member.getStart(sourceFile));
    const { deprecated: eventDeprecated } = parseJSDocContent(rawComment || "");
    if (eventDeprecated) continue;

    const eventName = member.name.text;
    let eventType = "void";

    if (member.type && ts.isTypeReferenceNode(member.type)) {
      const typeName = member.type.typeName.getText(sourceFile);
      if (typeName.endsWith("EventEmitter")) {
        eventType = member.type.typeArguments?.[0]?.getText(sourceFile)?.trim() || "void";
      }
    }

    if (
      (eventType === "void" || eventType === "CustomEvent") &&
      member.initializer &&
      ts.isNewExpression(member.initializer)
    ) {
      const expr = member.initializer;
      const ctorName = expr.expression.getText(sourceFile);
      if (ctorName.endsWith("EventEmitter")) {
        eventType = expr.typeArguments?.[0]?.getText(sourceFile)?.trim() || "void";
      }
    }

    const description = parseDescriptionFromJSDoc(rawComment);

    events.push({
      name: eventName,
      type: toEventCallbackType(eventType),
      description,
      frameworks: ["angular"],
    });
  }

  // Inject inherited props when the class extends common Angular base wrappers.
  const extendsName = classDecl.heritageClauses
    ?.find((clause) => clause.token === ts.SyntaxKind.ExtendsKeyword)
    ?.types?.[0]
    ?.expression
    ?.getText(sourceFile);

  if (extendsName && (extendsName === "GoabBaseComponent" || extendsName === "GoabControlValueAccessor")) {
    const existingNames = new Set(props.map((p) => p.name));
    const baseComponentProps = extractAngularBaseComponentProps();
    const inheritedPropNames =
      extendsName === "GoabControlValueAccessor"
        ? ["id", "disabled", "error", "value", "mt", "mr", "mb", "ml", "testId"]
        : ["mt", "mr", "mb", "ml", "testId"];

    const baseProps = inheritedPropNames
      .map((name) => baseComponentProps.get(name))
      .filter((prop): prop is ExtractedProp => Boolean(prop))
      .filter((prop) => !existingNames.has(prop.name));

    props.push(...baseProps);
  }

  const dedupedProps = dedupeByName(props).sort((a, b) => a.name.localeCompare(b.name));
  const dedupedEvents = dedupeByName(events).sort((a, b) => a.name.localeCompare(b.name));

  return {
    found: true,
    props: dedupedProps,
    events: dedupedEvents,
    slotDescriptions,
    slotNameAliases,
    slotRequired,
  };
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

function inferDetailPropertyType(key: string, expression: string): string {
  const expr = expression.trim();
  const lowerKey = key.toLowerCase();

  if (lowerKey === "name") return "string";
  if (lowerKey === "label") return "string";
  if (lowerKey === "labels") return "string[]";
  if (lowerKey === "sortby") return "string";
  if (lowerKey === "sortdir") return "number";
  if (lowerKey === "sorts") return '{ column: string; direction: "asc" | "desc" }[]';
  if (lowerKey === "tab") return "number";
  if (lowerKey === "page") return "number";
  if (lowerKey === "url") return "string";
  if (lowerKey === "values") return "string[]";

  if (lowerKey === "value") {
    if (/newselectedvalues|array\.from\s*\(/i.test(expr)) return "string[]";
    if (/_date\.date/.test(expr)) return "Date | string | null";
    if (/\binput\.value\b/.test(expr)) return "string";
    if (/\.value\b/.test(expr) && !/\bdetail\.value\b/.test(expr)) return "string";
    if (/\boutput\b/.test(expr)) return "string";
    if (/^newvalue$/i.test(expr)) return "string";
    if (/^_?value$/.test(expr)) return "string";
    if (/detail\.value/.test(expr)) return "string | unknown[]";
  }

  if (lowerKey === "valuestr") return "string";
  if (lowerKey === "key") {
    if (/\.key\b/.test(expr)) return "string";
  }
  if (lowerKey === "action") {
    if (/\.action\b/.test(expr)) return "string";
  }
  if (lowerKey === "size") {
    if (/\.size\b/.test(expr)) return '"normal" | "compact"';
  }

  if (expr === "true" || expr === "false") return "boolean";
  if (/^[-+]?\d+(\.\d+)?$/.test(expr)) return "number";
  if (/^["'`].*["'`]$/.test(expr)) return "string";
  if (/^\{[\s\S]*\}$/.test(expr)) return "Record<string, unknown>";
  if (/^\[[\s\S]*\]$/.test(expr)) return "unknown[]";
  if (/\b(open|checked|disabled|selected|expanded|collapsed|visible|active)\b/i.test(expr)) {
    return "boolean";
  }
  if (/(open|checked|disabled|selected|expanded|collapsed|visible|active)/.test(lowerKey)) {
    return "boolean";
  }
  if (/\b(event|e)\b/.test(expr)) return "Event";

  return "unknown";
}

function inferDetailPropertyOptional(key: string, expression: string): boolean {
  const expr = expression.trim();
  const lowerKey = key.toLowerCase();

  if (
    (lowerKey === "action" || lowerKey === "size") &&
    /\baction\.(action|size)\b/.test(expr)
  ) {
    return true;
  }

  return false;
}

function buildCustomEventTypeFromDetail(detailObjectLiteral: string): string {
  const objectBody = detailObjectLiteral.replace(/^\{\s*|\s*\}$/g, "");
  if (!objectBody) return "CustomEvent<void>";

  const parsedMembers = objectBody
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const keyValueMatch = part.match(/^([A-Za-z_$][\w$]*)\s*:\s*([\s\S]+)$/);
      if (keyValueMatch) {
        const key = keyValueMatch[1];
        const value = keyValueMatch[2].trim();
        return {
          key,
          type: inferDetailPropertyType(key, value),
          optional: inferDetailPropertyOptional(key, value),
        };
      }

      const shorthandMatch = part.match(/^([A-Za-z_$][\w$]*)$/);
      if (shorthandMatch) {
        const key = shorthandMatch[1];
        return { key, type: inferDetailPropertyType(key, key), optional: false };
      }

      return null;
    })
    .filter((member): member is { key: string; type: string; optional: boolean } =>
      Boolean(member),
    );

  if (!parsedMembers.length) return "CustomEvent<Record<string, unknown>>";

  // Cross-field heuristics for common patterns in component events.
  const hasLabels = parsedMembers.some((m) => m.key.toLowerCase() === "labels");
  const hasValueStr = parsedMembers.some((m) => m.key.toLowerCase() === "valuestr");

  const members = parsedMembers.map((member) => {
    if (member.key.toLowerCase() === "value") {
      if (hasLabels) {
        return `${member.key}${member.optional ? "?" : ""}: string[]`;
      }
      if (hasValueStr) {
        return `${member.key}${member.optional ? "?" : ""}: Date | string | null`;
      }
    }
    return `${member.key}${member.optional ? "?" : ""}: ${member.type}`;
  });

  return `CustomEvent<{ ${members.join("; ")} }>`;
}

function scoreCustomEventType(eventType: string): number {
  if (eventType === "CustomEvent" || eventType === "CustomEvent<Record<string, unknown>>" || eventType === "CustomEvent<void>") {
    return 0;
  }

  const detailMatch = eventType.match(/CustomEvent<\{([\s\S]*)\}>/);
  if (!detailMatch?.[1]) return 0;

  const body = detailMatch[1];
  const keyCount = body.split(";").filter((part) => part.trim().length > 0).length;
  const unknownCount = (body.match(/\bunknown\b/g) || []).length;

  return keyCount * 10 - unknownCount * 6;
}

function splitTopLevelArgs(argsSource: string): string[] {
  const parts: string[] = [];
  let current = "";
  let parenDepth = 0;
  let braceDepth = 0;
  let bracketDepth = 0;
  let inString = false;
  let stringQuote = "";

  for (let i = 0; i < argsSource.length; i++) {
    const ch = argsSource[i];
    const prev = i > 0 ? argsSource[i - 1] : "";

    if (inString) {
      current += ch;
      if (ch === stringQuote && prev !== "\\") {
        inString = false;
        stringQuote = "";
      }
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      inString = true;
      stringQuote = ch;
      current += ch;
      continue;
    }

    if (ch === "(") parenDepth++;
    else if (ch === ")") parenDepth--;
    else if (ch === "{") braceDepth++;
    else if (ch === "}") braceDepth--;
    else if (ch === "[") bracketDepth++;
    else if (ch === "]") bracketDepth--;

    if (ch === "," && parenDepth === 0 && braceDepth === 0 && bracketDepth === 0) {
      parts.push(current.trim());
      current = "";
      continue;
    }

    current += ch;
  }

  if (current.trim().length > 0) {
    parts.push(current.trim());
  }

  return parts;
}

function getCustomEventType(eventName: string, content: string): string {
  const escapedName = escapeRegExp(eventName);
  const eventPattern = new RegExp(
    `new\\s+CustomEvent\\s*\\(\\s*["']${escapedName}["']\\s*,\\s*\\{([\\s\\S]*?)\\}\\s*\\)`,
    "g",
  );

  const dispatchCallStartPattern = /dispatch(?:<[^>]+>)?\s*\(/g;

  const detailLiterals: string[] = [];

  for (const match of content.matchAll(eventPattern)) {
    const eventOptions = match[1];
    const detailMatch = eventOptions.match(/detail\s*:\s*(\{[\s\S]*?\})/);
    if (detailMatch?.[1]) {
      detailLiterals.push(detailMatch[1]);
    }
  }

  for (const match of content.matchAll(dispatchCallStartPattern)) {
    const startIndex = match.index ?? -1;
    if (startIndex < 0) continue;

    const openParenIndex = startIndex + match[0].length - 1;
    let depth = 0;
    let endIndex = -1;

    for (let i = openParenIndex; i < content.length; i++) {
      const ch = content[i];
      if (ch === "(") depth++;
      if (ch === ")") {
        depth--;
        if (depth === 0) {
          endIndex = i;
          break;
        }
      }
    }

    if (endIndex === -1) continue;

    const callArgsSource = content.slice(openParenIndex + 1, endIndex);
    const args = splitTopLevelArgs(callArgsSource);
    if (args.length < 3) continue;

    const eventArg = args[1].trim();
    const eventMatch = eventArg.match(/^["']([^"']+)["']$/);
    if (!eventMatch || eventMatch[1] !== eventName) continue;

    const detailLiteral = args[2].trim();
    if (detailLiteral.startsWith("{") && detailLiteral.endsWith("}")) {
      detailLiterals.push(detailLiteral);
    }
  }

  let bestEventType = "CustomEvent<Record<string, unknown>>";
  let bestScore = -1;

  for (const literal of detailLiterals) {
    const typed = buildCustomEventTypeFromDetail(literal);
    const score = scoreCustomEventType(typed);
    if (score > bestScore) {
      bestScore = score;
      bestEventType = typed;
    }
  }

  if (detailLiterals.length > 0) {
    return bestEventType;
  }

  return "CustomEvent";
}

function transformWebComponentEvents(
  componentName: string,
  rawEventNames: string[],
  content: string,
): ExtractedEvent[] {
  const internalOverrides = WEB_COMPONENT_INTERNAL_EVENT_OVERRIDES[componentName] || new Set<string>();
  const typeOverrides = WEB_COMPONENT_EVENT_TYPE_OVERRIDES[componentName] || {};

  return rawEventNames
    .filter((rawName) => !INTERNAL_EVENT_NAMES.has(rawName) && !internalOverrides.has(rawName))
    .filter((rawName) => !rawName.includes("::") && !rawName.includes(":"))
    .map((rawName) => ({
      name: rawName,
      type: typeOverrides[rawName] || getCustomEventType(rawName, content),
      description: "",
      frameworks: ["webComponents"],
    }));
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

function getAllComponentNames(): string[] {
  const componentNames = new Set<string>();
  const documentedComponentSlugs = new Set(
    fs
      .readdirSync(DOCS_COMPONENT_CONTENT_PATH, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => entry.name.replace(/\.mdx$/, "")),
  );
  const stack = [UI_COMPONENTS_PATH];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;

    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (
        entry.isFile() &&
        entry.name.endsWith(".svelte") &&
        !entry.name.includes(".test.")
      ) {
        const content = fs.readFileSync(fullPath, "utf-8");
        const slug = toKebabCase(path.basename(entry.name, ".svelte"));
        if (
          extractTagName(content) &&
          documentedComponentSlugs.has(slug) &&
          !DOCS_EXCLUDED_COMPONENTS.has(slug)
        ) {
          componentNames.add(slug);
        }
      }
    }
  }

  for (const forcedComponent of DOCS_FORCED_COMPONENTS) {
    componentNames.add(forcedComponent);
  }

  return Array.from(componentNames).sort((a, b) => a.localeCompare(b));
}

function removeStaleApiFiles(validComponentNames: string[]): void {
  if (!fs.existsSync(OUTPUT_PATH)) return;

  const validFiles = new Set(validComponentNames.map((name) => `${name}.json`));
  const entries = fs.readdirSync(OUTPUT_PATH, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile() && entry.name.endsWith(".json") && !validFiles.has(entry.name)) {
      fs.unlinkSync(path.join(OUTPUT_PATH, entry.name));
      console.log(`  Removed stale file: ${entry.name}`);
    }
  }
}

// =============================================================================
// Main Extraction
// =============================================================================

function extractComponentAPI(componentName: string): ExtractedComponentAPI | null {
  const componentPath = path.join(UI_COMPONENTS_PATH, componentName);

  // Find the Svelte file by the component's public name first, then fall back
  // to any .svelte file inside a matching directory.
  const svelteFileName = `${capitalize(toCamelCase(componentName))}.svelte`;
  let svelteFilePath = findFirstFileByName(UI_COMPONENTS_PATH, svelteFileName);

  if (!svelteFilePath && fs.existsSync(componentPath) && fs.statSync(componentPath).isDirectory()) {
    const files = fs.readdirSync(componentPath);
    const svelteFile = files.find((f) => f.endsWith(".svelte"));
    if (svelteFile) {
      svelteFilePath = path.join(componentPath, svelteFile);
    }
  }

  if (!svelteFilePath) {
    console.error(`No Svelte file found for: ${componentName}`);
    return null;
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
  let eventContent = content;
  let rawEventNames = extractEvents(content);
  const explicitEventsByComponent: Record<string, Set<string>> = {
    "file-upload-card": new Set(["_cancel", "_delete"]),
  };
  const explicitEvents = explicitEventsByComponent[componentName];
  if (explicitEvents) {
    rawEventNames = Array.from(new Set([...rawEventNames, ...explicitEvents]));
  }
  const companionEventsByComponent: Record<string, Set<string>> = {
    "work-side-menu": new Set(["_navigate"]),
    "push-drawer": new Set(["_close"]),
  };
  const companionEvents = companionEventsByComponent[componentName];

  if (companionEvents) {
    const componentDir = path.dirname(svelteFilePath);
    const siblingFiles = fs
      .readdirSync(componentDir)
      .filter((name) => name.endsWith(".svelte") && path.join(componentDir, name) !== svelteFilePath);

    for (const siblingFile of siblingFiles) {
      const siblingPath = path.join(componentDir, siblingFile);
      const siblingContent = fs.readFileSync(siblingPath, "utf-8");
      const siblingEventNames = extractEvents(siblingContent).filter((eventName) => companionEvents.has(eventName));
      if (siblingEventNames.length > 0) {
        rawEventNames = [...rawEventNames, ...siblingEventNames];
        eventContent += `\n${siblingContent}`;
      }
    }

    rawEventNames = Array.from(new Set(rawEventNames));
  }
  const slotNames = extractSlots(content);
  const wrapperComponentName = WRAPPER_COMPONENT_ALIASES[componentName] ?? componentName;
  const reactWrapper = extractReactWrapperApi(componentName, tagName, slotNames, wrapperComponentName);
  const angularWrapper = extractAngularWrapperApi(componentName, tagName, slotNames, wrapperComponentName);

  // Default slot content is implied by usage examples and is intentionally omitted
  // from the API docs to reduce noise.

  // Transform to output format
  let webComponentProps: ExtractedProp[] = rawProps.map((p) => ({
    name: p.name,
    type: p.type,
    typeLabel: p.typeLabel,
    values: p.values,
    required: p.required,
    default: p.default,
    description: p.description, // From JSDoc comments in source
    ...(p.deprecated && { deprecated: true }),
  }));

  let webComponentEvents = transformWebComponentEvents(componentName, rawEventNames, eventContent);
  if (componentName === "side-menu-group") {
    webComponentEvents = webComponentEvents.filter((event) => event.name !== "_open");
  }
  const slotDescriptions = {
    ...angularWrapper.slotDescriptions,
    ...reactWrapper.slotDescriptions,
  };
  const slotNameAliases = {
    ...angularWrapper.slotNameAliases,
    ...reactWrapper.slotNameAliases,
  };
  const slotRequired = {
    ...angularWrapper.slotRequired,
    ...reactWrapper.slotRequired,
  };

  const hasWrapperSlotEvidence = (name: string): boolean =>
    Boolean(slotNameAliases[name] || slotDescriptions[name]) ||
    Object.prototype.hasOwnProperty.call(slotRequired, name);

  const createSlots = (
    framework: "react" | "angular" | "webComponents",
    type?: string,
    useAliasNames: boolean = true,
  ): ExtractedSlot[] =>
    slotNames
      .filter(
        (name) =>
          !INTERNAL_SLOT_NAMES.has(name.toLowerCase()) &&
          !(name === "content" && !slotNameAliases[name] && !slotDescriptions[name]),
      )
      .map((name) => {
        const rawDescription = slotDescriptions[name] || "";
        const description =
          framework === "angular"
            ? rawDescription.replace(/ReactNode/g, "ngTemplate")
            : rawDescription;
        return {
          name: useAliasNames ? slotNameAliases[name] || name : name,
          type:
            SLOT_TYPE_OVERRIDES[componentName]?.[framework]?.[name] ||
            (type && hasWrapperSlotEvidence(name) ? type : undefined),
          description,
          required: slotRequired[name] || false,
        };
      });

  const reactSlots = createSlots("react", "ReactNode", true);
  const angularSlots = createSlots("angular", "TemplateRef", true);
  const webComponentSlots = createSlots("webComponents", undefined, false);

  let reactProps: ExtractedProp[] = reactWrapper.found ? [...reactWrapper.props] : [];
  let angularProps: ExtractedProp[] = angularWrapper.found ? [...angularWrapper.props] : [];

  if (componentName === "dropdown") {
    const dropdownItemApi = extractComponentAPI("dropdown-item");
    if (dropdownItemApi) {
      const withDropdownItemPrefix = (
        props: ExtractedProp[],
        prefix: string,
        kebabCase: boolean = false,
      ): ExtractedProp[] =>
        props.map((prop) => ({
          ...prop,
          name: kebabCase
            ? `${prefix}-${prop.name}`
            : `${prefix}${prop.name.charAt(0).toUpperCase()}${prop.name.slice(1)}`,
          description: `Applies to goab-dropdown-item.${prop.description ? ` ${prop.description}` : ""}`,
        }));

      reactProps = reactProps.concat(
        withDropdownItemPrefix(dropdownItemApi.frameworks.react.props, "item", false),
      );
      angularProps = angularProps.concat(
        withDropdownItemPrefix(dropdownItemApi.frameworks.angular.props, "item", false),
      );
      webComponentProps = webComponentProps.concat(
        withDropdownItemPrefix(dropdownItemApi.frameworks.webComponents.props, "item", true),
      );
    }
  }

  specializeAngularValuePropFromReact(angularProps, reactProps);

  const webComponentVersionProp = webComponentProps.find(
    (prop) => prop.name.toLowerCase() === "version",
  );
  const hideVersionOutsideWeb = isStandardV1V2VersionProp(webComponentVersionProp);

  reactProps = reactProps.filter(
    (prop) =>
      !shouldSkipInternalProp(componentName, prop.name) &&
      !(hideVersionOutsideWeb && prop.name.toLowerCase() === "version"),
  );
  angularProps = angularProps.filter(
    (prop) =>
      !shouldSkipInternalProp(componentName, prop.name) &&
      !(hideVersionOutsideWeb && prop.name.toLowerCase() === "version"),
  );
  webComponentProps = webComponentProps.filter(
    (prop) => prop.name.toLowerCase() === "version" || !shouldSkipInternalProp(componentName, prop.name),
  );

  reactProps = dedupeByName(reactProps).sort((a, b) => a.name.localeCompare(b.name));
  angularProps = dedupeByName(angularProps).sort((a, b) => a.name.localeCompare(b.name));

  webComponentProps.sort((a, b) => a.name.localeCompare(b.name));
  webComponentEvents.sort((a, b) => a.name.localeCompare(b.name));
  reactSlots.sort((a, b) => a.name.localeCompare(b.name));
  angularSlots.sort((a, b) => a.name.localeCompare(b.name));
  webComponentSlots.sort((a, b) => a.name.localeCompare(b.name));

  // Relative path from workspace root
  const relativePath = path.relative(WORKSPACE_ROOT, svelteFilePath);

  return {
    componentSlug: toKebabCase(componentName),
    extractedFrom: relativePath,
    frameworks: {
      react: {
        props: reactWrapper.found ? reactProps : [],
        events: reactWrapper.found ? reactWrapper.events : [],
        slots: reactWrapper.found ? reactSlots : [],
      },
      angular: {
        props: angularWrapper.found ? angularProps : [],
        events: angularWrapper.found ? angularWrapper.events : [],
        slots: angularWrapper.found ? angularSlots : [],
      },
      webComponents: {
        props: webComponentProps,
        events: webComponentEvents,
        slots: webComponentSlots,
      },
    },
  };
}

function mergeItemArray<T extends { name: string; description: string }>(
  next: T[],
  existing: T[],
  context: string,
): T[] {
  const existingByName = new Map(existing.map((item) => [item.name, item]));
  const nextNames = new Set(next.map((item) => item.name));

  // Backfill non-empty descriptions from existing into new items that have empty ones
  const merged: T[] = next.map((item) => {
    const existingItem = existingByName.get(item.name);
    if (existingItem && !item.description && existingItem.description) {
      return { ...item, description: existingItem.description };
    }
    return item;
  });

  // Preserve items from existing that are absent in the new extraction
  for (const existingItem of existing) {
    if (!nextNames.has(existingItem.name)) {
      console.warn(
        `  Preserved manually-added entry "${existingItem.name}" in ${context} (not found in extraction — check source)`,
      );
      merged.push(existingItem);
    }
  }

  return merged.sort((a, b) => a.name.localeCompare(b.name));
}

function mergeWithExisting(
  next: ExtractedComponentAPI,
  existing: ExtractedComponentAPI,
): ExtractedComponentAPI {
  const fw = next.frameworks;
  const ex = existing.frameworks;
  return {
    ...next,
    frameworks: {
      react: {
        props: mergeItemArray(fw.react.props, ex.react.props, `${next.componentSlug}.json [react props]`),
        events: mergeItemArray(fw.react.events, ex.react.events, `${next.componentSlug}.json [react events]`),
        slots: mergeItemArray(fw.react.slots, ex.react.slots, `${next.componentSlug}.json [react slots]`),
      },
      angular: {
        props: mergeItemArray(fw.angular.props, ex.angular.props, `${next.componentSlug}.json [angular props]`),
        events: mergeItemArray(fw.angular.events, ex.angular.events, `${next.componentSlug}.json [angular events]`),
        slots: mergeItemArray(fw.angular.slots, ex.angular.slots, `${next.componentSlug}.json [angular slots]`),
      },
      webComponents: {
        props: mergeItemArray(fw.webComponents.props, ex.webComponents.props, `${next.componentSlug}.json [webComponents props]`),
        events: mergeItemArray(fw.webComponents.events, ex.webComponents.events, `${next.componentSlug}.json [webComponents events]`),
        slots: mergeItemArray(fw.webComponents.slots, ex.webComponents.slots, `${next.componentSlug}.json [webComponents slots]`),
      },
    },
  };
}

function saveComponentAPI(api: ExtractedComponentAPI): void {
  // Ensure output directory exists
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  const filePath = path.join(OUTPUT_PATH, `${api.componentSlug}.json`);

  // Merge with existing file to preserve manually-added entries that the extractor
  // cannot see (e.g. props defined in function-level intersections, or wrapper gaps).
  let merged = api;
  if (fs.existsSync(filePath)) {
    try {
      const existing = JSON.parse(fs.readFileSync(filePath, "utf-8")) as ExtractedComponentAPI;
      merged = mergeWithExisting(api, existing);
    } catch {
      // Malformed existing file — overwrite with fresh extraction
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(merged, null, 2));
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
    componentNames = getAllComponentNames();
    removeStaleApiFiles(componentNames);
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
