import type { ComponentRecord } from "../types";

// Builds a slug → component lookup keyed by both canonical id and every alias.
// Lets cross-references that point at legacy slugs (app-footer, text-area,
// notification-banner, multi-action-button) resolve to the current canonical
// record without forcing source MDX edits.
//
// Run after addComponentAliases so aliases are populated.
export function buildComponentLookup(
  components: ComponentRecord[],
): Map<string, ComponentRecord> {
  const lookup = new Map<string, ComponentRecord>();
  for (const c of components) {
    lookup.set(c.id, c);
    for (const alias of c.aliases ?? []) {
      // Don't overwrite a canonical id with an alias collision.
      if (!lookup.has(alias)) lookup.set(alias, c);
    }
  }
  return lookup;
}
