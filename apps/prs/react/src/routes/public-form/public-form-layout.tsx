import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GoabLink } from "@abgov/react-components";

type PublicFormLayoutProps = {
  /** Where the back link navigates (a route). Defaults to the task list. */
  back?: string;
  /** Back link text. Defaults to "Back". */
  backLabel?: string;
  /**
   * Back as an action instead of a route (e.g. "Back to review" cancelling a
   * change-from-review flow). Takes precedence over `back` when set.
   */
  onBack?: () => void;
  /** The page content, typically a <FormSet>. */
  children: ReactNode;
};

/**
 * Public-form page layout (the goa-public-form-layout candidate).
 *
 * Owns the page-shell concerns that sit OUTSIDE the form set: the back link and
 * the back-link -> content spacing. The form content lives in <FormSet>; the GoA
 * app shell is provided one level up by PublicFormApp.
 */
export function PublicFormLayout({
  back = "/public-form",
  backLabel = "Back",
  onBack,
  children,
}: PublicFormLayoutProps) {
  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small" color="dark" mb="none">
        {onBack ? (
          <a
            role="button"
            tabIndex={0}
            style={{ cursor: "pointer" }}
            onClick={onBack}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onBack();
              }
            }}
          >
            {backLabel}
          </a>
        ) : (
          <Link to={back}>{backLabel}</Link>
        )}
      </GoabLink>

      {/* xl gap is the canonical back-link -> heading rhythm; the first child sits
          flush (mt none) so the gap is exactly this. */}
      <div style={{ marginTop: "var(--goa-space-xl)" }}>{children}</div>
    </>
  );
}
