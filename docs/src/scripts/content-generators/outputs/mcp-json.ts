import * as fs from "fs";
import * as path from "path";
import { paths } from "../config";
import type { AnyRecord } from "../types";

export function writeMcpJson(records: AnyRecord[]): { written: number } {
  const byCollection = new Map<string, AnyRecord[]>();
  for (const rec of records) {
    const list = byCollection.get(rec.collection) ?? [];
    list.push(rec);
    byCollection.set(rec.collection, list);
  }

  fs.mkdirSync(paths.output.mcp, { recursive: true });

  // Clear stale files in each collection folder before writing. Renamed or
  // removed records would otherwise leave orphan JSON behind. Errors block
  // the orchestrator before this point (see index.ts), so the previous
  // output stays as last-known-good on a failed run.
  let written = 0;
  for (const [collection, list] of byCollection) {
    const dir = path.join(paths.output.mcp, collection);
    if (fs.existsSync(dir)) {
      for (const entry of fs.readdirSync(dir)) {
        if (entry.endsWith(".json")) fs.unlinkSync(path.join(dir, entry));
      }
    } else {
      fs.mkdirSync(dir, { recursive: true });
    }
    for (const rec of list) {
      // Flatten nested ids (e.g. "designers/designing-with-ds") into a
      // filesystem-safe filename. The canonical id lives in the JSON body.
      const filename = rec.id.replace(/\//g, "__") + ".json";
      const file = path.join(dir, filename);
      const payload = sortKeys(rec);
      fs.writeFileSync(file, JSON.stringify(payload, null, 2) + "\n", "utf8");
      written++;
    }
  }
  return { written };
}

// Deterministic key order so byte-identical reruns are possible. Lets a
// downstream freshness check detect content changes via file hash.
function sortKeys<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map(sortKeys) as unknown as T;
  }
  if (value && typeof value === "object") {
    const sorted: Record<string, unknown> = {};
    for (const key of Object.keys(value).sort()) {
      sorted[key] = sortKeys((value as Record<string, unknown>)[key]);
    }
    return sorted as unknown as T;
  }
  return value;
}
