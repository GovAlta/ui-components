import * as fs from "fs";
import * as path from "path";
import { EXAMPLE_SOURCE_FILES, paths } from "../config";
import { parseFrontmatter } from "./frontmatter";
import { asString, asStringArray, findIndexMdxFolders } from "./lib";
import type { ExampleCodeFile, ExampleRecord } from "../types";

const PAGE_LIKE_SIZES = new Set(["page", "task", "product"]);

const VALID_SIZES = new Set<ExampleRecord["size"]>([
  "interaction",
  "section",
  "page",
  "task",
  "product",
]);

export function loadExamples(): ExampleRecord[] {
  const records: ExampleRecord[] = [];

  for (const folder of findIndexMdxFolders(paths.content.examples)) {
    const slug = path.basename(folder);
    const indexPath = path.join(folder, "index.mdx");

    const raw = fs.readFileSync(indexPath, "utf8");
    const { data, body } = parseFrontmatter(raw);

    const sizeRaw = asString(data.size);
    if (!sizeRaw || !VALID_SIZES.has(sizeRaw as ExampleRecord["size"])) {
      // Schema enforces this on the docs site; skip malformed entries here
      // rather than emitting garbage downstream.
      continue;
    }
    const size = sizeRaw as ExampleRecord["size"];

    const productType = asString(data.productType);
    const productTypeNarrowed =
      productType === "workspace" || productType === "public-form"
        ? productType
        : undefined;

    const frameworks = pickFrameworks(folder, data, size);

    records.push({
      id: asString(data.id) ?? slug,
      collection: "examples",
      title: asString(data.title) ?? slug,
      description: asString(data.description),
      size,
      tags: asStringArray(data.tags),
      components: asStringArray(data.components),
      relatedExamples: asStringArray(data.relatedExamples),
      aliases: asStringArray(data.aliases),
      status: asString(data.status) ?? "published",
      productType: productTypeNarrowed,
      frameworks,
      previewImage: asString(data.previewImage),
      figmaUrl: asString(data.figmaUrl),
      accessibilityNotes: asString(data.accessibilityNotes),
      previewUrl: asString(data.previewUrl),
      reactSourceUrl: asString(data.reactSourceUrl),
      angularSourceUrl: asString(data.angularSourceUrl),
      sourceUrl: asString(data.sourceUrl),
      stackblitzUrl: asString(data.stackblitzUrl),
      code: loadExampleCode(folder),
      body: body.trim(),
    });
  }

  records.sort((a, b) => a.id.localeCompare(b.id));
  return records;
}

// The example's source files that exist beside its index.mdx, by framework.
function loadExampleCode(folder: string): ExampleRecord["code"] {
  const code: Record<string, ExampleCodeFile[]> = {};
  for (const [framework, sources] of Object.entries(EXAMPLE_SOURCE_FILES)) {
    const files = sources
      .filter((source) => fs.existsSync(path.join(folder, source.file)))
      .map((source) => ({
        file: source.file,
        language: source.lang,
        content: fs.readFileSync(path.join(folder, source.file), "utf8").trimEnd(),
      }));
    if (files.length > 0) code[framework] = files;
  }
  return Object.keys(code).length > 0 ? code : undefined;
}

function pickFrameworks(
  folder: string,
  data: Record<string, unknown>,
  size: ExampleRecord["size"],
): string[] | undefined {
  // Trust the frontmatter when it's set (page-like sizes can declare this).
  const declaredArr = asStringArray(data.frameworks);
  if (declaredArr.length > 0) return declaredArr;

  // Otherwise detect from the example's own source files. A page-scale
  // example's code often lives outside its folder, so a missing file says
  // nothing about it, but a file that is there, or a link to a framework's
  // source, shows the example comes in that framework. With neither, the
  // frameworks stay unknown rather than guessed.
  const pageLike = PAGE_LIKE_SIZES.has(size);
  const detected: string[] = [];
  if (
    fs.existsSync(path.join(folder, "react.tsx")) ||
    (pageLike && asString(data.reactSourceUrl))
  )
    detected.push("react");
  if (
    fs.existsSync(path.join(folder, "angular.html")) ||
    (pageLike && asString(data.angularSourceUrl))
  )
    detected.push("angular");
  if (
    fs.existsSync(path.join(folder, "web-components.html")) ||
    (pageLike && asString(data.webComponentsSourceUrl))
  )
    detected.push("web-components");
  return detected.length > 0 ? detected : undefined;
}
