import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoabButton,
  GoabButtonGroup,
  GoabModal,
  GoabFormItem,
  GoabInput,
  GoabDropdown,
  GoabDropdownItem,
  GoabText,
} from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { FieldError } from "../error-summary";

type Address = { street: string; city: string; province: string; postal: string };

const EMPTY: Address = { street: "", city: "", province: "", postal: "" };

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

function validateStep1(a: Address): FieldError[] {
  const errors: FieldError[] = [];
  if (!a.street.trim()) errors.push({ fieldId: "street", text: "Enter the street address" });
  if (!a.city.trim()) errors.push({ fieldId: "city", text: "Enter the city or town" });
  return errors;
}

function validateStep2(a: Address): FieldError[] {
  const errors: FieldError[] = [];
  if (!a.province) errors.push({ fieldId: "province", text: "Select the province or territory" });
  if (!POSTAL_CODE.test(a.postal.trim()))
    errors.push({ fieldId: "postal", text: "Enter a valid postal code, such as T3R 8Y2" });
  return errors;
}

/**
 * Multi-step entry: the same overlay-add pattern as modal/drawer, but the item's
 * fields are split across steps (Step 1 -> Next -> Step 2) with a step indicator
 * and Next/Back. Each step validates before advancing; the final step saves. Two
 * steps, by design. Saved items show in a list with Edit / Remove.
 */
export function MultiStep() {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [draft, setDraft] = useState<Address>(EMPTY);
  const [modalErrors, setModalErrors] = useState<FieldError[]>([]);

  const openAdd = () => {
    setEditingIndex(null);
    setDraft(EMPTY);
    setStep(1);
    setModalErrors([]);
    setOpen(true);
  };

  const openEdit = (i: number) => {
    setEditingIndex(i);
    setDraft(addresses[i]);
    setStep(1);
    setModalErrors([]);
    setOpen(true);
  };

  const updateDraft = (patch: Partial<Address>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    if (modalErrors.length > 0) setModalErrors(step === 1 ? validateStep1(next) : validateStep2(next));
  };

  const goNext = () => {
    const found = validateStep1(draft);
    setModalErrors(found);
    if (found.length === 0) {
      setStep(2);
      setModalErrors([]);
    }
  };

  const goBack = () => {
    setStep(1);
    setModalErrors([]);
  };

  const save = () => {
    const found = validateStep2(draft);
    setModalErrors(found);
    if (found.length > 0) return;
    setAddresses((prev) =>
      editingIndex === null ? [...prev, draft] : prev.map((a, i) => (i === editingIndex ? draft : a)),
    );
    setOpen(false);
  };

  const removeAddress = (i: number) => setAddresses((prev) => prev.filter((_, idx) => idx !== i));

  const errorFor = (id: string) => modalErrors.find((e) => e.fieldId === id)?.text;
  const has = (id: string) => modalErrors.some((e) => e.fieldId === id);

  const pageErrors: FieldError[] =
    submitted && addresses.length === 0
      ? [{ fieldId: "addresses", text: "Add at least one previous address" }]
      : [];

  const handleContinue = () => {
    setSubmitted(true);
    if (addresses.length > 0) navigate("/public-form");
  };

  return (
    <PublicFormLayout back="/public-form">
      <FormSet
        heading="Previous addresses"
        description="Add any addresses you have lived at in the past 5 years."
        continueLabel="Save and continue"
        onContinue={handleContinue}
        errors={pageErrors}
      >
        <div id="addresses">
          {addresses.length > 0 && (
            <div style={{ marginBottom: "var(--goa-space-l)" }}>
              {addresses.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    gap: "var(--goa-space-m)",
                    padding: "var(--goa-space-m) 0",
                    borderTop: "1px solid var(--goa-color-greyscale-200)",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700 }}>{a.street}</div>
                    <div style={{ color: "var(--goa-color-text-secondary)" }}>
                      {a.city}, {a.province} {a.postal}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "var(--goa-space-m)", flexShrink: 0 }}>
                    <GoabButton type="tertiary" size="compact" onClick={() => openEdit(i)}>
                      Edit
                    </GoabButton>
                    <GoabButton type="tertiary" size="compact" onClick={() => removeAddress(i)}>
                      Remove
                    </GoabButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          <GoabButton type="tertiary" leadingIcon="add" onClick={openAdd}>
            {addresses.length === 0 ? "Add a previous address" : "Add another address"}
          </GoabButton>
        </div>
      </FormSet>

      <GoabModal
        heading={editingIndex === null ? "Add a previous address" : "Edit previous address"}
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            {step === 1 ? (
              <>
                <GoabButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
                  Cancel
                </GoabButton>
                <GoabButton type="primary" size="compact" onClick={goNext}>
                  Next
                </GoabButton>
              </>
            ) : (
              <>
                <GoabButton type="tertiary" size="compact" onClick={goBack}>
                  Back
                </GoabButton>
                <GoabButton type="primary" size="compact" onClick={save}>
                  {editingIndex === null ? "Add address" : "Save changes"}
                </GoabButton>
              </>
            )}
          </GoabButtonGroup>
        }
      >
        <GoabText size="body-s" color="secondary" mt="none" mb="m">
          Step {step} of 2
        </GoabText>

        {step === 1 ? (
          <>
            <GoabFormItem label="Street address" error={errorFor("street")}>
              <GoabInput
                name="street"
                width="100%"
                error={has("street")}
                value={draft.street}
                onChange={(e) => updateDraft({ street: e.value })}
              />
            </GoabFormItem>
            <GoabFormItem label="City or town" mt="l" error={errorFor("city")}>
              <GoabInput
                name="city"
                width="100%"
                error={has("city")}
                value={draft.city}
                onChange={(e) => updateDraft({ city: e.value })}
              />
            </GoabFormItem>
          </>
        ) : (
          <>
            <GoabFormItem label="Province or territory" error={errorFor("province")}>
              <GoabDropdown
                name="province"
                error={has("province")}
                value={draft.province}
                onChange={(e) => updateDraft({ province: e.value ?? "" })}
              >
                {PROVINCES.map(([value, label]) => (
                  <GoabDropdownItem key={value} value={value} label={label} />
                ))}
              </GoabDropdown>
            </GoabFormItem>
            <GoabFormItem label="Postal code" mt="l" error={errorFor("postal")}>
              <GoabInput
                name="postal"
                width="130px"
                error={has("postal")}
                value={draft.postal}
                onChange={(e) => updateDraft({ postal: e.value })}
              />
            </GoabFormItem>
          </>
        )}
      </GoabModal>
    </PublicFormLayout>
  );
}
