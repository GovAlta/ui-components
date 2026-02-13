import { GoabText } from "@abgov/react-components";
import { GoabxFormItem, GoabxCheckbox, GoabxInput, GoabxTextArea } from "@abgov/react-components/experimental";

/**
 * Page 5: Consent
 *
 * Rich content page with checkboxes for consent + full name input + signature textarea.
 * Heading comes from outline.props automatically.
 */
export function Consent() {
  return (
    <div className="form-fields">
      {/* TODO: Spacing not ideal - heading has 32px mb, want 8px. Negative margin doesn't work. See brief bug. */}
      <GoabText size="body-m" mt="none" mb="m">
        The personal information collected through this service is for searching for
        your record. This collection is authorized by section 33C of the Freedom of
        Information and Protection of Privacy Act.
      </GoabText>

      <GoabxFormItem label="Read and agree to the following statements">
        <>
          <GoabxCheckbox
            name="consentCheck"
            text="I consent to having a background check completed on me"
            data-pf-item=""
          />
          <GoabxCheckbox
            name="consentTruth"
            text="I confirm that the information I have provided is true and accurate"
            data-pf-item=""
          />
        </>
      </GoabxFormItem>

      <GoabxFormItem label="Full legal name" helpText="As it appears on your ID">
        <GoabxInput name="fullName" data-pf-item="" />
      </GoabxFormItem>

      <GoabxFormItem label="Signature" helpText="Type your full name as your electronic signature">
        <GoabxTextArea name="signature" data-pf-item="" rows={2} />
      </GoabxFormItem>
    </div>
  );
}
