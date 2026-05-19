import type { AnyRecord, Finding } from "../types";
import { checkComponentRefs } from "./component-refs";
import { checkIdRefs } from "./id-refs";
import { checkPropRefs } from "./prop-refs";

/**
 * Run all cross-validation checks against the loaded records.
 */
export function runChecks(records: AnyRecord[]): Finding[] {
  return [
    ...checkComponentRefs(records),
    ...checkIdRefs(records),
    ...checkPropRefs(records),
  ];
}
