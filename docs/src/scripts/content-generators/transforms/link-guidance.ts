import type { ComponentRecord, GuidanceRecord } from "../types";

// For each component, attach the list of guidance entry ids that target it
// via guidance.appliesTo.components. The MCP `get` on a component can then
// surface guidance inline, so consumers retrieve a component and its related
// guidance in a single call instead of separate searches.
export function linkGuidanceToComponents(
  components: ComponentRecord[],
  guidance: GuidanceRecord[],
): ComponentRecord[] {
  const byComponent = new Map<string, string[]>();
  for (const g of guidance) {
    const targets = g.appliesTo?.components ?? [];
    for (const slug of targets) {
      const list = byComponent.get(slug) ?? [];
      list.push(g.id);
      byComponent.set(slug, list);
    }
  }

  return components.map((c) => {
    const linked = byComponent.get(c.id);
    if (!linked || linked.length === 0) return c;
    return { ...c, relatedGuidance: [...linked].sort() };
  });
}
