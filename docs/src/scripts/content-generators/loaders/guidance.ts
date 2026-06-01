import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";
import { parseFrontmatter } from "./frontmatter";
import { asString, asStringArray, listMdxFiles } from "./lib";
import type { GuidanceRecord } from "../types";

export function loadGuidance(): GuidanceRecord[] {
  const records: GuidanceRecord[] = [];

  for (const filePath of listMdxFiles(paths.content.guidance)) {
    const slug = path.basename(filePath, ".mdx");
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, body } = parseFrontmatter(raw);

    const appliesToRaw = data.appliesTo as
      | { components?: unknown; contexts?: unknown }
      | undefined;
    const appliesTo = appliesToRaw
      ? {
          components: asStringArray(appliesToRaw.components),
          contexts: asStringArray(appliesToRaw.contexts),
        }
      : undefined;

    records.push({
      id: asString(data.id) ?? slug,
      collection: "guidance",
      type: asString(data.type) ?? "info",
      description: asString(data.description) ?? "",
      topic: asString(data.topic) ?? "other",
      tags: asStringArray(data.tags),
      appliesTo,
      relatedProps: asStringArray(data.relatedProps),
      status: asString(data.status) ?? "published",
      body: body.trim(),
    });
  }

  records.sort((a, b) => a.id.localeCompare(b.id));
  return records;
}
