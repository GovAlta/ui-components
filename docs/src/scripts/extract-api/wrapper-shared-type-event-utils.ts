import { escapeRegExp } from "./fs-search";
import type { ReactCallbackAliasInfo, WrapperExtraction } from "./wrapper-shared-types-jsdoc";

function capitalize(value: string): string {
  return value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);
}

function toCamelCase(value: string): string {
  return value.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

function cleanType(type: string): string {
  return type.replace(/\s+/g, " ").trim();
}

function inferTypeFromDefault(value: string | null | undefined): string {
  if (value === null || value === undefined || value.length === 0) return "unknown";
  if (/^(true|false)$/.test(value)) return "boolean";
  if (/^[-+]?\d+(?:\.\d+)?$/.test(value)) return "number";
  return "string";
}

function parseDefaultValue(value: string | null | undefined): string | null {
  if (value === null || value === undefined) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function parseWrapperPropValues(type: string): string[] | undefined {
  const unionMatch = type.match(/^(.+?)\s*\|\s*(.+)$/);
  if (!unionMatch) return undefined;

  return type
    .split("|")
    .map((part) => part.trim())
    .filter((part) => part.length > 0 && part !== "null" && part !== "undefined");
}

function dedupeByName<T extends { name: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
}

function getMatchingSlotName(propName: string, slotNames: string[]): string | null {
  if (slotNames.includes(propName)) return propName;

  const normalizedProp = propName.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
  const exactMatch = slotNames.find((slotName) => slotName === normalizedProp);
  if (exactMatch) return exactMatch;

  const lowerProp = propName.toLowerCase();
  const normalizedMatch = slotNames.find((slotName) => slotName.toLowerCase() === lowerProp);
  if (normalizedMatch) return normalizedMatch;

  return null;
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

export {
  capitalize,
  cleanType,
  createEmptyWrapperExtraction,
  dedupeByName,
  getMatchingSlotName,
  inferTypeFromDefault,
  isFunctionType,
  isPureSlotCarrierType,
  isReactCallbackAliasType,
  isSlotCarrierType,
  parseDefaultValue,
  parseWrapperPropValues,
  resolveReactCallbackEventType,
  toCamelCase,
  toEventCallbackType,
};
