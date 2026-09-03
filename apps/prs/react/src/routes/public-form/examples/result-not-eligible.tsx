import { useNavigate } from "react-router-dom";
import { GoabButton, GoabButtonGroup } from "@abgov/react-components";
import { ResultsPage, ResultContactSection } from "../results-page";

/**
 * Result page — not-eligible outcome. Important (yellow) Callout stating the
 * reason, the contact block, then two exits. Matches the Figma "not eligible"
 * result page. The in-flow eligibility dead-end (examples/ineligible.tsx) uses
 * the same ResultsPage piece with a flow-contextual action instead.
 */
export function ResultNotEligible() {
  const navigate = useNavigate();
  const home = () => navigate("/public-form");
  return (
    <ResultsPage
      heading="You are not eligible for this service"
      status="important"
      statusHeading="You must live in Alberta to be eligible for this service"
      statusBody="Contact us if you think this does not apply to you."
      actions={
        <GoabButtonGroup alignment="start">
          <GoabButton type="primary" onClick={home}>
            Return to my applications
          </GoabButton>
          <GoabButton type="secondary" onClick={home}>
            Back to Alberta.ca
          </GoabButton>
        </GoabButtonGroup>
      }
    >
      <ResultContactSection />
    </ResultsPage>
  );
}
