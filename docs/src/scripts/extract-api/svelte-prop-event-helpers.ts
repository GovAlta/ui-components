import {
  buildJSDocMap,
  isReadonlyDescription,
} from "./svelte-jsdoc-tag-helpers";
import type { ValidatorInfo } from "./svelte-jsdoc-tag-helpers";

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

function extractCustomElementPropAttributeMap(content: string): Map<string, string> {
  const map = new Map<string, string>();
  const optionsTagMatch = content.match(/<svelte:options[\s\S]*?\/>/);
  if (!optionsTagMatch) return map;

  const optionsTag = optionsTagMatch[0];
  const propAttributeMatches = optionsTag.matchAll(
    /(?:^|\n)\s*(\w+)\s*:\s*\{[^{}]*attribute\s*:\s*["']([^"']+)["'][^{}]*\}/g,
  );

  for (const match of propAttributeMatches) {
    map.set(match[1], match[2]);
  }

  return map;
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

function cleanType(type: string): string {
  return type
    .replace(/\s+/g, " ")
    .replace(/\(\s*typeof\s+\w+\s*\)\s*\[\s*number\s*\]/g, "")
    .trim();
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

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function toCamelCase(str: string): string {
  return str
    .split("-")
    .map((part, index) => (index === 0 ? part : capitalize(part)))
    .join("");
}

function generateTypeLabel(
  componentName: string,
  typeName: string,
  _validatorData: ValidatorInfo,
): string {
  const componentPart = capitalize(toCamelCase(componentName));
  let typePart = typeName.replace(/s$/, "");

  const lowerComponent = componentPart.toLowerCase();
  const lowerType = typePart.toLowerCase();
  if (lowerType.startsWith(lowerComponent)) {
    return `Goab${typePart}`;
  }

  return `Goab${componentPart}${typePart}`;
}

function extractProps(
  content: string,
  validators: Map<string, ValidatorInfo>,
  componentName: string,
  typeAliases: Map<string, string[]>,
): ParsedPropRaw[] {
  const props: ParsedPropRaw[] = [];
  const customElementPropAttributeMap = extractCustomElementPropAttributeMap(content);
  const jsDocMap = buildJSDocMap(content);

  const propMatches = content.matchAll(
    /export\s+let\s+(\w+)(?:\s*:\s*([^=;]+?))?(?:\s*=\s*([^;]+?))?;/g,
  );

  for (const match of propMatches) {
    const rawName = match[1];
    const defaultStr = match[3]?.trim();
    let type = match[2]?.trim() || inferTypeFromDefault(defaultStr);

    if (rawName.startsWith("_")) continue;

    const name = customElementPropAttributeMap.get(rawName) || rawName.toLowerCase();
    let typeLabel: string | undefined;
    let values: string[] | undefined;

    if (validators.has(type)) {
      const validatorData = validators.get(type)!;
      values = validatorData.values;
      typeLabel = generateTypeLabel(componentName, type, validatorData);
      type = values.map((v) => `"${v}"`).join(" | ");
    }

    if (type.includes("GoAIconType") || type.includes("GoaIconType")) {
      typeLabel = "GoabIconType";
      type = "GoabIconType";
    } else if (type === "Spacing" || type.includes("Spacing")) {
      typeLabel = "Spacing";
      type = "Spacing";
    }

    const defaultValue = parseDefaultValue(defaultStr);

    let isBooleanProp = false;
    if (type === "string" && (defaultValue === "true" || defaultValue === "false")) {
      type = "boolean";
      isBooleanProp = true;
    }

    {
      const members = type
        .split("|")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);
      const expanded: string[] = [];
      let didResolve = false;

      for (const member of members) {
        const clean = member.replace(/["']/g, "");
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

    if (!values && type.includes("|") && !type.includes("typeof")) {
      values = type
        .split("|")
        .map((v) => v.trim().replace(/["']/g, ""))
        .filter((v) => v.length > 0 && !v.includes("("));
    }

    const jsDocInfo = jsDocMap.get(rawName);
    if (jsDocInfo?.internal) continue;
    if (jsDocInfo?.deprecated) continue;

    const description = jsDocInfo?.description || "";
    const isReadonly = isReadonlyDescription(description);
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

function isPrecededByInternalAnnotation(content: string, index: number): boolean {
  const before = content.slice(0, index);
  const lastNewline = before.lastIndexOf("\n");
  const prevLineEnd = lastNewline === -1 ? 0 : lastNewline;
  const secondLastNewline = before.lastIndexOf("\n", prevLineEnd - 1);
  const prevLine = before.slice(secondLastNewline + 1, prevLineEnd).trim();
  return prevLine === "// @internal";
}

function extractEvents(content: string): string[] {
  const eventNames = new Set<string>();

  const dispatchMatches = content.matchAll(/dispatch\s*\(\s*[^,]+,\s*["']([^"']+)["']/g);
  for (const match of dispatchMatches) {
    const eventName = match[1];
    if (eventName.includes("::")) continue;
    if (isPrecededByInternalAnnotation(content, match.index ?? 0)) continue;
    eventNames.add(eventName);
  }

  const customEventMatches = content.matchAll(
    /dispatchEvent\s*\(\s*(?:\/\/[^\n]*)?\s*new\s+CustomEvent\s*\(\s*["']([^"']+)["']/g,
  );
  for (const match of customEventMatches) {
    const eventName = match[1];
    if (eventName.includes("::")) continue;
    if (isPrecededByInternalAnnotation(content, match.index ?? 0)) continue;
    eventNames.add(eventName);
  }

  return Array.from(eventNames);
}

function extractSlots(content: string): string[] {
  const slotNames: string[] = [];
  const seenNames = new Set<string>();

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

export { extractEvents, extractProps, extractSlots };
export type { ParsedPropRaw };
