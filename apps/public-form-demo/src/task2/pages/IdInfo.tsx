import { GoabText } from "@abgov/react-components";

/**
 * Info-only page - no form inputs, just explanatory content.
 * User clicks Continue to proceed.
 */
export function IdInfo() {
  return (
    <div className="form-fields">
      <GoabText size="body-m" mt="none">
        To verify your age, you will need to provide your date of birth. This
        helps us determine your eligibility for age-restricted services.
      </GoabText>
    </div>
  );
}
