import * as fs from "fs";
import * as path from "path";
import {
  inferSlotTypeHintsFromWrappers,
  INTERNAL_SLOT_NAMES,
  parseComponentManifest,
  toKebabCase,
} from "./discovery";
import { transformWebComponentEvents } from "./event-transformers";
import { findFirstFileByName } from "./fs-search";
import {
  buildJSDocMap,
  extractEvents,
  extractProps,
  extractSlots,
  extractTagName,
  extractTypeAliases,
  extractValidators,
} from "./svelte-parsers";
import { extractAngularWrapperApi, extractReactWrapperApi } from "./wrapper-extractors";

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

function dedupeByName<T extends { name: string }>(items: T[]): T[] {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.name)) return false;
    seen.add(item.name);
    return true;
  });
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

function extractComponentAPI(
  componentName: string,
  workspaceRoot: string,
  uiComponentsPath: string,
): ExtractedComponentAPI | null {
  const componentPath = path.join(uiComponentsPath, componentName);

  const svelteFileName = `${capitalize(toCamelCase(componentName))}.svelte`;
  let svelteFilePath = findFirstFileByName(uiComponentsPath, svelteFileName);

  if (!svelteFilePath && fs.existsSync(componentPath) && fs.statSync(componentPath).isDirectory()) {
    const files = fs.readdirSync(componentPath);
    const svelteFile = files.find((fileName) => fileName.endsWith(".svelte"));
    if (svelteFile) {
      svelteFilePath = path.join(componentPath, svelteFile);
    }
  }

  if (!svelteFilePath) {
    console.error(`No Svelte file found for: ${componentName}`);
    return null;
  }

  const content = fs.readFileSync(svelteFilePath, "utf-8");
  const tagName = extractTagName(content);
  if (!tagName) {
    console.error(`Not a custom element: ${componentName}`);
    return null;
  }

  const manifest = parseComponentManifest(content);
  const typeAliases = extractTypeAliases(content);
  const validators = extractValidators(content);
  const rawProps = extractProps(content, validators, componentName, typeAliases);

  const jsDocMap = buildJSDocMap(content);
  const internalPropNames = new Set<string>();
  for (const [rawName, info] of jsDocMap) {
    if (info.internal) internalPropNames.add(rawName.toLowerCase());
  }

  let rawEventNames = [...extractEvents(content), ...manifest.extraEvents];
  rawEventNames = Array.from(new Set(rawEventNames));
  const slotNames = extractSlots(content);
  const wrapperComponentName = manifest.wrapperAlias ?? componentName;
  const reactWrapper = extractReactWrapperApi(componentName, tagName, slotNames, wrapperComponentName);
  const angularWrapper = extractAngularWrapperApi(componentName, tagName, slotNames, wrapperComponentName);

  const webComponentProps: ExtractedProp[] = rawProps.map((prop) => ({
    name: prop.name,
    type: prop.type,
    typeLabel: prop.typeLabel,
    values: prop.values,
    required: prop.required,
    default: prop.default,
    description: prop.description,
    ...(prop.deprecated && { deprecated: true }),
  }));

  const webComponentEvents = transformWebComponentEvents(rawEventNames, content);
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
  const slotTypeHints = inferSlotTypeHintsFromWrappers(workspaceRoot, tagName, slotNames);

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
            slotTypeHints[framework]?.[name] ||
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

  specializeAngularValuePropFromReact(angularProps, reactProps);

  reactProps = reactProps.filter((prop) => !internalPropNames.has(prop.name.toLowerCase()));
  angularProps = angularProps.filter((prop) => !internalPropNames.has(prop.name.toLowerCase()));

  reactProps = dedupeByName(reactProps).sort((a, b) => a.name.localeCompare(b.name));
  angularProps = dedupeByName(angularProps).sort((a, b) => a.name.localeCompare(b.name));

  webComponentProps.sort((a, b) => a.name.localeCompare(b.name));
  webComponentEvents.sort((a, b) => a.name.localeCompare(b.name));
  reactSlots.sort((a, b) => a.name.localeCompare(b.name));
  angularSlots.sort((a, b) => a.name.localeCompare(b.name));
  webComponentSlots.sort((a, b) => a.name.localeCompare(b.name));

  const relativePath = path.relative(workspaceRoot, svelteFilePath);

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

export { extractComponentAPI };