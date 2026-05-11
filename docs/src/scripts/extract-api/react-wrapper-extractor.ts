import * as fs from "fs";
import * as path from "path";
import {
  Node as MorphNode,
  SyntaxKind as MorphSyntaxKind,
  type PropertySignature as MorphPropertySignature,
  type SourceFile as MorphSourceFile,
  type TypeNode as MorphTypeNode,
} from "ts-morph";
import { escapeRegExp, findFirstFileByName, findFirstFileContaining, findFirstFileMatchingPattern } from "./fs-search";
import { getOrCreateTsMorphSourceFile } from "./ts-morph-adapter";
import {
  capitalize,
  cleanType,
  createEmptyWrapperExtraction,
  dedupeByName,
  extractDefaultFromDescription,
  findImmediateJsDocBefore,
  isFunctionType,
  isPureSlotCarrierType,
  isReactCallbackAliasType,
  isReadonlyDescription,
  isSlotCarrierType,
  parseDescriptionFromJSDoc,
  parseJSDocContent,
  parseWrapperPropValues,
  resolveReactCallbackEventType,
  toCamelCase,
  WORKSPACE_ROOT,
} from "./wrapper-shared";
import type { ReactCallbackAliasInfo, WrapperExtraction } from "./wrapper-shared";

function resolvePrimaryReactPropsInterfaceTsMorph(componentName: string, sourceFile: MorphSourceFile): string | null {
  const componentPart = capitalize(toCamelCase(componentName));
  const candidates = [`Goab${componentPart}Props`, `GoA${componentPart}Props`];
  const interfaces = sourceFile.getInterfaces();

  for (const name of candidates) {
    const match = interfaces.find((iface) => iface.getName() === name);
    if (match?.isExported()) return name;
  }

  for (const name of candidates) {
    const match = interfaces.find((iface) => iface.getName() === name);
    if (match) return name;
  }

  for (const iface of interfaces) {
    const ifaceName = iface.getName();
    if (iface.isExported() && /^(?:Goab|GoA)\w+Props$/.test(ifaceName)) return ifaceName;
  }

  for (const iface of interfaces) {
    const ifaceName = iface.getName();
    if (/^(?:Goab|GoA)\w+Props$/.test(ifaceName)) return ifaceName;
  }

  return null;
}

function collectReactInterfaceMembersTsMorph(
  interfaceName: string,
  sourceFile: MorphSourceFile,
  visited: Set<string> = new Set<string>(),
): MorphPropertySignature[] {
  if (visited.has(interfaceName)) return [];
  visited.add(interfaceName);

  const iface = sourceFile.getInterface(interfaceName);
  if (!iface) return [];

  const inheritedMembers = iface.getExtends().flatMap((extendNode) => {
    const baseName = extendNode.getExpression().getText().split(".").pop() || "";
    if (!baseName) return [];
    return collectReactInterfaceMembersTsMorph(baseName, sourceFile, visited);
  });

  return [...inheritedMembers, ...iface.getProperties()];
}

function resolvePrimaryReactComponentParameterTypeTsMorph(componentName: string, sourceFile: MorphSourceFile): MorphTypeNode | null {
  const componentPart = capitalize(toCamelCase(componentName));
  const candidates = [`Goab${componentPart}`, `GoA${componentPart}`];

  for (const fn of sourceFile.getFunctions()) {
    const fnName = fn.getName();
    if (!fnName || !candidates.includes(fnName) || !fn.isExported()) continue;
    return fn.getParameters()[0]?.getTypeNode() || null;
  }

  for (const decl of sourceFile.getVariableDeclarations()) {
    const name = decl.getName();
    const varStmt = decl.getVariableStatement();
    if (!candidates.includes(name) || !varStmt?.isExported()) continue;

    const initializer = decl.getInitializer();
    if (!initializer) continue;

    if (initializer.getKind() === MorphSyntaxKind.ArrowFunction || initializer.getKind() === MorphSyntaxKind.FunctionExpression) {
      return (initializer as any).getParameters()[0]?.getTypeNode() || null;
    }
  }

  return null;
}

function hasReactMarginsInHierarchyTsMorph(interfaceName: string, sourceFile: MorphSourceFile, visited: Set<string> = new Set<string>()): boolean {
  if (visited.has(interfaceName)) return false;
  visited.add(interfaceName);

  const iface = sourceFile.getInterface(interfaceName);
  if (!iface) return false;

  const extendsNames = iface.getExtends().map((ext) => ext.getExpression().getText().split(".").pop() || "");
  if (extendsNames.includes("Margins")) return true;

  return extendsNames.some((name) => name && hasReactMarginsInHierarchyTsMorph(name, sourceFile, visited));
}

function extractReactCallbackAliasesTsMorph(sourceFile: MorphSourceFile): Map<string, ReactCallbackAliasInfo> {
  const aliases = new Map<string, ReactCallbackAliasInfo>();

  for (const typeAlias of sourceFile.getTypeAliases()) {
    const typeNode = typeAlias.getTypeNode();
    if (!typeNode || !MorphNode.isFunctionTypeNode(typeNode)) continue;

    const aliasName = typeAlias.getName();
    const typeParam = typeAlias.getTypeParameters()[0]?.getName();
    const defaultTypeArg = typeAlias.getTypeParameters()[0]?.getDefault()?.getText().trim();
    const detailType = cleanType(typeNode.getParameters()[0]?.getTypeNode()?.getText().trim() || "unknown");

    aliases.set(aliasName, { typeParam, defaultTypeArg, detailType });
  }

  return aliases;
}

