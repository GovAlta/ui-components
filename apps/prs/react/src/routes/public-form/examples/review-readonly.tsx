import { useNavigate } from "react-router-dom";
import { GoabText, GoabButton, GoabButtonGroup } from "@abgov/react-components";
import { FormSummary, SummarySection, SummaryItem } from "../form-summary";

/**
 * Review page — read-only state. No Change links (a SummarySection renders
 * read-only when given no change target), no confirm checkbox, and no back link;
 * it exits with "Back to all tasks". Matches the Figma read-only "Review your
 * answers", the state used once a submission can no longer be changed.
 */
export function ReviewReadonly() {
  const navigate = useNavigate();

  return (
    <>
      <GoabText tag="h1" mt="none" mb="xl">
        Review your answers
      </GoabText>

      <FormSummary title="My information">
        <SummarySection heading="Personal details">
          <SummaryItem question="Full name">Jane Smith</SummaryItem>
          <SummaryItem question="Date of birth">1 January 1990</SummaryItem>
        </SummarySection>

        <SummarySection>
          <SummaryItem question="Phone number">780 123 4567</SummaryItem>
        </SummarySection>
      </FormSummary>

      <FormSummary title="My family">
        <SummarySection heading="Dependants">
          <SummaryItem question="Number of children">2</SummaryItem>
          <SummaryItem question="Names">Alex Smith, Sam Smith</SummaryItem>
        </SummarySection>
      </FormSummary>

      <GoabButtonGroup alignment="start" mt="l">
        <GoabButton type="secondary" leadingIcon="arrow-back" onClick={() => navigate("/public-form")}>
          Back to all tasks
        </GoabButton>
      </GoabButtonGroup>
    </>
  );
}
