import { useState } from "react";
import { GoabText, GoabCheckbox } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSummary, SummarySection, SummaryItem } from "../form-summary";

/**
 * Review page — how different question types collapse onto the summary, per
 * review-page-spec.md. Demonstrates: a multi-select with a reveal (selected
 * options as a list, the reveal as its own follow-up row), a field set with
 * secondary fields (each its own row), and optional questions ("Not answered",
 * with the showUnanswered toggle). An empty secondary sub-field is simply not
 * passed in, so it never shows.
 */
export function ReviewQuestionTypes() {
  const [showUnanswered, setShowUnanswered] = useState(true);

  return (
    <PublicFormLayout back="/public-form">
      <GoabText tag="h1" mt="none" mb="m">
        Review your answers
      </GoabText>
      <GoabText mt="none" mb="xl" color="secondary">
        How different question types read on the summary. Use the toggle to show or hide unanswered
        optional questions.
      </GoabText>

      <GoabCheckbox
        name="show-unanswered"
        text="Show unanswered optional questions"
        checked={showUnanswered}
        onChange={(e) => setShowUnanswered(e.checked)}
        mb="xl"
      />

      {/* Multi-select with a reveal: the selected options are listed, and the
          revealed input becomes its own follow-up question below them. */}
      <FormSummary title="Documents">
        <SummarySection heading="Which documents did you use?" changeTo="/public-form/grouped-fields">
          <SummaryItem question="Documents used">
            <div>Tax return</div>
            <div>Paystub</div>
            <div>Other(s)</div>
          </SummaryItem>
          <SummaryItem question="What other documents?">A separation agreement</SummaryItem>
          <SummaryItem question="Document year">2020</SummaryItem>
        </SummarySection>
      </FormSummary>

      {/* Field set with secondary fields: phone and its extension are separate rows. */}
      <FormSummary title="Authorized representative">
        <SummarySection changeTo="/public-form/multiple-questions">
          <SummaryItem question="Name">Bruno Mars</SummaryItem>
          <SummaryItem question="Relationship to you">Parent</SummaryItem>
          <SummaryItem question="Primary phone">+1 555 199 9761</SummaryItem>
          <SummaryItem question="Primary phone extension">1234</SummaryItem>
          <SummaryItem question="Email">bruno@example.com</SummaryItem>
        </SummarySection>
      </FormSummary>

      {/* Optional questions: shown as "Not answered" so the user sees what they
          skipped; the toggle above hides them instead. */}
      <FormSummary title="Optional questions" showUnanswered={showUnanswered}>
        <SummarySection changeTo="/public-form/single-question">
          <SummaryItem question="Preferred name" optional>
            Jay
          </SummaryItem>
          <SummaryItem question="Middle name" optional></SummaryItem>
        </SummarySection>
      </FormSummary>
    </PublicFormLayout>
  );
}
