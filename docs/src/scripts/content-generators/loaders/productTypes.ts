import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";
import { parseFrontmatter } from "./frontmatter";
import { asString, asStringArray, listDirectories } from "./lib";
import type { ProductTypeRecord } from "../types";

export function loadProductTypes(): ProductTypeRecord[] {
  const records: ProductTypeRecord[] = [];

  for (const folder of listDirectories(paths.content.productTypes)) {
    const slug = path.basename(folder);
    const indexPath = path.join(folder, "index.mdx");
    if (!fs.existsSync(indexPath)) continue;

    const raw = fs.readFileSync(indexPath, "utf8");
    const { data, body } = parseFrontmatter(raw);

    records.push({
      id: asString(data.id) ?? slug,
      collection: "productTypes",
      title: asString(data.title) ?? slug,
      summary: asString(data.summary) ?? "",
      heroImage: asString(data.heroImage),
      demoUrl: asString(data.demoUrl),
      sourceUrl: asString(data.sourceUrl),
      tags: asStringArray(data.tags),
      components: asStringArray(data.components),
      status: asString(data.status) ?? "published",
      body: body.trim(),
    });
  }

  records.sort((a, b) => a.id.localeCompare(b.id));
  return records;
}
