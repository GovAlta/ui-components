import { GoabButton, GoabButtonGroup, GoabText } from "@abgov/react-components";
import { GoabxCallout } from "@abgov/react-components/experimental";

type IneligibleResultsPageProps = {
  onBackToStart: () => void;
  onBackToApplications: () => void;
};

/**
 * Ineligible Results Page - shown when user doesn't meet eligibility criteria
 * Matches Figma design: node-id=60560-205776
 */
export function IneligibleResultsPage({ onBackToStart, onBackToApplications }: IneligibleResultsPageProps) {
  return (
    <div className="form-set">
      <GoabText as="h1" size="heading-l" mt="2xl" mb="xl">
        You are not eligible for this service
      </GoabText>

      <GoabxCallout type="important" heading="You are not eligible for this service" emphasis="high">
        You must be 18 years or older to apply for this service.
        <br /><br />
        You may now close this window.
      </GoabxCallout>

      <GoabText as="h2" size="heading-s" mt="xl" mb="s">
        If you have questions about your application
      </GoabText>

      <GoabText size="body-m" mt="none" mb="l">
        Contact the Service Support team.
      </GoabText>

      <div style={{ marginBottom: "var(--goa-space-xs)" }}>
        <GoabText size="body-m" mt="none" mb="none">
          <strong>Email:</strong>{" "}
          <a href="mailto:information@gov.ab.ca">information@gov.ab.ca</a>
        </GoabText>
      </div>

      <div style={{ marginBottom: "var(--goa-space-2xl)" }}>
        <GoabText size="body-m" mt="none" mb="none">
          <strong>Phone:</strong> 780 123 4567
        </GoabText>
      </div>

      <GoabButtonGroup alignment="start">
        <GoabButton type="secondary" onClick={onBackToApplications}>
          Return to my applications
        </GoabButton>
        <GoabButton type="tertiary" onClick={onBackToStart}>
          Back to Alberta.ca
        </GoabButton>
      </GoabButtonGroup>
    </div>
  );
}
