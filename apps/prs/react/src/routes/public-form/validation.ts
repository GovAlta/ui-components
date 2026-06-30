import { useState } from "react";
import { FieldError } from "./error-summary";

/**
 * The validation piece — declarative rules separated from the lifecycle.
 *
 * A page declares its rules as a schema (field id -> rule). The schema is the
 * framework-neutral artifact: it's what an intentional template or a generator
 * would emit, and it reads the same in any framework. `useFormValidation` is the
 * React binding that owns the lifecycle (validate-on-submit, error state, live
 * clearing after the first submit); FormSet still renders the error summary and
 * moves focus. Angular would get an equivalent binding over the same schema shape.
 *
 * This replaces the per-page hand-rolled validate() + submitted + errors plumbing.
 */

/** A rule: given a field's value and all values, return an error message or null. */
export type Rule = (value: unknown, all: Record<string, unknown>) => string | null;
/** Declarative rules per field id. The field id matches the GoabFormItem id. */
export type Schema = Record<string, Rule>;

export const required =
  (message: string): Rule =>
  (v) => {
    if (typeof v === "string") return v.trim() ? null : message;
    if (Array.isArray(v)) return v.length ? null : message;
    return v ? null : message;
  };

export const minSelected =
  (n: number, message: string): Rule =>
  (v) =>
    Array.isArray(v) && v.length >= n ? null : message;

export const pattern =
  (re: RegExp, message: string): Rule =>
  (v) =>
    typeof v === "string" && re.test(v.trim()) ? null : message;

/** Only apply `rule` when `when(all)` is true; otherwise the field is valid. For reveals / conditional fields. */
export const when =
  (predicate: (all: Record<string, unknown>) => boolean, rule: Rule): Rule =>
  (v, all) =>
    predicate(all) ? rule(v, all) : null;

/**
 * Run a schema against values, in declaration order, so the error summary lists
 * errors top-to-bottom matching the field order on the page.
 */
export function runSchema(schema: Schema, values: Record<string, unknown>): FieldError[] {
  const errors: FieldError[] = [];
  for (const [fieldId, rule] of Object.entries(schema)) {
    const message = rule(values[fieldId], values);
    if (message) errors.push({ fieldId, text: message });
  }
  return errors;
}

/** The validation lifecycle. Owns error state and validate-on-submit; FormSet renders the rest. */
export function useFormValidation(schema: Schema) {
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  /** Validate now; run `onValid` only if the form is valid. Call from the submit handler. */
  const submit = (values: Record<string, unknown>, onValid: () => void) => {
    setSubmitted(true);
    const found = runSchema(schema, values);
    setErrors(found);
    if (found.length === 0) onValid();
  };

  /** After the first submit, re-validate as the user edits (live clear). Call from onChange. */
  const revalidate = (values: Record<string, unknown>) => {
    if (submitted) setErrors(runSchema(schema, values));
  };

  return { errors, submit, revalidate };
}
