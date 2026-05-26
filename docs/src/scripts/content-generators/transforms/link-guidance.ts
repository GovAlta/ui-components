import type { ComponentRecord, GuidanceRecord } from "../types";
import { buildComponentLookup } from "./component-lookup";

// For each component, attach the list of guidance entry ids that target it
// via guidance.appliesTo.components. The MCP `get` on a component can then
// surface guidance inline, so consumers retrieve a component and its related
// guidance in a single call instead of separate searches.
//
// guidance.appliesTo.components is alias-aware: legacy slugs like "app-footer"
// resolve through the alias map to the canonical "footer" record.
export function linkGuidanceToComponents(
  components: ComponentRecord[],
  guidance: GuidanceRecord[],
): ComponentRecord[] {
  const lookup = buildComponentLookup(components);
  const byCanonicalId = new Map<string, Set<string>>();
  for (const g of guidance) {
    const targets = g.appliesTo?.components ?? [];
    for (const slug of targets) {
      const canonical = lookup.get(slug);
      if (!canonical) continue;
      const set = byCanonicalId.get(canonical.id) ?? new Set<string>();
      set.add(g.id);
      byCanonicalId.set(canonical.id, set);
    }
  }

  return components.map((c) => {
    const linked = byCanonicalId.get(c.id);
    if (!linked || linked.size === 0) return c;
    return { ...c, relatedGuidance: [...linked].sort() };
  });
}
