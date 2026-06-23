import { Link } from "react-router-dom";
import { GoabText } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";

const ROOT = "/public-form/eligibility";

/**
 * Ineligible outcome: the dead-end branch of the eligibility task. Not a form
 * set (no Continue), a result page reached when a gating question fails.
 */
export function Ineligible() {
  return (
    <PublicFormLayout back={`${ROOT}/age`}>
      <GoabText tag="h1" mt="none" mb="m">
        You are not eligible to apply
      </GoabText>
      <GoabText mt="none" mb="l">
        Based on your answers, you do not meet the eligibility criteria for this service.
      </GoabText>
      <GoabText mt="none" mb="xl">
        If you think this is a mistake, go back and check your answers.
      </GoabText>
      <Link to={`${ROOT}/age`}>Go back and change your answers</Link>
    </PublicFormLayout>
  );
}
