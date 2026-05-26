import type { AnyRecord, Finding } from "../types";
import { collectIdsAndAliases, pushBrokenRefs } from "./lib";

/**
 * Validates the four cross-references that target component ids:
 *   - components.relatedComponents
 *   - examples.components
 *   - guidance.appliesTo.components
 *   - productTypes.components
 *
 * All produce error-severity findings when a referenced id is not in the
 * components collection (either as a canonical id or as an alias).
 */
export function checkComponentRefs(records: AnyRecord[]): Finding[] {
  const findings: Finding[] = [];
  const componentIds = collectIdsAndAliases(records, "components");

  for (const r of records) {
    if (r.collection === "components") {
      pushBrokenRefs(findings, r, "relatedComponents", r.relatedComponents, componentIds);
    } else if (r.collection === "examples") {
      pushBrokenRefs(findings, r, "components", r.components, componentIds);
    } else if (r.collection === "guidance") {
      pushBrokenRefs(
        findings,
        r,
        "appliesTo.components",
        r.appliesTo?.components,
        componentIds,
      );
    } else if (r.collection === "productTypes") {
      pushBrokenRefs(findings, r, "components", r.components, componentIds);
    }
  }

  return findings;
}
