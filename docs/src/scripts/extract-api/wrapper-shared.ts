import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";
import { createSourceFileWithTsMorph } from "./ts-morph-adapter";
import {
  cleanType,
  inferTypeFromDefault,
  parseDefaultValue,
  parseWrapperPropValues,
} from "./wrapper-shared-type-event-utils";
import {
  extractDefaultFromDescription,
  findImmediateJsDocBefore,
  parseDescriptionFromJSDoc,
  WORKSPACE_ROOT,
} from "./wrapper-shared-types-jsdoc";
import type { ExtractedProp } from "./wrapper-shared-types-jsdoc";

function createTsSourceFile(filePath: string, content: string): ts.SourceFile {
  try {
    return createSourceFileWithTsMorph(filePath, content);
  } catch {
    const scriptKind = filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS;
    return ts.createSourceFile(filePath, content, ts.ScriptTarget.Latest, true, scriptKind);
  }
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

function isAngularInputRequired(inputDecoratorCall: ts.CallExpression | null): boolean {
  if (!inputDecoratorCall || inputDecoratorCall.arguments.length === 0) return false;

  const firstArg = inputDecoratorCall.arguments[0];
  if (!firstArg || !ts.isObjectLiteralExpression(firstArg)) return false;

  const requiredProp = firstArg.properties.find((prop) => {
    if (!ts.isPropertyAssignment(prop)) return false;
    if (ts.isIdentifier(prop.name)) return prop.name.text === "required";
    if (ts.isStringLiteral(prop.name)) return prop.name.text === "required";
    return false;
  });

  if (!requiredProp || !ts.isPropertyAssignment(requiredProp)) return false;

  return requiredProp.initializer.kind === ts.SyntaxKind.TrueKeyword;
}

function extractAngularBaseComponentProps(): Map<string, ExtractedProp> {
  const baseFile = path.join(WORKSPACE_ROOT, "libs/angular-components/src/lib/components/base.component.ts");

  if (!fs.existsSync(baseFile)) return new Map<string, ExtractedProp>();

  const content = fs.readFileSync(baseFile, "utf-8");
  const sourceFile = createTsSourceFile(baseFile, content);
  const props = new Map<string, ExtractedProp>();

  const classDecls = sourceFile.statements.filter((node): node is ts.ClassDeclaration => ts.isClassDeclaration(node));

  for (const classDecl of classDecls) {
    for (const member of classDecl.members) {
      if (!ts.isPropertyDeclaration(member)) continue;
      if (!hasDecorator(member, "Input")) continue;
      if (!member.name || !ts.isIdentifier(member.name)) continue;

      const rawComment = findImmediateJsDocBefore(content, member.getStart(sourceFile));
      const propName = member.name.text;
      const inputDecorator = getDecoratorCall(member, "Input");
      const rawDefault = member.initializer?.getText(sourceFile)?.trim();
      const rawType = cleanType(member.type?.getText(sourceFile)?.trim() || inferTypeFromDefault(rawDefault));
      const fullDescription = parseDescriptionFromJSDoc(rawComment);
      const { description, defaultValue: descriptionDefault } = extractDefaultFromDescription(fullDescription);
      const defaultValue = descriptionDefault ?? parseDefaultValue(rawDefault);

      props.set(propName, {
        name: propName,
        type: rawType,
        values: parseWrapperPropValues(rawType),
        required: isAngularInputRequired(inputDecorator),
        default: defaultValue,
        description,
      });
    }
  }

  return props;
}

export {
  extractAngularBaseComponentProps,
  WORKSPACE_ROOT,
};

export * from "./wrapper-shared-types-jsdoc";
export * from "./wrapper-shared-type-event-utils";