import * as fs from "fs";
import * as path from "path";
import { Node as MorphNode, SyntaxKind as MorphSyntaxKind } from "ts-morph";
import { escapeRegExp, findFirstFileByName, findFirstFileContaining, findFirstFileMatchingPattern } from "./fs-search";
import { getOrCreateTsMorphSourceFile } from "./ts-morph-adapter";
import {
  cleanType,
  createEmptyWrapperExtraction,
  dedupeByName,
  extractAngularBaseComponentProps,
  extractDefaultFromDescription,
  findImmediateJsDocBefore,
  getMatchingSlotName,
  inferTypeFromDefault,
  isPureSlotCarrierType,
  isReadonlyDescription,
  isSlotCarrierType,
  parseDefaultValue,
  parseDescriptionFromJSDoc,
  parseJSDocContent,
  parseWrapperPropValues,
  toEventCallbackType,
  WORKSPACE_ROOT,
} from "./wrapper-shared";
import type { ExtractedProp, WrapperExtraction } from "./wrapper-shared";

function isAngularInputRequiredTsMorph(inputDecorator: MorphNode | undefined): boolean {
  if (!inputDecorator) return false;

  const decorator = inputDecorator as any;
  const callExpression = decorator.getCallExpression?.();
  if (!callExpression) return false;

  const [firstArg] = callExpression.getArguments();
  if (!firstArg || !MorphNode.isObjectLiteralExpression(firstArg)) return false;

  return firstArg.getProperties().some((prop) => {
    if (!MorphNode.isPropertyAssignment(prop)) return false;
    return prop.getName() === "required" && prop.getInitializer()?.getKind() === MorphSyntaxKind.TrueKeyword;
  });
}

function extractAngularWrapperApiTsMorph(componentName: string, tagName: string, slotNames: string[], wrapperComponentName: string = componentName): WrapperExtraction {
  const angularRoot = path.join(WORKSPACE_ROOT, "libs/angular-components/src/lib/components");
  const angularSelector = tagName.replace(/^goa-/, "goab-");
  const angularFileNameCandidates = [`${wrapperComponentName}.ts`, `${wrapperComponentName.replace(/-/g, "")}.ts`];
  const angularSelectorPattern = new RegExp(`selector\\s*:\\s*["']${escapeRegExp(angularSelector)}["']`);
  const angularTagPattern = new RegExp(`<\\s*${escapeRegExp(tagName)}(?=[\\s>/])`);

  const angularFile =
    angularFileNameCandidates.map((name) => findFirstFileByName(angularRoot, name)).find(Boolean) ??
    findFirstFileMatchingPattern(angularRoot, [".ts"], angularSelectorPattern) ??
    findFirstFileMatchingPattern(angularRoot, [".ts"], angularTagPattern) ??
    findFirstFileContaining(angularRoot, [".ts"], tagName);

  if (!angularFile) return createEmptyWrapperExtraction();

  const content = fs.readFileSync(angularFile, "utf-8");
  const sourceFile = getOrCreateTsMorphSourceFile(angularFile, content);
  const classDecl = sourceFile.getClasses().find((cls) => cls.getDecorators().some((decorator) => decorator.getName() === "Component"));

  if (!classDecl) return createEmptyWrapperExtraction(true);

  const props = [] as WrapperExtraction["props"];
  const events = [] as WrapperExtraction["events"];
  const slotDescriptions: Record<string, string> = {};
  const slotNameAliases: Record<string, string> = {};
  const slotRequired: Record<string, boolean> = {};

  for (const member of classDecl.getProperties()) {
    const inputDecorator = member.getDecorator("Input");
    if (!inputDecorator) continue;

    const rawComment = findImmediateJsDocBefore(content, member.getStart());
    const { internal, deprecated } = parseJSDocContent(rawComment || "");
    const propName = member.getName();
    const rawDefault = member.getInitializer()?.getText().trim();
    const rawType = cleanType(member.getTypeNode()?.getText().trim() || inferTypeFromDefault(rawDefault));

    const fullDescription = parseDescriptionFromJSDoc(rawComment);
    const { description, defaultValue: descriptionDefault } = extractDefaultFromDescription(fullDescription);
    const isReadonly = isReadonlyDescription(description);
    const required = !isReadonly && isAngularInputRequiredTsMorph(inputDecorator);

    if (deprecated || internal) continue;

    const values = parseWrapperPropValues(rawType);
    const slotName = getMatchingSlotName(propName, slotNames);

    if (slotName && isSlotCarrierType(rawType)) {
      if (description) slotDescriptions[slotName] = description;
      slotNameAliases[slotName] = propName;
      slotRequired[slotName] = Boolean(slotRequired[slotName]) || required;
      if (isPureSlotCarrierType(rawType)) continue;
    }

    const defaultValue = descriptionDefault ?? parseDefaultValue(rawDefault);

    props.push({ name: propName, type: rawType, values, required, default: defaultValue, description });
  }

  for (const member of classDecl.getProperties()) {
    const outputDecorator = member.getDecorator("Output");
    if (!outputDecorator) continue;

    const rawComment = findImmediateJsDocBefore(content, member.getStart());
    const { deprecated: eventDeprecated } = parseJSDocContent(rawComment || "");
    if (eventDeprecated) continue;

    const eventName = member.getName();
    let eventType = "void";

    const typeNode = member.getTypeNode();
    if (typeNode && MorphNode.isTypeReference(typeNode)) {
      const typeName = typeNode.getTypeName().getText();
      if (typeName.endsWith("EventEmitter")) {
        eventType = typeNode.getTypeArguments()[0]?.getText().trim() || "void";
      }
    }

    const initializer = member.getInitializer();
    if ((eventType === "void" || eventType === "CustomEvent") && initializer && MorphNode.isNewExpression(initializer)) {
      const ctorName = initializer.getExpression().getText();
      if (ctorName.endsWith("EventEmitter")) {
        eventType = initializer.getTypeArguments()[0]?.getText().trim() || "void";
      }
    }

    const description = parseDescriptionFromJSDoc(rawComment);

    events.push({ name: eventName, type: toEventCallbackType(eventType), description, frameworks: ["angular"] });
  }

  const extendsName = classDecl.getExtends()?.getExpression().getText().split(".").pop();

  if (extendsName && (extendsName === "GoabBaseComponent" || extendsName === "GoabControlValueAccessor")) {
    const existingNames = new Set(props.map((prop: ExtractedProp) => prop.name));
    const baseComponentProps = extractAngularBaseComponentProps();
    const inheritedPropNames = extendsName === "GoabControlValueAccessor" ? ["id", "disabled", "error", "value", "mt", "mr", "mb", "ml", "testId"] : ["mt", "mr", "mb", "ml", "testId"];

    const baseProps = inheritedPropNames
      .map((name) => baseComponentProps.get(name))
      .filter((prop): prop is ExtractedProp => Boolean(prop))
      .filter((prop) => !existingNames.has(prop.name));

    props.push(...baseProps);
  }

  const dedupedProps = dedupeByName(props).sort((a, b) => a.name.localeCompare(b.name));
  const dedupedEvents = dedupeByName(events).sort((a, b) => a.name.localeCompare(b.name));

  return { found: true, props: dedupedProps, events: dedupedEvents, slotDescriptions, slotNameAliases, slotRequired };
}

function extractAngularWrapperApi(componentName: string, tagName: string, slotNames: string[], wrapperComponentName: string = componentName): WrapperExtraction {
  return extractAngularWrapperApiTsMorph(componentName, tagName, slotNames, wrapperComponentName);
}

export { extractAngularWrapperApi };