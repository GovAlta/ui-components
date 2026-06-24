import { useNavigate } from "react-router-dom";
import { GoabText, GoabButton, GoabButtonGroup } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { SummarySection, SummaryItem } from "../form-summary";

const ROOT = "/public-form/eligibility";
const yesNo = (v?: string) => (v === "yes" ? "Yes" : v === "no" ? "No" : "Not answered");

/**
 * Section review ("check your answers") for the eligibility task. Each answer is
 * its own SummarySection; Change uses the action form (onChange) to enter the
 * change-from-review flow, where the question pre-fills and Save returns here
 * (re-walking any newly-opened questions first). The benefits-detail row only
 * shows when benefits is "yes".
 */
export function EligibilityReview({
  answers,
  onChange,
}: {
  answers: Record<string, string | undefined>;
  onChange: (step: string) => void;
}) {
  const navigate = useNavigate();
  return (
    <PublicFormLayout back={`${ROOT}/benefits`}>
      <GoabText tag="h1" mt="none" mb="xl">
        Check your answers
      </GoabText>

      <SummarySection onChange={() => onChange("age")}>
        <SummaryItem question="Are you 18 or older?">{yesNo(answers.age)}</SummaryItem>
      </SummarySection>
      <SummarySection onChange={() => onChange("residency")}>
        <SummaryItem question="Do you live in Alberta?">{yesNo(answers.residency)}</SummaryItem>
      </SummarySection>
      <SummarySection onChange={() => onChange("benefits")}>
        <SummaryItem question="Are you receiving other benefits?">
          {yesNo(answers.benefits)}
        </SummaryItem>
      </SummarySection>
      {answers.benefits === "yes" && (
        <SummarySection onChange={() => onChange("benefits-detail")}>
          <SummaryItem question="Which benefits are you receiving?">
            {answers["benefits-detail"] || "Not answered"}
          </SummaryItem>
        </SummarySection>
      )}

      <GoabButtonGroup alignment="start" mt="2xl">
        <GoabButton type="primary" onClick={() => navigate("/public-form")}>
          Save and continue
        </GoabButton>
      </GoabButtonGroup>
    </PublicFormLayout>
  );
}
