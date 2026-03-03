import { GoabxFormItem, GoabxInput } from "@abgov/react-components/experimental";

/**
 * Page 1: About You
 *
 * Captures basic identity info (name + phone) needed for workspace case header.
 * This comes right after eligibility check so we know who the applicant is early.
 */
export function AboutYou() {
  return (
    <div className="form-fields">
      <GoabxFormItem label="Full name" helpText="As it appears on your ID">
        <GoabxInput name="fullName" data-pf-item="" />
      </GoabxFormItem>

      <GoabxFormItem label="Phone number" helpText="Include area code">
        <GoabxInput name="phoneNumber" type="tel" data-pf-item="" />
      </GoabxFormItem>
    </div>
  );
}
