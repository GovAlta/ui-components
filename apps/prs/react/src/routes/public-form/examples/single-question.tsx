import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoabFormItem, GoabDatePicker } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { Schema, useFormValidation } from "../validation";

// Today as yyyy-MM-dd in local time. The picker emits dates in yyyy-MM-dd, which
// sort chronologically as strings, so a string compare is a timezone-safe
// "is this in the future" check with no Date parsing.
function todayISO(): string {
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
}

// The rules, declared. The picker emits "" for missing, partial, AND invalid
// dates alike, so they share one message; it ignores `max` in input mode, so the
// future check is done here.
const schema: Schema = {
  dateOfBirth: (v) => {
    const s = typeof v === "string" ? v.trim() : "";
    if (!s) return "Enter a valid date of birth";
    if (s > todayISO()) return "Date of birth must be in the past";
    return null;
  },
};

/**
 * Single question: date of birth.
 *
 * A lone question with nothing else on the page, so the field's label doubles as
 * the page heading via labelSize="large". Uses the DatePicker in type="input"
 * mode, the GoA pattern for known dates far in the past.
 *
 * Two component limitations surfaced here for Vanessa:
 *  1. The picker collapses missing / partial / invalid into one empty value, so a
 *     real date and a missing date can't carry different messages.
 *  2. The picker ignores `max` in input mode, so the future check is the consumer's.
 */
export function SingleQuestion() {
  const navigate = useNavigate();
  const [dateOfBirth, setDateOfBirth] = useState("");
  const { errors, submit, revalidate } = useFormValidation(schema);

  const handleChange = (value: string) => {
    setDateOfBirth(value);
    revalidate({ dateOfBirth: value });
  };

  const handleContinue = () => submit({ dateOfBirth }, () => navigate("/public-form"));

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
