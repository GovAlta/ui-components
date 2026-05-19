import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";
import { parseFrontmatter } from "./frontmatter";
import { asString, asStringArray, listMdxFiles } from "./lib";
import type { FoundationRecord } from "../types";

export function loadFoundations(): FoundationRecord[] {
  const records: FoundationRecord[] = [];

  for (const filePath of listMdxFiles(paths.content.foundations)) {
    const slug = path.basename(filePath, ".mdx");
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, body } = parseFrontmatter(raw);

    records.push({
      id: asString(data.id) ?? slug,
      collection: "foundations",
      title: asString(data.title) ?? slug,
      description: asString(data.description) ?? "",
      category: asString(data.category) ?? "design",
      tags: asStringArray(data.tags),
      status: asString(data.status) ?? "published",
      body: body.trim(),
    });
  }

  records.sort((a, b) => a.id.localeCompare(b.id));
  return records;
}
