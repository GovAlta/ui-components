import { useNavigate } from "react-router-dom";
import { GoabButton, GoabButtonGroup } from "@abgov/react-components";
import { ResultsPage, ResultContactSection } from "../results-page";

/**
 * Result page — eligible outcome. Success (green) Callout, the standard contact
 * block, then the forward action. Matches the Figma "eligible" result page.
 */
export function ResultEligible() {
  const navigate = useNavigate();
  // Demo actions return to the gallery home; in a real service "Continue" would
  // go to the application form.
  const home = () => navigate("/public-form");
  return (
    <ResultsPage
      heading="You are eligible for this service"
      status="success"
      statusHeading="You are eligible for this service"
      statusBody="Based on your answers, you can apply for this service."
      actions={
        <GoabButtonGroup alignment="start">
          <GoabButton type="secondary" onClick={home}>
            Continue your application
          </GoabButton>
        </GoabButtonGroup>
      }
    >
      <ResultContactSection />
    </ResultsPage>
  );
}
