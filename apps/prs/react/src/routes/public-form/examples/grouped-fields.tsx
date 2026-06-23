import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoabFormItem,
  GoabInput,
  GoabDropdown,
  GoabDropdownItem,
} from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { FieldError } from "../error-summary";

const PROVINCES: ReadonlyArray<[string, string]> = [
  ["AB", "Alberta"],
  ["BC", "British Columbia"],
  ["MB", "Manitoba"],
  ["NB", "New Brunswick"],
  ["NL", "Newfoundland and Labrador"],
  ["NS", "Nova Scotia"],
  ["NT", "Northwest Territories"],
  ["NU", "Nunavut"],
  ["ON", "Ontario"],
  ["PE", "Prince Edward Island"],
  ["QC", "Quebec"],
  ["SK", "Saskatchewan"],
  ["YT", "Yukon"],
];

const POSTAL_CODE = /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/;

type Values = {
  street: string;
  suite: string;
  city: string;
  province: string;
  postal: string;
};

const EMPTY: Values = { street: "", suite: "", city: "", province: "", postal: "" };

// Required-field + postal-format checks, in field order so the summary reads
// top to bottom. Each error's fieldId matches a GoabFormItem id, which links
// the summary entry to the field and drives the inline error.
function validate(values: Values): FieldError[] {
  const errors: FieldError[] = [];
  if (!values.street.trim())
    errors.push({ fieldId: "street", text: "Enter your street address" });
  if (!values.city.trim())
    errors.push({ fieldId: "city", text: "Enter your city or town" });
  if (!values.province)
    errors.push({ fieldId: "province", text: "Select your province or territory" });
  if (!POSTAL_CODE.test(values.postal.trim()))
    errors.push({ fieldId: "postal", text: "Enter a valid postal code, such as T3R 8Y2" });
  return errors;
}

/**
 * Grouped fields, one topic: a home address.
 *
 * Several inputs that make up one thing, grouped under one heading (the
 * goa-form-set "Multiple questions = True" shape: a section heading plus fields
 * with normal labels). Also the validation showcase: validates on Continue,
 * surfaces the error summary plus per-field inline errors, and live-clears each
 * error as it's fixed. Matches the "What is your address?" error-state screen
 * in Figma.
 */
export function GroupedFields() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const set = (key: keyof Values) => (value: string) =>
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      // After the first submit, re-validate live so fixed fields clear as you go.
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
      <FormSet
        heading="What is your address?"
        continueLabel="Save and continue"
        onContinue={handleContinue}
        errors={errors}
      >
        <GoabFormItem label="Street address" id="street" error={errorFor("street")}>
          <GoabInput
            name="street"
            ariaLabel="Street address"
            width="100%"
            error={!!errorFor("street")}
            value={values.street}
            onChange={(e) => set("street")(e.value)}
          />
        </GoabFormItem>

        <GoabFormItem label="Suite or unit number" id="suite" requirement="optional" mt="l">
          <GoabInput
            name="suite"
            ariaLabel="Suite or unit number"
            width="100%"
            value={values.suite}
            onChange={(e) => set("suite")(e.value)}
          />
        </GoabFormItem>

        <GoabFormItem label="City or town" id="city" error={errorFor("city")} mt="l">
          <GoabInput
            name="city"
            ariaLabel="City or town"
            width="100%"
            error={!!errorFor("city")}
            value={values.city}
            onChange={(e) => set("city")(e.value)}
          />
        </GoabFormItem>

        <div
          style={{
            display: "flex",
            gap: "var(--goa-space-l)",
            flexWrap: "wrap",
            marginTop: "var(--goa-space-l)",
          }}
        >
          <div style={{ width: "fit-content" }}>
            <GoabFormItem
              label="Province or territory"
              id="province"
              error={errorFor("province")}
              mt="none"
            >
              <GoabDropdown
                name="province"
                ariaLabel="Province or territory"
                error={!!errorFor("province")}
                value={values.province}
                onChange={(e) => set("province")(e.value ?? "")}
              >
                {PROVINCES.map(([value, label]) => (
                  <GoabDropdownItem key={value} value={value} label={label} />
                ))}
              </GoabDropdown>
            </GoabFormItem>
          </div>

          <div style={{ width: "130px" }}>
            <GoabFormItem label="Postal code" id="postal" error={errorFor("postal")} mt="none">
              <GoabInput
                name="postal"
                ariaLabel="Postal code"
                width="100%"
                error={!!errorFor("postal")}
                value={values.postal}
                onChange={(e) => set("postal")(e.value)}
              />
            </GoabFormItem>
          </div>
        </div>
      </FormSet>
    </PublicFormLayout>
  );
}
