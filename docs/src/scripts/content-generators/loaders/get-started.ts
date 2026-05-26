import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";
import { parseFrontmatter } from "./frontmatter";
import { asNumber, asString, walkMdxFiles } from "./lib";
import type { GetStartedRecord } from "../types";

export function loadGetStarted(): GetStartedRecord[] {
  const records: GetStartedRecord[] = [];

  for (const filePath of walkMdxFiles(paths.content.getStarted)) {
    const rel = path.relative(paths.content.getStarted, filePath);
    const slug = rel.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(filePath, "utf8");
    const { data, body } = parseFrontmatter(raw);

    records.push({
      id: asString(data.id) ?? slug,
      collection: "get-started",
      title: asString(data.title) ?? slug,
      navLabel: asString(data.navLabel),
      description: asString(data.description),
      section: asString(data.section) ?? "intro",
      order: asNumber(data.order, 0),
      status: asString(data.status) ?? "published",
      body: body.trim(),
    });
  }

  records.sort((a, b) => a.id.localeCompare(b.id));
  return records;
}
