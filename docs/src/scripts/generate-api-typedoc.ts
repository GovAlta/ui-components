/**
 * TypeDoc-based API Extraction Script
 * 
 * Uses TypeDoc to extract props, events, and slots from React and Angular wrappers
 * and outputs structured JSON matching the content model spec.
 * 
 * Usage:
 *   npx tsx docs/src/scripts/generate-api-typedoc.ts button
 *   npx tsx docs/src/scripts/generate-api-typedoc.ts --all
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { execa } from "execa";

// =============================================================================
// Configuration
// =============================================================================

const WORKSPACE_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../../..",
);
const DIST_REACT_PATH = path.join(WORKSPACE_ROOT, "dist/libs/react-components");
const DIST_ANGULAR_PATH = path.join(WORKSPACE_ROOT, "dist/libs/angular-components");
const BUILD_COMMON_PATH = path.join(WORKSPACE_ROOT, "dist/libs/common");
const OUTPUT_PATH = path.join(WORKSPACE_ROOT, "docs/generated/component-apis");
const DOCS_COMPONENT_CONTENT_PATH = path.join(WORKSPACE_ROOT, "docs/src/content/components");
const TYPEDOC_CONFIG = path.join(WORKSPACE_ROOT, "tsconfig.typedoc.json");
const TMP_DIR = path.join(WORKSPACE_ROOT, ".typedoc-cache");

// =============================================================================
// Output Types
// =============================================================================

interface ExtractedProp {
  name: string;
  type: string;
  typeLabel?: string;
  values?: string[];
  required: boolean;
  default: string | null;
  description: string;
  deprecated?: boolean;
}

interface ExtractedEvent {
  name: string;
  type: string;
  description: string;
  frameworks: ("react" | "angular" | "webComponents")[];
}

interface ExtractedSlot {
  name: string;
  type?: string;
  description: string;
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
// TypeDoc JSON Output Types
// =============================================================================

interface TypeDocProject {
  id: number;
  name: string;
  children?: TypeDocReflection[];
}

interface TypeDocReflection {
  id: number;
  name: string;
  kind: number; // ReflectionKind
  variant?: "declaration" | "project" | string;
  flags?: { [key: string]: boolean };
  comment?: TypeDocComment;
  children?: TypeDocReflection[];
  type?: TypeDocType;
  sources?: TypeDocSource[];
  defaultValue?: string;
}

interface TypeDocComment {
  summary?: TypeDocText[];
  blockTags?: { tag: string; text?: string; content?: TypeDocText[] }[];
}

interface TypeDocText {
  kind: string;
  text: string;
}

interface TypeDocType {
  type: string;
  name?: string;
  target?: number;
  elementTypes?: TypeDocType[];
  typeArguments?: TypeDocType[];
  declaration?: TypeDocType;
}

interface TypeDocSource {
  fileName: string;
  line: number;
  character: number;
}

// Reflection kinds - from TypeDoc's ReflectionKind enum
const ReflectionKind = {
  Project: 1,
  Module: 2,
  Namespace: 4,
  Enum: 8,
  EnumMember: 16,
  Class: 32,
  Interface: 64,
  Constructor: 128,
  Property: 1024,
  Method: 2048,
  CallSignature: 4096,
  IndexSignature: 8192,
  ConstructorSignature: 16384,
  Parameter: 32768,
  TypeLiteral: 65536,
  TypeParameter: 131072,
  Accessor: 262144,
  GetSignature: 524288,
  SetSignature: 1048576,
  Reference: 2097152,
} as const;

// =============================================================================
// Utility Functions
// =============================================================================

function toKebabCase(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}

function toCamelCase(str: string): string {
  return str
    .split("-")
    .map((part, index) => (index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function cleanType(typeName: string): string {
  return typeName
    .replace(/\s+/g, " ")
    .replace(/(\(\s*typeof\s+\w+\s*\)\s*\[\s*number\s*\])/g, "")
    .replace(/^"|"$/g, "")
    .replace(/import\("/g, "")
    .replace(/"\)\.\w+$/g, "")
    .trim();
}

function getCommentText(comment?: TypeDocComment): string {
  if (!comment) return "";
  return comment.summary?.map((t) => t.text).join(" ") || "";
}

// Helper to normalize tag names (remove @ and lowercase)
function normalizeTag(tag: string): string {
  return tag.toLowerCase().replace(/^@/, "");
}

function hasTag(comment?: TypeDocComment, tag: string): boolean {
  if (!comment?.blockTags) return false;
  const normalized = normalizeTag(tag);
  return comment.blockTags.some((t) => normalizeTag(t.tag) === normalized);
}

function getTagText(tag: { tag: string; text?: string; content?: any }): string | null {
  if (tag.text) {
    return tag.text;
  }
  if (tag.content && Array.isArray(tag.content)) {
    return tag.content.map((c: any) => c.text || "").join("");
  }
  return null;
}

function cleanDefaultValue(value: string): string | null {
  if (!value) return null;
  
  // Remove code block markers (```ts, ```, etc.) and language identifiers
  let result = value
    // Remove triple backticks with optional language
    .replace(/```[\s\w]*/g, "")
    // Remove single backticks
    .replace(/`/g, "")
    // Remove newlines
    .replace(/\n/g, " ")
    // Trim whitespace
    .trim();
  
  // Remove surrounding quotes
  result = result.replace(/^['"]+|['"]+$/g, "");
  result = result.trim();
  
  return result === "undefined" || result === "null" || result === "" ? null : result;
}

function getDefaultValue(comment?: TypeDocComment, defaultValue?: string): string | null {
  if (defaultValue && defaultValue !== "undefined" && defaultValue !== "null") {
    return cleanDefaultValue(defaultValue);
  }
  if (!comment?.blockTags) return null;
  const normalized = normalizeTag("default");
  const defaultTag = comment.blockTags.find((t) => normalizeTag(t.tag) === normalized);
  if (defaultTag) {
    const text = getTagText(defaultTag);
    if (text) {
      return cleanDefaultValue(text);
    }
  }
  return null;
}

function getTagValue(comment?: TypeDocComment, tag: string): string | null {
  if (!comment?.blockTags) return null;
  const normalized = normalizeTag(tag);
  const foundTag = comment.blockTags.find((t) => normalizeTag(t.tag) === normalized);
  if (foundTag) {
    const text = getTagText(foundTag);
    if (text) {
      return cleanDefaultValue(text);
    }
  }
  return null;
}

// =============================================================================
// Extract Props from TypeDoc Reflection
// =============================================================================

function extractPropFromReflection(reflection: TypeDocReflection): ExtractedProp | null {
  const commentText = getCommentText(reflection.comment);
  
  // Skip internal/deprecated (except testId)
  if (hasTag(reflection.comment, "internal") && reflection.name.toLowerCase() !== "testid") {
    return null;
  }
  if (hasTag(reflection.comment, "deprecated")) {
    return null;
  }

  // Parse @default from JSDoc comment
  const defaultFromTag = getTagValue(reflection.comment, "default");
  const defaultValue = defaultFromTag || reflection.defaultValue || null;
  
  // Clean up default value
  const cleanedDefault = cleanDefaultValue(defaultValue || "");

  const description = getCommentText(reflection.comment)
    .replace(/@default\s+[^@]+/gi, "")
    .replace(/@required\s*/gi, "")
    .replace(/@internal\s*/gi, "")
    .replace(/@deprecated\s*/gi, "")
    .trim();
  
  const isRequired = !reflection.flags?.isOptional && !cleanedDefault;

  // Get type
  let type = "unknown";
  let typeLabel: string | undefined;
  let values: string[] | undefined;

  if (reflection.type) {
    type = cleanType(getTypeString(reflection.type));
    
    // Extract type label (e.g., GoabButtonType)
    const typeNameMatch = type.match(/^([A-Z][a-zA-Z0-9]*)/);
    if (typeNameMatch) {
      typeLabel = typeNameMatch[1];
    }
    
    // Extract union values for string literal types
    const stringLiteralMatches = type.match(/"([^"]+)"/g);
    if (stringLiteralMatches) {
      values = stringLiteralMatches.map((v: string) => v.replace(/["']/g, ""));
    }
    
    // Check if this is a function type (event callback)
    if (type.includes("=>") || type.match(/^\s*\(\s*[^)]*\s*\)\s*=>/)) {
      return null; // Skip this - it's an event, not a prop
    }
  }

  return {
    name: reflection.name,
    type,
    typeLabel,
    values,
    required: isRequired,
    default: cleanedDefault,
    description,
    ...(hasTag(reflection.comment, "deprecated") && { deprecated: true }),
  };
}

function extractEventFromReflection(reflection: TypeDocReflection, framework: "react" | "angular"): ExtractedEvent | null {
  const commentText = getCommentText(reflection.comment);
  
  // Skip internal/deprecated
  if (hasTag(reflection.comment, "internal")) {
    return null;
  }
  if (hasTag(reflection.comment, "deprecated")) {
    return null;
  }

  const description = commentText.replace(/@deprecated\s*/gi, "").trim();
  let type = "void";

  if (reflection.type) {
    type = cleanType(getTypeString(reflection.type));
  }

  // Convert event names: onClick -> click
  let name = reflection.name;
  if (name.startsWith("on") && name.length > 2) {
    name = name.substring(2);
    name = name.charAt(0).toLowerCase() + name.slice(1);
  }

  return {
    name,
    type: type === "void" ? "() => void" : `(event: ${type}) => void`,
    description,
    frameworks: [framework],
  };
}

function getTypeString(typ: TypeDocType | undefined): string {
  if (!typ) return "unknown";
  if (typ.name) return typ.name;
  if (typ.type === "intrinsic") return typ.name || "unknown";
  if (typ.type === "reference") return typ.name || "unknown";
  if (typ.type === "union") {
    return (typ.elementTypes || []).map(getTypeString).join(" | ");
  }
  if (typ.type === "literal") {
    return typ.name || "unknown";
  }
  if (typ.type === "array") {
    return `${getTypeString(typ.elementTypes?.[0])}[]`;
  }
  if (typ.type === "reflection") {
    // Function type - extract from declaration signatures
    if (typ.declaration) {
      if (typ.declaration.signatures?.[0]) {
        const sig = typ.declaration.signatures[0];
        const params = sig.parameters?.map(p => getTypeString(p.type)).join(", ") || "";
        const returnType = sig.type ? getTypeString(sig.type) : "void";
        return `(${params}) => ${returnType}`;
      }
      return "() => void";
    }
    return "unknown";
  }
  if (typ.declaration) return getTypeString(typ.declaration);
  return "unknown";
}

// =============================================================================
// Find Component Reflections
// =============================================================================

function findReflections(root: TypeDocProject | TypeDocReflection | undefined, name: string): TypeDocReflection | null {
  if (!root || !root.children) return null;
  
  for (const child of root.children) {
    if (child.name === name) return child;
    const found = findReflections(child, name);
    if (found) return found;
  }
  
  return null;
}

function getAllReflections(root: TypeDocProject | TypeDocReflection): TypeDocReflection[] {
  const result: TypeDocReflection[] = [];
  if (!root.children) return result;
  
  for (const child of root.children) {
    result.push(child);
    result.push(...getAllReflections(child));
  }
  
  return result;
}

// =============================================================================
// Transform TypeDoc Output to Component API
// =============================================================================

function extractEventFromProperty(prop: TypeDocReflection, framework: "react" | "angular"): ExtractedEvent | null {
  const comment = prop.comment;
  
  // Skip internal/deprecated
  if (hasTag(comment, "internal")) {
    return null;
  }
  if (hasTag(comment, "deprecated")) {
    return null;
  }

  const description = getCommentText(comment).replace(/@deprecated\s*/gi, "").trim();
  
  // Convert event names: onClick -> click
  let name = prop.name;
  if (name.startsWith("on") && name.length > 2) {
    name = name.substring(2);
    name = name.charAt(0).toLowerCase() + name.slice(1);
  }

  return {
    name,
    type: "() => void",
    description,
    frameworks: [framework],
  };
}

function transformToComponentAPI(
  componentName: string,
  typedocOutput: TypeDocProject,
  framework: "react" | "angular"
): ExtractedComponentAPI {
  const allReflections = getAllReflections(typedocOutput);
  
  // Find the Props interface (e.g., GoabButtonProps)
  const pascalName = capitalize(toCamelCase(componentName));
  const interfaceName = `Goab${pascalName}Props`;
  const interfaceReflection = findReflections(typedocOutput, interfaceName);
  
  // Also find the component class/function
  const componentReflection = findReflections(typedocOutput, `Goab${pascalName}`);
  
  const targetReflection = interfaceReflection || componentReflection;
  
  const props: ExtractedProp[] = [];
  const events: ExtractedEvent[] = [];
  
  if (targetReflection && targetReflection.children) {
    for (const child of targetReflection.children) {
      // Properties in the interface
      if (child.kind === ReflectionKind.Property) {
        const typeStr = child.type ? getTypeString(child.type) : "";
        
        // Check if this is a function type (event callback)
        if (typeStr.includes("=>") || typeStr.match(/^\(\s*[^)]*\s*\)\s*=>/)) {
          const event = extractEventFromProperty(child, framework);
          if (event) events.push(event);
        } else {
          const prop = extractPropFromReflection(child);
          if (prop) props.push(prop);
        }
      }
      // Methods that are callbacks (events)
      if (child.kind === ReflectionKind.Method || child.kind === ReflectionKind.CallSignature) {
        if (child.name.startsWith("on") && child.name !== "on") {
          const event = extractEventFromReflection(child, framework);
          if (event) events.push(event);
        }
      }
    }
  }
  
  // Sort and deduplicate
  const sortByName = (a: { name: string }, b: { name: string }) => a.name.localeCompare(b.name);
  const uniqueProps = (props: ExtractedProp[]) => {
    const seen = new Map<string, ExtractedProp>();
    for (const prop of props.sort(sortByName)) {
      if (!seen.has(prop.name)) {
        seen.set(prop.name, prop);
      }
    }
    return Array.from(seen.values());
  };
  
  const uniqueEvents = (events: ExtractedEvent[]) => {
    const seen = new Map<string, ExtractedEvent>();
    for (const event of events.sort(sortByName)) {
      if (!seen.has(event.name)) {
        seen.set(event.name, event);
      }
    }
    return Array.from(seen.values());
  };

  // Determine extractedFrom path
  const sourceFile = props[0]?.sources?.[0]?.fileName || componentReflection?.sources?.[0]?.fileName || "";
  
  return {
    componentSlug: toKebabCase(componentName),
    extractedFrom: sourceFile.replace("dist/libs/", "libs/").replace(/\.d\.ts$/, ".tsx"),
    frameworks: {
      react: framework === "react" ? {
        props: uniqueProps(props),
        events: uniqueEvents(events),
        slots: [], // TODO
      } : { props: [], events: [], slots: [] },
      angular: framework === "angular" ? {
        props: uniqueProps(props),
        events: uniqueEvents(events),
        slots: [], // TODO
      } : { props: [], events: [], slots: [] },
      webComponents: {
        props: [],
        events: [],
        slots: [],
      },
    },
  };
}

// =============================================================================
// Main
// =============================================================================

async function ensureBuilt(): Promise<void> {
  // Check if dist files exist
  if (!fs.existsSync(DIST_REACT_PATH)) {
    console.log("Building React components...");
    await execa("npm", ["run", "common:build"], { cwd: WORKSPACE_ROOT, stdio: "inherit" });
    await execa("npm", ["run", "react-components:build"], { cwd: WORKSPACE_ROOT, stdio: "inherit" });
  }
}

async function extractAllComponents(): Promise<string[]> {
  const componentNames = new Set<string>();
  
  if (!fs.existsSync(DOCS_COMPONENT_CONTENT_PATH)) {
    return [];
  }
  
  const documentedComponentSlugs = new Set(
    fs.readdirSync(DOCS_COMPONENT_CONTENT_PATH, { withFileTypes: true })
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => entry.name.replace(/\.mdx$/, ""))
  );

  // Get all component directories from built React
  if (fs.existsSync(DIST_REACT_PATH)) {
    const entries = fs.readdirSync(path.join(DIST_REACT_PATH, "lib"), { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith("_") && entry.name !== "common") {
        const kebabName = toKebabCase(entry.name);
        if (documentedComponentSlugs.has(kebabName)) {
          componentNames.add(kebabName);
        }
      }
    }
  }

  return Array.from(componentNames).sort();
}

async function runTypeDoc(): Promise<TypeDocProject | null> {
  // Ensure dist exists
  await ensureBuilt();
  
  // Create temp output directory
  if (!fs.existsSync(TMP_DIR)) {
    fs.mkdirSync(TMP_DIR, { recursive: true });
  }
  
  const jsonOutputPath = path.join(TMP_DIR, "typedoc-raw.json");
  
  try {
    // Run TypeDoc
    await execa(
      "npx",
      [
        "typedoc",
        `--tsconfig`, TYPEDOC_CONFIG,
        `--entryPoints`, path.join(DIST_REACT_PATH, "index.d.ts"),
        `--json`, jsonOutputPath,
        `--logLevel`, `Error`,
      ],
      { cwd: WORKSPACE_ROOT, stdio: "inherit" }
    );
    
    if (!fs.existsSync(jsonOutputPath)) {
      console.error(`TypeDoc output not found at ${jsonOutputPath}`);
      return null;
    }
    
    const content = fs.readFileSync(jsonOutputPath, "utf-8");
    return JSON.parse(content) as TypeDocProject;
  } catch (error: any) {
    console.error(`TypeDoc error: ${error.message || error}`);
    return null;
  }
}

async function saveComponentAPI(api: ExtractedComponentAPI): Promise<void> {
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  const filePath = path.join(OUTPUT_PATH, `${api.componentSlug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(api, null, 2));
  console.log(`  Created: ${filePath}`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log("Usage:");
    console.log("  npx tsx docs/src/scripts/generate-api-typedoc.ts button           # Extract single component");
    console.log("  npx tsx docs/src/scripts/generate-api-typedoc.ts --all            # Extract all components");
    process.exit(1);
  }

  let componentNames: string[];

  if (args.includes("--all")) {
    componentNames = await extractAllComponents();
    console.log(`Found ${componentNames.length} documented components`);
  } else {
    componentNames = args.map((name) => toKebabCase(name));
  }

  console.log("\n TypeDoc API Extraction");
  console.log("=".repeat(50));
  console.log(`\nExtracting ${componentNames.length} component(s)...\n`);

  let successCount = 0;
  let failCount = 0;

  try {
    // Run TypeDoc once for all components
    const typedocOutput = await runTypeDoc();
    
    if (!typedocOutput) {
      console.error("TypeDoc failed to generate output");
      failCount = componentNames.length;
    } else {
      for (const componentName of componentNames) {
        console.log(`Processing: ${componentName}`);
        try {
          const api = transformToComponentAPI(componentName, typedocOutput, "react");
          if (api.frameworks.react.props.length > 0 || api.frameworks.react.events.length > 0) {
            await saveComponentAPI(api);
            successCount++;
          } else {
            console.log(`  No API data found for ${componentName}`);
            failCount++;
          }
        } catch (error: any) {
          console.error(`  Error: ${error.message || error}`);
          failCount++;
        }
      }
    }
  } catch (error: any) {
    console.error(`Error: ${error.message || error}`);
    failCount = componentNames.length;
  }

  console.log("\n" + "=".repeat(50));
  console.log(`Complete: ${successCount} succeeded, ${failCount} failed`);
  console.log(`Output: ${OUTPUT_PATH}\n`);
}

main().catch((error) => {
  console.error(`Fatal error: ${error}`);
  process.exit(1);
});
