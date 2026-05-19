import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";
import { parseFrontmatter } from "./frontmatter";
import { asString, asStringArray, listMdxFiles } from "./lib";
import type { ComponentRecord } from "../types";

export function loadComponents(): ComponentRecord[] {
  const records: ComponentRecord[] = [];

  for (const filePath of listMdxFiles(paths.content.components)) {
    const slug = path.basename(filePath, ".mdx");
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, body } = parseFrontmatter(raw);

    records.push({
      id: asString(data.id) ?? slug,
      collection: "components",
      name: asString(data.name) ?? slug,
      description: asString(data.description),
      status: asString(data.status) ?? "stable",
      category: asString(data.category) ?? "utilities",
      tags: asStringArray(data.tags),
      aliases: [],
      relatedComponents: asStringArray(data.relatedComponents),
      figmaUrl: asString(data.figmaUrl),
      hidden: data.hidden === true ? true : undefined,
      subcomponent: data.subcomponent === true ? true : undefined,
      body: body.trim(),
    });
  }

  records.sort((a, b) => a.id.localeCompare(b.id));
  return records;
}
