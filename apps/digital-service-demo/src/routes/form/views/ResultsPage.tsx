import { GoabButtonGroup, GoabText } from "@abgov/react-components";
import { GoabxButton, GoabxCallout, GoabxLink } from "@abgov/react-components/experimental";

type ResultsPageProps = {
  referenceId?: string;
  citizenEmail?: string;
  onBackToDashboard: () => void;
  onBackToStart: () => void;
};

/**
 * Results Page - shown after successful application submission
 * Matches Figma design: node-id=60560-209724
 */
export function ResultsPage({ referenceId, citizenEmail, onBackToDashboard, onBackToStart }: ResultsPageProps) {
  return (
    <div className="form-set">
      <GoabText as="h1" size="heading-l" mt="2xl" mb="xl">
        You have submitted your application
      </GoabText>

      <GoabxCallout type="success" heading="Application submitted" emphasis="high">
        You will receive a copy of the confirmation to {citizenEmail || "your email"}.
        <br />
        Your reference number is <strong>{referenceId || "1234ABC"}</strong>
        <div style={{ marginTop: "var(--goa-space-m)" }}>
          <GoabxLink leadingIcon="download">
            Download PDF of submitted application
          </GoabxLink>
        </div>
      </GoabxCallout>

      <GoabText as="h2" size="heading-s" mt="xl" mb="s">
        What happens next
      </GoabText>

      <GoabText size="body-m" mt="none" mb="m">
        We've sent your application for review. You will be contacted by email if we
        need any more information from you. You can now close this window.
      </GoabText>

      <GoabText size="body-m" mt="none" mb="xl">
        What did you think of this service?{" "}
        <a href="#">Give feedback</a>
      </GoabText>

      <GoabText as="h2" size="heading-s" mt="none" mb="s">
        If you have questions about your application
      </GoabText>

      <GoabText size="body-m" mt="none" mb="l">
        Contact the Service Support team.
      </GoabText>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--goa-space-m)", marginBottom: "var(--goa-space-2xl)" }}>
        <GoabText size="body-m" mt="none" mb="none">
          <strong>Email:</strong>{" "}
          <a href="mailto:information@gov.ab.ca">information@gov.ab.ca</a>
        </GoabText>
        <GoabText size="body-m" mt="none" mb="none">
          <strong>Phone:</strong> 780 123 4567
        </GoabText>
      </div>

      <GoabButtonGroup alignment="start">
        <GoabxButton type="secondary" onClick={onBackToDashboard}>
          Return to my applications
        </GoabxButton>
        <GoabxButton type="tertiary" onClick={onBackToStart}>
          Back to Alberta.ca
        </GoabxButton>
      </GoabButtonGroup>
    </div>
  );
}
