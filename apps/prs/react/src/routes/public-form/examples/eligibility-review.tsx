import { Link, useNavigate } from "react-router-dom";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";

const ROOT = "/public-form/eligibility";
const yesNo = (v: string) => (v === "yes" ? "Yes" : v === "no" ? "No" : "Not answered");

// Minimal answer row. A real form summary (label / value / Change, grouped) is a
// Step-2 component the DS doesn't ship yet, hand-built here as a placeholder.
function Row({ label, value, changeTo }: { label: string; value: string; changeTo: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        gap: "var(--goa-space-m)",
        padding: "var(--goa-space-s) 0",
        borderTop: "1px solid var(--goa-color-greyscale-200)",
      }}
    >
      <span style={{ flex: "0 0 40%", color: "var(--goa-color-text-secondary)" }}>{label}</span>
      <span style={{ flex: 1 }}>{yesNo(value)}</span>
      <Link to={changeTo}>Change</Link>
    </div>
  );
}

/**
 * Section review ("check your answers") for the eligibility task. Lets the user
 * confirm or change each answer, then completes the section and returns to the
 * task list.
 */
export function EligibilityReview({ answers }: { answers: { age: string; residency: string } }) {
  const navigate = useNavigate();
  return (
    <PublicFormLayout back={`${ROOT}/residency`}>
      <FormSet
        heading="Check your answers"
        continueLabel="Save and continue"
        onContinue={() => navigate("/public-form")}
      >
        <div>
          <Row label="18 or older?" value={answers.age} changeTo={`${ROOT}/age`} />
          <Row label="Live in Alberta?" value={answers.residency} changeTo={`${ROOT}/residency`} />
        </div>
      </FormSet>
    </PublicFormLayout>
  );
}
