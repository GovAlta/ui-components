import { Project, ScriptKind, type SourceFile } from "ts-morph";
import type * as ts from "typescript";

const project = new Project({
  skipAddingFilesFromTsConfig: true,
});

function resolveScriptKind(filePath: string): ScriptKind {
  return filePath.endsWith(".tsx") ? ScriptKind.TSX : ScriptKind.TS;
}

export function getOrCreateTsMorphSourceFile(filePath: string, content: string): SourceFile {
  let sourceFile = project.getSourceFile(filePath);

  if (sourceFile) {
    if (sourceFile.getFullText() !== content) {
      sourceFile.replaceWithText(content);
    }
  } else {
    sourceFile = project.createSourceFile(filePath, content, {
      overwrite: true,
      scriptKind: resolveScriptKind(filePath),
    });
  }

  return sourceFile;
}

/**
 * Creates or updates a source file in a shared ts-morph Project, then returns
 * its compiler-node SourceFile so existing extraction logic can keep using
 * the TypeScript compiler API while we migrate parser internals incrementally.
 */
export function createSourceFileWithTsMorph(filePath: string, content: string): ts.SourceFile {
  const sourceFile = getOrCreateTsMorphSourceFile(filePath, content);

  return sourceFile.compilerNode as unknown as ts.SourceFile;
}
