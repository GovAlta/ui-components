import { useNavigate } from "react-router-dom";
import { GoabText, GoabLink, GoabButton, GoabButtonGroup } from "@abgov/react-components";
import { ResultsPage, ResultContactSection } from "../results-page";

/**
 * Result page — submitted outcome. Success Callout, a "what happens next"
 * section, the contact block, then a single exit. Matches the Figma "submitted"
 * result page.
 */
export function ResultSubmitted() {
  const navigate = useNavigate();
  const home = () => navigate("/public-form");
  return (
    <ResultsPage
      heading="You have submitted your application"
      status="success"
      statusHeading="Application submitted"
      statusBody="We've received your application."
      actions={
        <GoabButtonGroup alignment="start">
          <GoabButton type="secondary" onClick={home}>
            Back to Alberta.ca
          </GoabButton>
        </GoabButtonGroup>
      }
    >
      <GoabText tag="h2" mt="xl" mb="s">
        What happens next
      </GoabText>
      <GoabText mt="none" mb="s">
        We've sent your application for review. You will be contacted by email if we need any more
        information from you. You can now close this window.
      </GoabText>
      <GoabText mt="none" mb="none">
        What did you think of this service?{" "}
        <GoabLink>
          <a href="#">Give feedback</a>
        </GoabLink>
      </GoabText>

      <ResultContactSection />
    </ResultsPage>
  );
}
