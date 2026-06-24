import { ReactNode } from "react";
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
 * content in (children). No internal data management. Read-only vs editable falls
 * out of whether a SummarySection is given a change target.
 *
 * These mirror the parent/child shape of the task list (task-list -> task-list-item),
 * so the demo reads as the spec Vanessa hardens into web components in Step 2.
 */

type FormSummaryProps = {
  /** Section title (e.g. "My information"). Optional. */
  title?: string;
  /** SummarySection cards. */
  children: ReactNode;
};

/** Top level: a titled group of summary sections. */
export function FormSummary({ title, children }: FormSummaryProps) {
  return (
    <div style={{ marginBottom: "var(--goa-space-l)" }}>
      {title && (
        <GoabText tag="h2" mt="none" mb="s" color="secondary">
          {title}
        </GoabText>
      )}
      {children}
    </div>
  );
}

type SummarySectionProps = {
  /** Optional group heading (the grey "Heading for group of questions"). */
  heading?: string;
  /** Where the section's Change link goes. Omit for a read-only section (no Change link). */
  changeTo?: string;
  /** Change link label. */
  changeLabel?: string;
  /** SummaryItem rows. */
  children: ReactNode;
};

/** The card: one bordered group, an optional heading, one Change action for the group. */
export function SummarySection({
  heading,
  changeTo,
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
        {changeTo && (
          <GoabLink mt="none" mb="none">
            <Link to={changeTo}>{changeLabel}</Link>
          </GoabLink>
        )}
      </div>
    </div>
  );
}

type SummaryItemProps = {
  /** The question / field label (left column). */
  question: string;
  /** The answer (right column) — text, a long paragraph, a file link, etc. The V1 slot. */
  children: ReactNode;
};

/** One row inside a section: question on the left, answer (slot) on the right. */
export function SummaryItem({ question, children }: SummaryItemProps) {
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
      <span style={{ flex: 1 }}>{children}</span>
    </div>
  );
}
