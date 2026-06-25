import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoabFormItem,
  GoabDropdown,
  GoabDropdownItem,
  GoabDetails,
} from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { Schema, required, useFormValidation } from "../validation";

const STATUSES: ReadonlyArray<[string, string]> = [
  ["single", "Single"],
  ["married", "Married"],
  ["common-law", "Common-law"],
  ["separated", "Separated"],
  ["divorced", "Divorced"],
  ["widowed", "Widowed"],
];

const schema: Schema = {
  maritalStatus: required("Select your marital status"),
};

/**
 * Question with Details.
 *
 * A lone question (large label) plus a GoabDetails "show more" expander for
 * optional help, placed after the input (canonical help-details placement).
 * Validates on submit.
 */
export function QuestionWithDetails() {
  const navigate = useNavigate();
  const [maritalStatus, setMaritalStatus] = useState("");
  const { errors, submit, revalidate } = useFormValidation(schema);

  const handleChange = (value: string) => {
    setMaritalStatus(value);
    revalidate({ maritalStatus: value });
  };

  const handleContinue = () => submit({ maritalStatus }, () => navigate("/public-form"));

  return (
    <PublicFormLayout back="/public-form">
      <FormSet onContinue={handleContinue} errors={errors}>
        <GoabFormItem
          label="What is your marital status?"
          labelSize="large"
          id="maritalStatus"
          error={errors.find((e) => e.fieldId === "maritalStatus")?.text}
        >
          <GoabDropdown
            name="maritalStatus"
            ariaLabel="Marital status"
            error={errors.some((e) => e.fieldId === "maritalStatus")}
            value={maritalStatus}
            onChange={(e) => handleChange(e.value ?? "")}
          >
            {STATUSES.map(([value, label]) => (
              <GoabDropdownItem key={value} value={value} label={label} />
            ))}
          </GoabDropdown>
        </GoabFormItem>

        <GoabDetails heading="How do I know my marital status?" mt="l">
          <p>
            Your marital status is your legal relationship status. Choose the option that best
            describes your current situation.
          </p>
          <ul>
            <li>
              <strong>Single:</strong> never been legally married
            </li>
            <li>
              <strong>Married:</strong> currently legally married
            </li>
            <li>
              <strong>Common-law:</strong> living with a partner in a marriage-like relationship for
              at least 12 months
            </li>
            <li>
              <strong>Separated:</strong> legally married but living apart
            </li>
            <li>
              <strong>Divorced:</strong> legally ended a marriage
            </li>
            <li>
              <strong>Widowed:</strong> your spouse or partner has died
            </li>
          </ul>
        </GoabDetails>
      </FormSet>
    </PublicFormLayout>
  );
}
