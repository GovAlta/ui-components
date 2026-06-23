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
import { FieldError } from "../error-summary";

const METHODS: ReadonlyArray<{ value: string; label: string; field: string; type: "email" | "tel" }> = [
  { value: "email", label: "Email", field: "Email address", type: "email" },
  { value: "phone", label: "Phone", field: "Phone number", type: "tel" },
  { value: "text", label: "Text message", field: "Mobile phone number", type: "tel" },
];

// Conditional validation: must pick a method, and the revealed field is required
// only while it's shown. The fieldId is method-specific so the summary links to
// whichever field is actually revealed.
function validate(method: string, detail: string): FieldError[] {
  if (!method)
    return [{ fieldId: "contactMethod", text: "Select how you would like to be contacted" }];
  if (!detail.trim()) {
    const m = METHODS.find((x) => x.value === method);
    return [
      {
        fieldId: `contactDetail-${method}`,
        text: `Enter your ${m ? m.field.toLowerCase() : "contact details"}`,
      },
    ];
  }
  return [];
}

/**
 * Reveal: selecting an option reveals a follow-up input.
 *
 * Uses GoA's built-in `reveal` prop on GoabRadioItem (the canonical
 * reveal-input-based-on-a-selection example), which renders the connector line
 * natively. No custom CSS, unlike the old demo, which hand-built the reveal
 * because the public-form runtime broke the slot. Validates on submit, including
 * the revealed field while it's shown.
 */
export function Reveal() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("");
  const [detail, setDetail] = useState("");
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const revalidate = (m: string, d: string) => {
    if (submitted) setErrors(validate(m, d));
  };

  const handleMethod = (value: string) => {
    setMethod(value);
    setDetail("");
    revalidate(value, "");
  };

  const handleDetail = (value: string) => {
    setDetail(value);
    revalidate(method, value);
  };

  const handleContinue = () => {
    setSubmitted(true);
    const found = validate(method, detail);
    setErrors(found);
    if (found.length === 0) navigate("/public-form");
  };

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
