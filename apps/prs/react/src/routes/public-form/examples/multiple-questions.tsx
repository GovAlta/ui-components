import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoabFormItem, GoabInput } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { FieldError } from "../error-summary";

type Values = { fullName: string; phone: string };

const EMPTY: Values = { fullName: "", phone: "" };

// Required + phone-format checks, in field order so the summary reads top to
// bottom. Each fieldId matches a GoabFormItem id (links summary -> field + drives
// the inline error).
function validate(values: Values): FieldError[] {
  const errors: FieldError[] = [];
  if (!values.fullName.trim())
    errors.push({ fieldId: "fullName", text: "Enter your full name" });

  const digits = values.phone.replace(/\D/g, "");
  if (!values.phone.trim())
    errors.push({ fieldId: "phone", text: "Enter your phone number" });
  else if (!(digits.length === 10 || (digits.length === 11 && digits.startsWith("1"))))
    errors.push({ fieldId: "phone", text: "Enter a valid phone number, like 780 123 4567" });

  return errors;
}

/**
 * Multiple questions on a page.
 *
 * A few independent questions sharing one page, each with its own label and
 * hint (the goa-form-set "Multiple questions = True" shape: a section heading
 * plus normal-label fields). Distinct from grouped-fields, where the inputs are
 * parts of one thing. Validates on submit.
 */
export function MultipleQuestions() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof Values) => (value: string) =>
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (submitted) setErrors(validate(next));
      return next;
    });

  const errorFor = (fieldId: string) => errors.find((e) => e.fieldId === fieldId)?.text;

  const handleContinue = () => {
    setSubmitted(true);
    const found = validate(values);
    setErrors(found);
    if (found.length === 0) navigate("/public-form");
  };

  return (
    <PublicFormLayout back="/public-form">
      <FormSet heading="Your contact details" onContinue={handleContinue} errors={errors}>
        <GoabFormItem
          label="Full name"
          id="fullName"
          helpText="Include any middle names"
          error={errorFor("fullName")}
        >
          <GoabInput
            name="fullName"
            ariaLabel="Full name"
            width="100%"
            error={!!errorFor("fullName")}
            value={values.fullName}
            onChange={(e) => set("fullName")(e.value)}
          />
        </GoabFormItem>

        <GoabFormItem
          label="Phone number"
          id="phone"
          helpText="Include the area code"
          error={errorFor("phone")}
          mt="l"
        >
          <GoabInput
            name="phone"
            type="tel"
            ariaLabel="Phone number"
            width="320px"
            error={!!errorFor("phone")}
            value={values.phone}
            onChange={(e) => set("phone")(e.value)}
          />
        </GoabFormItem>
      </FormSet>
    </PublicFormLayout>
  );
}
