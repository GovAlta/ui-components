import { ReactNode, createContext, useContext } from "react";
import { Link } from "react-router-dom";
import { GoabText, GoabLink } from "@abgov/react-components";

/**
 * Form summary (the "review your answers" pattern) — the slot-based V1 spec for
 * the three components agreed with Vanessa (2026-06-18 component-planning meeting):
 *
 *   FormSummary    (= goab-form-summary)   section title + a group of sections
 *   SummarySection (= goab-summary-section) the card: optional heading + Change action
 *   SummaryItem    (= goab-summary-item)    one Q/A row: question + answer slot
 *
 * V1 = slots: each piece owns structure/spacing/layout, the consumer passes the
 * content in (children). No internal data management. See review-page-spec.md (in
 * the conductor) for how each question type maps onto these pieces and the decisions.
 */

// showUnanswered is set on FormSummary and read by SummaryItem — the React analog
// of a parent web-component attribute shared down via the GoA context store.
const FormSummaryContext = createContext<{ showUnanswered: boolean }>({ showUnanswered: true });

function isEmptyAnswer(children: ReactNode): boolean {
  if (children == null || children === false || children === "") return true;
  if (typeof children === "string") return children.trim() === "";
  if (Array.isArray(children)) return children.length === 0;
  return false;
}

type FormSummaryProps = {
  /** Section title (e.g. "My information"). Optional. */
  title?: string;
  /**
   * Whether unanswered optional questions render as "Not answered" (default) or
   * are hidden. The author toggle from review-page-spec.md.
   */
  showUnanswered?: boolean;
  /** SummarySection cards. */
  children: ReactNode;
};

/** Top level: a titled group of summary sections. */
export function FormSummary({ title, showUnanswered = true, children }: FormSummaryProps) {
  return (
    <FormSummaryContext.Provider value={{ showUnanswered }}>
      <div style={{ marginBottom: "var(--goa-space-l)" }}>
        {title && (
          <GoabText tag="h2" mt="none" mb="s" color="secondary">
            {title}
          </GoabText>
        )}
        {children}
      </div>
    </FormSummaryContext.Provider>
  );
}

type SummarySectionProps = {
  /** Optional group heading (the grey "Heading for group of questions"). */
  heading?: string;
  /** Where the section's Change link goes (a route). Omit for a read-only section. */
  changeTo?: string;
  /** Change as an action instead of a route (e.g. to enter a change-from-review flow). */
  onChange?: () => void;
  /** Change link label. */
  changeLabel?: string;
  /** SummaryItem rows. */
  children: ReactNode;
};

/** The card: one bordered group, an optional heading, one Change action for the group. */
export function SummarySection({
  heading,
  changeTo,
  onChange,
  changeLabel = "Change",
  children,
}: SummarySectionProps) {
  return (
    <div
      style={{
        border: "1px solid var(--goa-color-greyscale-200)",
        borderRadius: "var(--goa-border-radius-xl)",
        padding: "var(--goa-space-m) var(--goa-space-l)",
        marginBottom: "var(--goa-space-m)",
      }}
    >
      {/* Change sits beside the content (top-right), not on its own line above it,
          so a single-row card reads as one line with no odd gap above the question.
          Change is section-level, so it aligns to the top of the group. mt/mb none
          zeroes GoabLink's default margins. */}
      <div style={{ display: "flex", gap: "var(--goa-space-l)", alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          {heading && (
            <span
              style={{
                display: "block",
                color: "var(--goa-color-text-secondary)",
                marginBottom: "var(--goa-space-xs)",
              }}
            >
              {heading}
            </span>
          )}
          {children}
        </div>
        {(changeTo || onChange) && (
          <GoabLink mt="none" mb="none">
            {onChange ? (
              <a
                role="button"
                tabIndex={0}
                style={{ cursor: "pointer" }}
                onClick={onChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onChange();
                  }
                }}
              >
                {changeLabel}
              </a>
            ) : (
              <Link to={changeTo!}>{changeLabel}</Link>
            )}
          </GoabLink>
        )}
      </div>
    </div>
  );
}

type SummaryItemProps = {
  /** The question / field label (left column). */
  question: string;
  /**
   * Marks an optional question. When its answer is empty it renders "Not answered"
   * (or is hidden if the FormSummary's showUnanswered is off). Empty secondary
   * sub-fields are simply not passed in (developer-controlled), not marked optional.
   */
  optional?: boolean;
  /** The answer (right column) — text, a long paragraph, a selected-options list, a file link. The V1 slot. */
  children?: ReactNode;
};

/** One row inside a section: question on the left, answer (slot) on the right. */
export function SummaryItem({ question, optional, children }: SummaryItemProps) {
  const { showUnanswered } = useContext(FormSummaryContext);
  const empty = isEmptyAnswer(children);

  // Optional + empty: hidden when the form turns unanswered display off; otherwise
  // a muted "Not answered" so the user sees what they chose to skip.
  if (optional && empty && !showUnanswered) return null;
  const answer =
    optional && empty ? (
      <span style={{ color: "var(--goa-color-text-secondary)" }}>Not answered</span>
    ) : (
      children
    );

  return (
    <div
      style={{
        display: "flex",
        gap: "var(--goa-space-l)",
        alignItems: "baseline",
        padding: "var(--goa-space-xs) 0",
      }}
    >
      <span style={{ flex: "0 0 40%" }}>
        <strong>{question}</strong>
      </span>
      <span style={{ flex: 1 }}>{answer}</span>
    </div>
  );
}
