import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoabFormItem, GoabCheckboxList, GoabCheckbox, GoabInput } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { Schema, required, minSelected, useFormValidation } from "../validation";

type Values = {
  agreements: string[];
  legalName: string;
  signature: string;
};

const EMPTY: Values = { agreements: [], legalName: "", signature: "" };

const FOIP =
  "The personal information collected through this service is used to process your " +
  "application. This collection is authorized under section 33(c) of the Freedom of " +
  "Information and Protection of Privacy Act.";

const schema: Schema = {
  agreements: minSelected(2, "Select both statements to agree before continuing"),
  legalName: required("Enter your full legal name"),
  signature: required("Type your full name to sign"),
};

/**
 * Content before the question.
 *
 * Explanatory / legal text before the inputs (the spec's consent example: a FOIP
 * statement, then agreement checkboxes, legal name, and signature). The FOIP
 * statement uses the FormSet `description` slot. The two consent statements are a
 * GoabCheckboxList (a grouped multi-select), not standalone checkboxes. Validates
 * on submit.
 */
export function ContentBefore() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>(EMPTY);
  const { errors, submit, revalidate } = useFormValidation(schema);

  const update = (patch: Partial<Values>) =>
    setValues((prev) => {
      const next = { ...prev, ...patch };
      revalidate(next);
      return next;
    });

  const errorFor = (id: string) => errors.find((e) => e.fieldId === id)?.text;
  const has = (id: string) => errors.some((e) => e.fieldId === id);

  const handleContinue = () => submit(values, () => navigate("/public-form"));

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
          <GoabCheckboxList
            name="agreements"
            value={values.agreements}
            error={has("agreements")}
            onChange={(e) => update({ agreements: e.value })}
          >
            <GoabCheckbox
              name="background-check"
              value="background-check"
              text="I consent to a background check being completed on me"
            />
            <GoabCheckbox
              name="accurate"
              value="accurate"
              text="I confirm the information I have provided is true and accurate"
            />
          </GoabCheckboxList>
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
