import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoabFormItem, GoabInput, GoabButton } from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { Schema, useFormValidation } from "../validation";

// A collection rule: at least one non-blank row. Keyed to the first row so the
// summary links there; the rule reads the whole list from `all`. (A blank trailing
// row is fine, ignored on save.)
const schema: Schema = {
  "dependant-0": (_v, all) => {
    const rows = (all.dependants as string[]) ?? [];
    return rows.some((r) => typeof r === "string" && r.trim()) ? null : "Enter at least one dependant";
  },
};

/**
 * Inline list: a single field repeated in identical rows ("+ Add another"), the
 * V1 "add another dependant" pattern. Remove appears once there are 2+ rows.
 * Unlimited rows; a blank trailing row is ignored on save. Validates on submit
 * (at least one entry).
 */
export function InlineList() {
  const navigate = useNavigate();
  const [rows, setRows] = useState<string[]>([""]);
  const { errors, submit, revalidate } = useFormValidation(schema);

  const updateRow = (i: number, value: string) => {
    const next = rows.map((r, idx) => (idx === i ? value : r));
    setRows(next);
    revalidate({ dependants: next });
  };

  const addRow = () => setRows([...rows, ""]);

  const removeRow = (i: number) => {
    const next = rows.filter((_, idx) => idx !== i);
    setRows(next);
    revalidate({ dependants: next });
  };

  const handleContinue = () =>
    submit({ dependants: rows }, () => {
      // On save, blank rows are dropped (filter before submitting to a backend).
      navigate("/public-form");
    });

  const firstError = errors.find((e) => e.fieldId === "dependant-0")?.text;

  return (
    <PublicFormLayout back="/public-form">
      <FormSet
        heading="Your dependants"
        description="Add the full name of each dependant under 18 in your care."
        continueLabel="Save and continue"
        onContinue={handleContinue}
        errors={errors}
      >
        {rows.map((value, i) => (
          <GoabFormItem
            key={i}
            label={`Dependant ${i + 1}`}
            id={`dependant-${i}`}
            error={i === 0 ? firstError : undefined}
            mt={i > 0 ? "m" : undefined}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "var(--goa-space-m)" }}>
              <div style={{ flex: 1 }}>
                <GoabInput
                  name={`dependant-${i}`}
                  ariaLabel={`Dependant ${i + 1} full name`}
                  width="100%"
                  error={i === 0 && !!firstError}
                  value={value}
                  onChange={(e) => updateRow(i, e.value)}
                />
              </div>
              {rows.length > 1 && (
                <GoabButton type="tertiary" onClick={() => removeRow(i)}>
                  Remove
                </GoabButton>
              )}
            </div>
          </GoabFormItem>
        ))}

        <GoabButton type="tertiary" leadingIcon="add" mt="m" onClick={addRow}>
          Add another dependant
        </GoabButton>
      </FormSet>
    </PublicFormLayout>
  );
}
