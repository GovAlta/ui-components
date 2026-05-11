import * as path from "path";
import { fileURLToPath } from "url";

interface ExtractedProp {
  name: string;
  type: string;
  values?: string[];
  required: boolean;
  default: string | null;
  description: string;
}

interface ExtractedEvent {
  name: string;
  type: string;
  description: string;
  frameworks: ("react" | "angular" | "webComponents")[];
}

interface WrapperExtraction {
  found: boolean;
  props: ExtractedProp[];
  events: ExtractedEvent[];
  slotDescriptions: Record<string, string>;
  slotNameAliases: Record<string, string>;
  slotRequired: Record<string, boolean>;
}

interface ReactCallbackAliasInfo {
  typeParam?: string;
  defaultTypeArg?: string;
  detailType: string;
}

const WORKSPACE_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");

function parseJSDocContent(content: string): { internal: boolean; deprecated: boolean } {
  const lower = content.toLowerCase();
  return {
    internal: lower.includes("@internal"),
    deprecated: lower.includes("@deprecated"),
  };
}

function parseDescriptionFromJSDoc(rawComment: string | undefined): string {
  if (!rawComment) return "";
  return rawComment
    .split("\n")
    .map((line) => line.replace(/^\s*\* ?/, "").trim())
    .filter((line) => line.length > 0 && !line.startsWith("@"))
    .join(" ")
    .trim();
}

function extractDefaultFromDescription(description: string): { description: string; defaultValue: string | null } {
  const match = description.match(/\bdefault(?:s)?\s+to\s+([^.;]+)/i);
  if (!match) return { description, defaultValue: null };

  const defaultValue = match[1].trim();
  return {
    description: description.replace(match[0], "").replace(/\s+/g, " ").trim(),
    defaultValue,
  };
}

function isReadonlyDescription(description: string): boolean {
  return /read only|readonly|read-only/i.test(description);
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

export {
  extractDefaultFromDescription,
  findImmediateJsDocBefore,
  isReadonlyDescription,
  parseDescriptionFromJSDoc,
  parseJSDocContent,
  WORKSPACE_ROOT,
};

export type {
  ExtractedEvent,
  ExtractedProp,
  ReactCallbackAliasInfo,
  WrapperExtraction,
};
