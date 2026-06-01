import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";

export interface ComponentApi {
  componentSlug: string;
  extractedFrom?: string;
  frameworks?: Record<string, unknown>;
  events?: unknown[];
  slots?: unknown[];
  [key: string]: unknown;
}

export function loadComponentApis(): Map<string, ComponentApi> {
  const map = new Map<string, ComponentApi>();
  const dir = paths.code.componentApis;
  if (!fs.existsSync(dir)) return map;

  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json")) continue;
    try {
      const raw = fs.readFileSync(path.join(dir, file), "utf8");
      const data = JSON.parse(raw) as ComponentApi;
      const slug = data.componentSlug ?? file.replace(/\.json$/, "");
      map.set(slug, { ...data, componentSlug: slug });
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      process.stderr.write(`[loadComponentApis] failed to parse ${file}: ${message}\n`);
    }
  }
  return map;
}
