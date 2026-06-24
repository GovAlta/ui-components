import { useNavigate } from "react-router-dom";
import { GoabText, GoabButton, GoabButtonGroup } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { SummarySection, SummaryItem } from "../form-summary";

const ROOT = "/public-form/eligibility";
const yesNo = (v: string) => (v === "yes" ? "Yes" : v === "no" ? "No" : "Not answered");

/**
 * Section review ("check your answers") for the eligibility task. Composed from
 * the form-summary pieces: each answer is its own SummarySection (a single
 * SummaryItem) with its own Change target back to that question page, since the
 * two answers change in different places. Editable state, ending in Save and
 * continue. (Replaces the earlier hand-built placeholder Row.)
 */
export function EligibilityReview({ answers }: { answers: { age: string; residency: string } }) {
  const navigate = useNavigate();
  return (
    <PublicFormLayout back={`${ROOT}/residency`}>
      <GoabText tag="h1" mt="none" mb="xl">
        Check your answers
      </GoabText>

      <SummarySection changeTo={`${ROOT}/age`}>
        <SummaryItem question="Are you 18 or older?">{yesNo(answers.age)}</SummaryItem>
      </SummarySection>
      <SummarySection changeTo={`${ROOT}/residency`}>
        <SummaryItem question="Do you live in Alberta?">{yesNo(answers.residency)}</SummaryItem>
      </SummarySection>

      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary" onClick={() => navigate("/public-form")}>
          Save and continue
        </GoabButton>
      </GoabButtonGroup>
    </PublicFormLayout>
  );
}
