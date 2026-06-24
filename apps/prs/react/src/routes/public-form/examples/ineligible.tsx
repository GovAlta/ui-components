import { useNavigate } from "react-router-dom";
import { GoabButton, GoabButtonGroup } from "@abgov/react-components";
import { ResultsPage, ResultContactSection } from "../results-page";

const ROOT = "/public-form/eligibility";

/**
 * Ineligible outcome: the dead-end branch of the eligibility task, reached when a
 * gating question fails. Uses the shared ResultsPage piece (not a FormSet, not a
 * question page), with a flow-contextual primary action that sends the user back
 * to the questions to change their answers. The standalone showcase of this
 * pattern is examples/result-not-eligible.tsx.
 */
export function Ineligible() {
  const navigate = useNavigate();
  return (
    <ResultsPage
      heading="You are not eligible to apply"
      status="important"
      statusHeading="Based on your answers, you do not meet the eligibility criteria"
      statusBody="You can go back and change your answers if you think this is a mistake."
      actions={
        <GoabButtonGroup alignment="start">
          <GoabButton type="primary" onClick={() => navigate(`${ROOT}/age`)}>
            Go back and change your answers
          </GoabButton>
          <GoabButton type="secondary" onClick={() => navigate("/public-form")}>
            Back to Alberta.ca
          </GoabButton>
        </GoabButtonGroup>
      }
    >
      <ResultContactSection />
    </ResultsPage>
  );
}
