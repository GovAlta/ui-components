import { ReactNode } from "react";
import { GoabText, GoabCallout, GoabLink } from "@abgov/react-components";

type ResultsPageProps = {
  /** The outcome statement (H1). */
  heading: string;
  /** Status colour: "success" for a positive outcome, "important" for a blocked one. */
  status: "success" | "important";
  /** The Callout heading — the headline status (often the specific reason). */
  statusHeading: string;
  /** Optional Callout body. */
  statusBody?: ReactNode;
  /** Content between the Callout and the actions (e.g. "what happens next", the contact block). */
  children?: ReactNode;
  /** The action button group. */
  actions: ReactNode;
};

/**
 * Results page (the goa-public-form result-page candidate): the terminal outcome
 * screen for a service — eligible / not eligible / submitted.
 *
 * The inverse of FormSet. A question page leads with a form and sits inside
 * PublicFormLayout (which renders the back link); a result page is terminal, so
 * it has NO back link and leads with a status Callout. It is rendered directly
 * inside the app shell (PublicFormApp), not wrapped by PublicFormLayout.
 *
 * Owns the result-page anatomy from the Figma: H1 outcome -> status Callout ->
 * optional content -> action button group.
 */
export function ResultsPage({
  heading,
  status,
  statusHeading,
  statusBody,
  children,
  actions,
}: ResultsPageProps) {
  return (
    <>
      <GoabText tag="h1" mt="none" mb="xl">
        {heading}
      </GoabText>

      {/* mb none: the next section's heading owns the gap (mt xl), so sections
          sit on one consistent rhythm whether or not a Callout body is present. */}
      <GoabCallout type={status} heading={statusHeading} mb="none">
        {statusBody}
      </GoabCallout>

      {children}

      <div style={{ marginTop: "var(--goa-space-2xl)" }}>{actions}</div>
    </>
  );
}

/**
 * "If you have questions about your application" — the contact block that repeats
 * on every result page in the Figma. Hand-built; a real contact-details block is
 * a candidate Step-2 piece.
 */
export function ResultContactSection() {
  return (
    <>
      <GoabText tag="h2" mt="xl" mb="s">
        If you have questions about your application
      </GoabText>
      <GoabText mt="none" mb="s">
        Contact the [ministry area].
      </GoabText>
      <GoabText mt="none" mb="2xs">
        <strong>Email:</strong>{" "}
        <GoabLink>
          <a href="mailto:information@gov.ab.ca">information@gov.ab.ca</a>
        </GoabLink>
      </GoabText>
      <GoabText mt="none" mb="none">
        <strong>Phone:</strong> 780 123 4567
      </GoabText>
    </>
  );
}
