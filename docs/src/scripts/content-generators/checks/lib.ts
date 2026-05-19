import { distance } from "fastest-levenshtein";
import type { AnyRecord, Finding } from "../types";

const MAX_EDIT_DISTANCE = 2;

/** Returns the set of ids for records in the given collection. */
export function collectIds(
  records: AnyRecord[],
  collection: AnyRecord["collection"],
): Set<string> {
  const ids = new Set<string>();
  for (const r of records) {
    if (r.collection === collection) ids.add(r.id);
  }
  return ids;
}

/**
 * Returns the set of ids plus aliases for records in the given collection.
 * Lets cross-references match either the canonical id or any legacy/sub-component
 * name surfaced on the record's aliases array.
 */
export function collectIdsAndAliases(
  records: AnyRecord[],
  collection: AnyRecord["collection"],
): Set<string> {
  const set = new Set<string>();
  for (const r of records) {
    if (r.collection !== collection) continue;
    set.add(r.id);
    const aliases = (r as { aliases?: string[] }).aliases;
    if (Array.isArray(aliases)) for (const a of aliases) set.add(a);
  }
  return set;
}

/**
 * For each ref in `refs` that does not appear in `validIds`, push an
 * error-severity Finding describing the broken reference. Populates
 * `hint` when a close-by valid id exists.
 */
export function pushBrokenRefs(
  findings: Finding[],
  source: AnyRecord,
  field: string,
  refs: string[] | undefined,
  validIds: Set<string>,
): void {
  if (!Array.isArray(refs)) return;
  for (const ref of refs) {
    if (validIds.has(ref)) continue;
    findings.push({
      severity: "error",
      source: { collection: source.collection, id: source.id },
      field,
      brokenRef: ref,
      hint: computeHint(ref, validIds),
    });
  }
}

/**
 * If any id in `validIds` is within MAX_EDIT_DISTANCE of `ref`, return
 * `did you mean "<closest>"?`. If multiple ids tie, take the first by
 * sort order. Returns undefined if no id is close enough.
 */
export function computeHint(ref: string, validIds: Set<string>): string | undefined {
  let best: string | undefined;
  let bestDistance = MAX_EDIT_DISTANCE + 1;

  const sorted = [...validIds].sort();
  for (const candidate of sorted) {
    const d = distance(ref, candidate);
    if (d < bestDistance) {
      bestDistance = d;
      best = candidate;
    }
  }

  return best ? `did you mean "${best}"?` : undefined;
}
