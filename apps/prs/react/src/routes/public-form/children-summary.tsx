import { ReactNode } from "react";
import { SummarySection } from "./form-summary";

type ChildItem = {
  /** Stable id (React key). */
  id: string;
  /** The key identifying field shown on review (e.g. a name). */
  label: string;
  /** Optional secondary detail, shown muted under the label. */
  detail?: ReactNode;
};

type ChildrenSummaryProps = {
  /** Group title (e.g. "Emergency contacts"). */
  title: string;
  /** The collected items. */
  items: ChildItem[];
  /** Text shown when there are no items. */
  emptyText?: string;
  /** One Change/manage action for the whole group, as an action... */
  onChange?: () => void;
  /** ...or as a route. */
  changeTo?: string;
  changeLabel?: string;
};

/**
 * Children summary (= goab-children-form-summary): the review-side representation
 * of a REPEATING group (items added via modal / drawer / new page). Per the
 * 2026-06-19 notes, a child loop collapses on the review to each item's key
 * identifying field (a name), not every sub-field, with one Change back to the
 * page where the items are managed. The full detail lives there.
 *
 * Composes SummarySection (the same card + title + one Change), with a list of
 * children by key label as its body instead of Q/A rows.
 */
export function ChildrenSummary({
  title,
  items,
  emptyText = "None added",
  onChange,
  changeTo,
  changeLabel,
}: ChildrenSummaryProps) {
  return (
    <SummarySection heading={title} onChange={onChange} changeTo={changeTo} changeLabel={changeLabel}>
      {items.length === 0 ? (
        <span style={{ color: "var(--goa-color-text-secondary)" }}>{emptyText}</span>
      ) : (
        items.map((it) => (
          <div key={it.id} style={{ padding: "var(--goa-space-2xs) 0" }}>
            <div>
              <strong>{it.label}</strong>
            </div>
            {it.detail != null && (
              <div style={{ color: "var(--goa-color-text-secondary)" }}>{it.detail}</div>
            )}
          </div>
        ))
      )}
    </SummarySection>
  );
}
