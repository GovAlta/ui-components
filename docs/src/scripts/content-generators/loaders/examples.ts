import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";
import { parseFrontmatter } from "./frontmatter";
import { asString, asStringArray, listDirectories } from "./lib";
import type { ExampleRecord } from "../types";

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

  for (const folder of listDirectories(paths.content.examples)) {
    const slug = path.basename(folder);
    const indexPath = path.join(folder, "index.mdx");
    if (!fs.existsSync(indexPath)) continue;

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

    const frameworks = pickFrameworks(folder, data.frameworks, size);

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
      hidden: data.hidden === true ? true : undefined,
      previewUrl: asString(data.previewUrl),
      reactSourceUrl: asString(data.reactSourceUrl),
      angularSourceUrl: asString(data.angularSourceUrl),
      sourceUrl: asString(data.sourceUrl),
      stackblitzUrl: asString(data.stackblitzUrl),
      body: body.trim(),
    });
  }

  records.sort((a, b) => a.id.localeCompare(b.id));
  return records;
}

function pickFrameworks(
  folder: string,
  declared: unknown,
  size: ExampleRecord["size"],
): string[] | undefined {
  // Trust the frontmatter when it's set (page-like sizes can declare this).
  const declaredArr = asStringArray(declared);
  if (declaredArr.length > 0) return declaredArr;

  // Page-like sizes are meant to declare frameworks in frontmatter; if absent,
  // don't infer from sibling files (page-scale entries often live outside the
  // example folder).
  if (PAGE_LIKE_SIZES.has(size)) return undefined;

  // Interaction/section entries: detect from sibling files as before.
  const detected: string[] = [];
  if (fs.existsSync(path.join(folder, "react.tsx"))) detected.push("react");
  if (fs.existsSync(path.join(folder, "angular.html"))) detected.push("angular");
  if (fs.existsSync(path.join(folder, "web-components.html")))
    detected.push("web-components");
  return detected.length > 0 ? detected : undefined;
}
