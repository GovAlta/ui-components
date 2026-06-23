import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { GoabLink } from "@abgov/react-components";

type PublicFormLayoutProps = {
  /** Where the back link navigates. Defaults to the task list. */
  back?: string;
  /** Back link text. Defaults to "Back". */
  backLabel?: string;
  /** The page content, typically a <FormSet>. */
  children: ReactNode;
};

/**
 * Public-form page layout (the goa-public-form-layout candidate).
 *
 * Owns the page-shell concerns that sit OUTSIDE the form set: the back link and
 * the back-link -> content spacing. The form content (heading, fields, submit)
 * lives in <FormSet>, matching the boundary in the goa-form-set Figma component
 * (its only variant axis is "Multiple questions"; the back link is not part of
 * it). The GoA app shell (header / footer / single column) is provided one level
 * up by PublicFormApp.
 */
export function PublicFormLayout({
  back = "/public-form",
  backLabel = "Back",
  children,
}: PublicFormLayoutProps) {
  return (
    <>
      <GoabLink leadingIcon="arrow-back" size="small" mb="none">
        <Link to={back}>{backLabel}</Link>
      </GoabLink>

      {/* xl gap is the canonical back-link -> heading rhythm; FormSet's first
          element sits flush (mt none) so the gap is exactly this. */}
      <div style={{ marginTop: "var(--goa-space-xl)" }}>{children}</div>
    </>
  );
}
