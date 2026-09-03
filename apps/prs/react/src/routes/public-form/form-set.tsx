import { ReactNode } from "react";
import { GoabText, GoabButton, GoabButtonGroup } from "@abgov/react-components";
import { ErrorSummary, FieldError, useErrorSummaryFocus } from "./error-summary";

type FormSetProps = {
  /**
   * Section name / question heading. Omit for a lone single question whose
   * field uses labelSize="large" so its label doubles as the page heading.
   */
  heading?: string;
  /** Supporting content shown below the heading (only rendered with a heading). */
  description?: ReactNode;
  /** The field(s). */
  children: ReactNode;
  /** Primary action label. Defaults to "Continue". */
  continueLabel?: string;
  /** Runs when the primary action is pressed (the page owns validation + navigation). */
  onContinue?: () => void;
  /**
   * Validation errors. When non-empty, renders the error summary above the
   * fields and moves focus to it on a fresh failed submit. The page owns the
   * rules and sets matching field-level errors.
   */
  errors?: FieldError[];
};

/**
 * Form set (the goa-form-set candidate): the form-content unit shared by every
 * question page. Renders an optional section header, the error summary, the
 * fields, and the Save-and-continue button, and owns:
 *  - the within-form vertical rhythm (heading -> description -> fields -> button)
 *  - the error summary's placement and focus-on-submit
 *
 * Two shapes, matching the component's "Multiple questions" variant:
 *  - Lone single question: omit `heading`; the single field uses labelSize="large"
 *    so its label is the heading.
 *  - Section / multiple questions: pass `heading`; fields use normal labels.
 *
 * The back link and app shell are NOT here. They live in PublicFormLayout and
 * PublicFormApp.
 */
export function FormSet({
  heading,
  description,
  children,
  continueLabel = "Continue",
  onContinue,
  errors = [],
}: FormSetProps) {
  // Focus the summary on a fresh failed submit (empty -> non-empty), not while the
  // user is live-clearing errors as they fix them.
  const summaryRef = useErrorSummaryFocus(errors);

  return (
    <>
      {heading && (
        <GoabText tag="h1" mt="none" mb={description ? "m" : "xl"}>
          {heading}
        </GoabText>
      )}
      {heading && description && (
        <GoabText mt="none" mb="xl">
          {description}
        </GoabText>
      )}

      <ErrorSummary ref={summaryRef} errors={errors} />

      {children}

      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary" onClick={onContinue}>
          {continueLabel}
        </GoabButton>
      </GoabButtonGroup>
    </>
  );
}
