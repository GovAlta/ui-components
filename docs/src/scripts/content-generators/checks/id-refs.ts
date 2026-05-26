import type { AnyRecord, Finding } from "../types";
import { collectIds, collectIdsAndAliases, pushBrokenRefs } from "./lib";

/**
 * Validates cross-references against guidance and example ids:
 *   - components.relatedGuidance → guidance ids
 *   - examples.relatedExamples → example ids (and aliases, since examples
 *     carry old-slug aliases via EXAMPLE_SLUG_ALIASES)
 *
 * Both produce error-severity findings.
 */
export function checkIdRefs(records: AnyRecord[]): Finding[] {
  const findings: Finding[] = [];
  const guidanceIds = collectIds(records, "guidance");
  const exampleIds = collectIdsAndAliases(records, "examples");

  for (const r of records) {
    if (r.collection === "components") {
      pushBrokenRefs(findings, r, "relatedGuidance", r.relatedGuidance, guidanceIds);
    } else if (r.collection === "examples") {
      pushBrokenRefs(findings, r, "relatedExamples", r.relatedExamples, exampleIds);
    }
  }

  return findings;
}
