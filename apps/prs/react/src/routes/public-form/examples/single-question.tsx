import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoabFormItem, GoabDatePicker } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { FieldError } from "../error-summary";

// Today as yyyy-MM-dd in local time. The picker emits dates in yyyy-MM-dd, which
// sort chronologically as strings, so a string compare is a timezone-safe
// "is this in the future" check with no Date parsing.
function todayISO(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
}

function validate(value: string): FieldError[] {
  const v = value.trim();
  // The picker emits "" for missing, partial, AND invalid dates (day 0, day 50,
  // Feb 30) alike, so they all share one message: it can't tell us which.
  if (!v) return [{ fieldId: "dateOfBirth", text: "Enter a valid date of birth" }];
  // The picker ignores `max` in input mode, so future dates come through and we
  // catch them here.
  if (v > todayISO())
    return [{ fieldId: "dateOfBirth", text: "Date of birth must be in the past" }];
  return [];
}

/**
 * Single question: date of birth.
 *
 * A lone question with nothing else on the page, so the field's label doubles as
 * the page heading via labelSize="large" (the goa-form-set "Multiple questions =
 * False" shape). Uses the DatePicker in type="input" mode (month dropdown +
 * day/year text), the GoA pattern for known dates far in the past.
 *
 * Validates three cases: missing, not a real date, and in the future. Two
 * component limitations surfaced here for Vanessa:
 *  1. The picker collapses missing / partial / invalid into one empty value, so
 *     a real date and a missing date can't carry different messages, and we
 *     can't point at the specific wrong box (no GOV.UK-style granular errors).
 *  2. The picker ignores `max` in input mode, so the future check is done by the
 *     consumer, not the component.
 */
export function SingleQuestion() {
  const navigate = useNavigate();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (value: string) => {
    setDateOfBirth(value);
    // After the first submit, re-validate live so the error clears once a
    // complete, valid, in-range date is entered.
    if (submitted) setErrors(validate(value));
  };

  const handleContinue = () => {
    setSubmitted(true);
    const found = validate(dateOfBirth);
    setErrors(found);
    if (found.length === 0) navigate("/public-form");
  };

  return (
    <PublicFormLayout back="/public-form">
      <FormSet onContinue={handleContinue} errors={errors}>
        <GoabFormItem
          label="What is your date of birth?"
          labelSize="large"
          helpText="For example, March 27 2007"
          id="dateOfBirth"
          error={errors.find((e) => e.fieldId === "dateOfBirth")?.text}
        >
          <GoabDatePicker
            name="dateOfBirth"
            type="input"
            max={new Date()}
            error={errors.some((e) => e.fieldId === "dateOfBirth")}
            value={dateOfBirth}
            onChange={(detail) => handleChange(detail.valueStr)}
          />
        </GoabFormItem>
      </FormSet>
    </PublicFormLayout>
  );
}
