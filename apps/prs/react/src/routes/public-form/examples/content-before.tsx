import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoabFormItem, GoabCheckbox, GoabInput } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { FieldError } from "../error-summary";

type Values = {
  agreeCheck: boolean;
  agreeTrue: boolean;
  legalName: string;
  signature: string;
};

const EMPTY: Values = { agreeCheck: false, agreeTrue: false, legalName: "", signature: "" };

const FOIP =
  "The personal information collected through this service is used to process your " +
  "application. This collection is authorized under section 33(c) of the Freedom of " +
  "Information and Protection of Privacy Act.";

function validate(v: Values): FieldError[] {
  const errors: FieldError[] = [];
  if (!(v.agreeCheck && v.agreeTrue))
    errors.push({ fieldId: "agreements", text: "Select both statements to agree before continuing" });
  if (!v.legalName.trim())
    errors.push({ fieldId: "legalName", text: "Enter your full legal name" });
  if (!v.signature.trim())
    errors.push({ fieldId: "signature", text: "Type your full name to sign" });
  return errors;
}

/**
 * Content before the question.
 *
 * Explanatory / legal text before the inputs (the spec's consent example: a FOIP
 * statement, then agreement checkboxes, legal name, and signature). The FOIP
 * statement uses the FormSet `description` slot (content below the heading,
 * before the fields). Validates on submit.
 */
export function ContentBefore() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<Values>) =>
    setValues((prev) => {
      const next = { ...prev, ...patch };
      if (submitted) setErrors(validate(next));
      return next;
    });

  const errorFor = (id: string) => errors.find((e) => e.fieldId === id)?.text;
  const has = (id: string) => errors.some((e) => e.fieldId === id);

  const handleContinue = () => {
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (found.length === 0) navigate("/public-form");
  };

  return (
    <PublicFormLayout back="/public-form">
      <FormSet
        heading="Confirm and sign"
        description={FOIP}
        continueLabel="Save and continue"
        onContinue={handleContinue}
        errors={errors}
      >
        <GoabFormItem
          label="Read and agree to the following statements"
          id="agreements"
          error={errorFor("agreements")}
        >
          <GoabCheckbox
            name="agreeCheck"
            text="I consent to a background check being completed on me"
            checked={values.agreeCheck}
            error={has("agreements")}
            onChange={(e) => update({ agreeCheck: e.checked })}
          />
          <GoabCheckbox
            name="agreeTrue"
            text="I confirm the information I have provided is true and accurate"
            checked={values.agreeTrue}
            error={has("agreements")}
            mt="xs"
            onChange={(e) => update({ agreeTrue: e.checked })}
          />
        </GoabFormItem>

        <GoabFormItem
          label="Full legal name"
          helpText="As it appears on your ID"
          id="legalName"
          error={errorFor("legalName")}
          mt="l"
        >
          <GoabInput
            name="legalName"
            ariaLabel="Full legal name"
            width="100%"
            error={has("legalName")}
            value={values.legalName}
            onChange={(e) => update({ legalName: e.value })}
          />
        </GoabFormItem>

        <GoabFormItem
          label="Signature"
          helpText="Type your full name as your electronic signature"
          id="signature"
          error={errorFor("signature")}
          mt="l"
        >
          <GoabInput
            name="signature"
            ariaLabel="Signature"
            width="100%"
            error={has("signature")}
            value={values.signature}
            onChange={(e) => update({ signature: e.value })}
          />
        </GoabFormItem>
      </FormSet>
    </PublicFormLayout>
  );
}
