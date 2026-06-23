import { forwardRef } from "react";
import { GoabIcon, GoabText } from "@abgov/react-components";

export type FieldError = {
  /** id of the GoabFormItem this error belongs to, used to jump/scroll to the field. */
  fieldId: string;
  /** The message shown both in the summary and (by the page) on the field itself. */
  text: string;
};

const FOCUSABLE = "input, select, textarea, button, [tabindex]:not([tabindex='-1'])";

// Depth-first walk of light DOM and any open shadow roots, returning the first
// focusable control. GoA form controls render their real input inside the web
// component's shadow DOM (the date picker nests a dropdown one level deeper), so
// a normal querySelector on the form item never reaches it.
function findFocusable(node: ParentNode): HTMLElement | null {
  for (const child of Array.from(node.children)) {
    const el = child as HTMLElement;
    if (el.matches(FOCUSABLE)) return el;
    const inLight = findFocusable(el);
    if (inLight) return inLight;
    if (el.shadowRoot) {
      const inShadow = findFocusable(el.shadowRoot);
      if (inShadow) return inShadow;
    }
  }
  return null;
}

/**
 * Error summary for a question page ("There is a problem").
 *
 * The GOV.UK-style pattern the public form needs and the DS does not yet ship as
 * a component: a box listing each field error as a link that jumps to the field.
 * Pairs with per-field inline errors (GoabFormItem `error`). Deliberately NOT a
 * Callout (guidance: callout-not-for-validation). This hand-built piece is a
 * Step-2 component candidate to raise with Vanessa.
 *
 * Rendered and focus-managed by QuestionPage; pages only supply the errors.
 */
export const ErrorSummary = forwardRef<HTMLDivElement, { errors: FieldError[] }>(
  function ErrorSummary({ errors }, ref) {
    if (errors.length === 0) return null;

    const jumpToField = (fieldId: string) => (e: React.MouseEvent) => {
      e.preventDefault();
      const formItem = document.getElementById(fieldId);
      if (!formItem) return;
      formItem.scrollIntoView({ behavior: "smooth", block: "center" });
      // GoA inputs render their real control inside the web component's (open)
      // shadow DOM, sometimes two levels deep (date picker), so a plain
      // querySelector can't reach it. Walk light DOM + shadow roots for the
      // first focusable control.
      findFocusable(formItem)?.focus({ preventScroll: true });
    };

    return (
      <div
        ref={ref}
        tabIndex={-1}
        role="alert"
        aria-labelledby="error-summary-title"
        style={{
          backgroundColor: "var(--goa-color-emergency-background)",
          border: "1px solid var(--goa-color-emergency-default)",
          borderRadius: "var(--goa-border-radius-m)",
          padding: "var(--goa-space-l)",
          marginBottom: "var(--goa-space-xl)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--goa-space-xs)",
            marginBottom: "var(--goa-space-s)",
          }}
        >
          <GoabIcon
            type="warning"
            theme="filled"
            fillColor="var(--goa-color-emergency-default)"
            ariaLabel=""
          />
          <GoabText id="error-summary-title" tag="h2" size="heading-s" mt="none" mb="none">
            There is a problem
          </GoabText>
        </div>

        <ul style={{ margin: 0, paddingLeft: "var(--goa-space-l)" }}>
          {errors.map((err) => (
            <li key={err.fieldId} style={{ marginBottom: "var(--goa-space-2xs)" }}>
              <a
                href={`#${err.fieldId}`}
                onClick={jumpToField(err.fieldId)}
                style={{
                  color: "var(--goa-color-emergency-dark)",
                  textDecoration: "underline",
                }}
              >
                {err.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  },
);