function collectReactTypeNodeMembersTsMorph(typeNode: MorphTypeNode | null, sourceFile: MorphSourceFile, visitedTypeRefs: Set<string> = new Set<string>()): MorphPropertySignature[] {
  if (!typeNode) return [];

  if (MorphNode.isParenthesizedTypeNode(typeNode)) {
    return collectReactTypeNodeMembersTsMorph(typeNode.getTypeNode(), sourceFile, visitedTypeRefs);
  }

  if (MorphNode.isIntersectionTypeNode(typeNode)) {
    return typeNode.getTypeNodes().flatMap((node) => collectReactTypeNodeMembersTsMorph(node, sourceFile, visitedTypeRefs));
  }

  if (MorphNode.isTypeLiteral(typeNode)) {
    return typeNode.getMembers().filter(MorphNode.isPropertySignature);
  }

  if (MorphNode.isTypeReference(typeNode)) {
    const typeName = typeNode.getTypeName().getText().split(".").pop() || "";
    if (!typeName || visitedTypeRefs.has(typeName)) return [];
    visitedTypeRefs.add(typeName);
    return collectReactInterfaceMembersTsMorph(typeName, sourceFile);
  }

  return [];
}

function extractReactWrapperApiTsMorph(componentName: string, tagName: string, slotNames: string[], wrapperComponentName: string = componentName): WrapperExtraction {
  const reactRoot = path.join(WORKSPACE_ROOT, "libs/react-components/src/lib");
  const reactFileNameCandidates = [`${wrapperComponentName}.tsx`, `${wrapperComponentName.replace(/-/g, "")}.tsx`];
  const reactTagPattern = new RegExp(`<\\s*${escapeRegExp(tagName)}(?=[\\s>/])`);

  const reactFile =
    reactFileNameCandidates.map((name) => findFirstFileByName(reactRoot, name)).find(Boolean) ??
    findFirstFileMatchingPattern(reactRoot, [".tsx"], reactTagPattern) ??
    findFirstFileContaining(reactRoot, [".tsx"], tagName);

  if (!reactFile) return createEmptyWrapperExtraction();

  const content = fs.readFileSync(reactFile, "utf-8");
  const sourceFile = getOrCreateTsMorphSourceFile(reactFile, content);
  const primaryInterfaceName = resolvePrimaryReactPropsInterfaceTsMorph(wrapperComponentName, sourceFile);
  if (!primaryInterfaceName) return createEmptyWrapperExtraction(true);

  const interfaceMembers = collectReactInterfaceMembersTsMorph(primaryInterfaceName, sourceFile);
  const componentParameterType = resolvePrimaryReactComponentParameterTypeTsMorph(wrapperComponentName, sourceFile);
  const componentParameterMembers = collectReactTypeNodeMembersTsMorph(componentParameterType, sourceFile, new Set<string>([primaryInterfaceName]));
  const reactMembers = [...interfaceMembers, ...componentParameterMembers];
  const callbackAliases = extractReactCallbackAliasesTsMorph(sourceFile);

  const props = [] as WrapperExtraction["props"];
  const events = [] as WrapperExtraction["events"];
  const slotDescriptions: Record<string, string> = {};
  const slotNameAliases: Record<string, string> = {};
  const slotRequired: Record<string, boolean> = {};

  for (const member of reactMembers) {
    const rawComment = findImmediateJsDocBefore(content, member.getStart());
    const propName = member.getName();
    const optional = member.hasQuestionToken();
    const rawType = cleanType(member.getTypeNode()?.getText().trim() || "any");
    const { internal, deprecated } = parseJSDocContent(rawComment || "");

    if (deprecated || internal) continue;

    const fullDescription = parseDescriptionFromJSDoc(rawComment);
    const { description, defaultValue } = extractDefaultFromDescription(fullDescription);
    const isReadonly = isReadonlyDescription(description);
    const isRequired = !optional && !isReadonly;

    const values = parseWrapperPropValues(rawType);
    const slotName = getMatchingSlotName(propName, slotNames);

    if (slotName && isSlotCarrierType(rawType)) {
      if (description) slotDescriptions[slotName] = description;
      slotNameAliases[slotName] = propName;
      slotRequired[slotName] = Boolean(slotRequired[slotName]) || isRequired;
      if (isPureSlotCarrierType(rawType)) continue;
    }

    if (propName.startsWith("on") && (isReactCallbackAliasType(rawType, callbackAliases) || isFunctionType(rawType))) {
      events.push({
        name: propName,
        type: isReactCallbackAliasType(rawType, callbackAliases) ? resolveReactCallbackEventType(rawType, callbackAliases) : rawType,
        description,
        frameworks: ["react"],
      });
      continue;
    }

    props.push({ name: propName, type: rawType, values, required: isRequired, default: defaultValue, description });
  }

  if (hasReactMarginsInHierarchyTsMorph(primaryInterfaceName, sourceFile)) {
    const existingNames = new Set(props.map((prop) => prop.name));
    const marginProps = ["mt", "mr", "mb", "ml"]
      .filter((name) => !existingNames.has(name))
      .map((name) => ({ name, type: "Spacing", required: false, default: null, description: "" }));
    props.push(...marginProps);
  }

  const dedupedProps = dedupeByName(props).sort((a, b) => a.name.localeCompare(b.name));
  const dedupedEvents = dedupeByName(events).sort((a, b) => a.name.localeCompare(b.name));

  return { found: true, props: dedupedProps, events: dedupedEvents, slotDescriptions, slotNameAliases, slotRequired };
}

function extractReactWrapperApi(componentName: string, tagName: string, slotNames: string[], wrapperComponentName: string = componentName): WrapperExtraction {
  return extractReactWrapperApiTsMorph(componentName, tagName, slotNames, wrapperComponentName);
}

export { extractReactWrapperApi };