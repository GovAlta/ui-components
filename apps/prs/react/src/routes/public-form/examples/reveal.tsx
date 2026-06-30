import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoabFormItem,
  GoabRadioGroup,
  GoabRadioItem,
  GoabInput,
} from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { Schema, required, when, useFormValidation } from "../validation";

const METHODS: ReadonlyArray<{ value: string; label: string; field: string; type: "email" | "tel" }> = [
  { value: "email", label: "Email", field: "Email address", type: "email" },
  { value: "phone", label: "Phone", field: "Phone number", type: "tel" },
  { value: "text", label: "Text message", field: "Mobile phone number", type: "tel" },
];

// Conditional rules: a method is required, and each revealed field is required only
// while its method is selected (the `when` rule). The field id is method-specific,
// so the summary links to whichever field is actually shown.
const schema: Schema = {
  contactMethod: required("Select how you would like to be contacted"),
  "contactDetail-email": when((a) => a.contactMethod === "email", required("Enter your email address")),
  "contactDetail-phone": when((a) => a.contactMethod === "phone", required("Enter your phone number")),
  "contactDetail-text": when((a) => a.contactMethod === "text", required("Enter your mobile phone number")),
};

// The selected method's detail goes under its field id so the schema validates it.
const valuesFor = (method: string, detail: string) => ({
  contactMethod: method,
  [`contactDetail-${method}`]: detail,
});

/**
 * Reveal: selecting an option reveals a follow-up input.
 *
 * Uses GoA's built-in `reveal` prop on GoabRadioItem (the canonical
 * reveal-input-based-on-a-selection example), which renders the connector line
 * natively. Validates on submit, including the revealed field while it's shown.
 */
export function Reveal() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("");
  const [detail, setDetail] = useState("");
  const { errors, submit, revalidate } = useFormValidation(schema);

  const handleMethod = (value: string) => {
    setMethod(value);
    setDetail("");
    revalidate(valuesFor(value, ""));
  };

  const handleDetail = (value: string) => {
    setDetail(value);
    revalidate(valuesFor(method, value));
  };

  const handleContinue = () => submit(valuesFor(method, detail), () => navigate("/public-form"));

  return (
    <PublicFormLayout back="/public-form">
      <FormSet onContinue={handleContinue} errors={errors}>
        <GoabFormItem
          label="How would you like to be contacted?"
          labelSize="large"
          id="contactMethod"
          error={errors.find((e) => e.fieldId === "contactMethod")?.text}
        >
          <GoabRadioGroup name="contactMethod" value={method} onChange={(e) => handleMethod(e.value)}>
            {METHODS.map((m) => (
              <GoabRadioItem
                key={m.value}
                value={m.value}
                label={m.label}
                reveal={
                  <GoabFormItem
                    label={m.field}
                    id={`contactDetail-${m.value}`}
                    error={errors.find((e) => e.fieldId === `contactDetail-${m.value}`)?.text}
                  >
                    <GoabInput
                      name={m.value}
                      type={m.type}
                      ariaLabel={m.field}
                      width="320px"
                      error={errors.some((e) => e.fieldId === `contactDetail-${m.value}`)}
                      value={detail}
                      onChange={(e) => handleDetail(e.value)}
                    />
                  </GoabFormItem>
                }
              />
            ))}
          </GoabRadioGroup>
        </GoabFormItem>
      </FormSet>
    </PublicFormLayout>
  );
}
