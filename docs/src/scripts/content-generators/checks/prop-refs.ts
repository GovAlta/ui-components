import type { AnyRecord, ComponentRecord, Finding } from "../types";
import { computeHint } from "./lib";

/**
 * Validates guidance.relatedProps against the extracted prop names on the
 * components named in guidance.appliesTo.components.
 *
 * Warn-level. A relatedProps entry is valid if it exists on AT LEAST ONE
 * of the linked components, matching the semantic "this guidance is about
 * this prop, which lives on one of these components."
 *
 * Skips guidance atoms whose appliesTo.components references components
 * that do not exist; component-refs.ts reports those separately.
 */
export function checkPropRefs(records: AnyRecord[]): Finding[] {
  const findings: Finding[] = [];
  const componentMap = new Map<string, ComponentRecord>();
  for (const r of records) {
    if (r.collection === "components") componentMap.set(r.id, r);
  }

  for (const r of records) {
    if (r.collection !== "guidance") continue;
    if (!Array.isArray(r.relatedProps) || r.relatedProps.length === 0) continue;
    const linkedComponents = r.appliesTo?.components;
    if (!Array.isArray(linkedComponents) || linkedComponents.length === 0) {
      continue;
    }

    // Build the union of props across linked components that exist.
    // Missing components are reported by component-refs.ts; skip them here
    // to avoid double-reports.
    const allValidProps = new Set<string>();
    const knownComponents: string[] = [];
    for (const componentId of linkedComponents) {
      const component = componentMap.get(componentId);
      if (!component) continue;
      knownComponents.push(componentId);
      for (const propName of extractPropNames(component)) {
        allValidProps.add(propName);
      }
    }
    if (knownComponents.length === 0) continue;

    for (const propRef of r.relatedProps) {
      if (allValidProps.has(propRef)) continue;
      findings.push({
        severity: "warning",
        source: { collection: "guidance", id: r.id },
        field: "relatedProps",
        brokenRef: propRef,
        context:
          knownComponents.length === 1
            ? `on component "${knownComponents[0]}"`
            : `on components ${knownComponents.map((c) => `"${c}"`).join(", ")}`,
        notFoundMessage: "not in extracted props",
        hint: computeHint(propRef, allValidProps),
      });
    }
  }

  return findings;
}

/**
 * Walks the component's api blob (frameworks.{react,angular,webComponents}.props[])
 * and returns the union of all prop names declared across frameworks.
 */
function extractPropNames(component: ComponentRecord): Set<string> {
  const names = new Set<string>();
  const api = component.api;
  if (!api || typeof api !== "object") return names;

  const frameworks = (api as Record<string, unknown>).frameworks;
  if (!frameworks || typeof frameworks !== "object") return names;

  for (const key of ["react", "angular", "webComponents"]) {
    const framework = (frameworks as Record<string, unknown>)[key];
    if (!framework || typeof framework !== "object") continue;
    const props = (framework as Record<string, unknown>).props;
    if (!Array.isArray(props)) continue;
    for (const prop of props) {
      if (
        typeof prop === "object" &&
        prop !== null &&
        "name" in prop &&
        typeof (prop as { name: unknown }).name === "string"
      ) {
        names.add((prop as { name: string }).name);
      }
    }
  }

  return names;
}
