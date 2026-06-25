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
} from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { ErrorSummary, FieldError, useErrorSummaryFocus } from "../error-summary";
import { Schema, required, minSelected, runSchema, useFormValidation } from "../validation";

type Contact = { name: string; relationship: string; phone: string };

const EMPTY_CONTACT: Contact = { name: "", relationship: "", phone: "" };

const RELATIONSHIPS = ["Parent", "Spouse or partner", "Sibling", "Friend", "Other"];

// The item rules (validated inside the overlay) and the page rule (at least one item).
const contactSchema: Schema = {
  name: required("Enter a full name"),
  relationship: required("Select a relationship"),
  phone: (v) => {
    const s = typeof v === "string" ? v.trim() : "";
    if (!s) return "Enter a phone number";
    const digits = s.replace(/\D/g, "");
    return digits.length === 10 || (digits.length === 11 && digits.startsWith("1"))
      ? null
      : "Enter a valid phone number, like 780 123 4567";
  },
};
const pageSchema: Schema = { contacts: minSelected(1, "Add at least one emergency contact") };

/**
 * Modal / drawer: multiple fields for one item, added in an overlay. Saved items
 * show as a list with Edit / Remove. Validates the item inside the overlay
 * (runSchema over the item rules); the page requires at least one item on submit
 * (the validation hook).
 */
export function ModalDrawer() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const { errors: pageErrors, submit, revalidate } = useFormValidation(pageSchema);

  // Overlay state: which item (null = adding new), the working draft, its errors.
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [draft, setDraft] = useState<Contact>(EMPTY_CONTACT);
  const [modalErrors, setModalErrors] = useState<FieldError[]>([]);
  const modalSummaryRef = useErrorSummaryFocus(modalErrors);

  const openAdd = () => {
    setEditingIndex(null);
    setDraft(EMPTY_CONTACT);
    setModalErrors([]);
    setOpen(true);
  };

  const openEdit = (i: number) => {
    setEditingIndex(i);
    setDraft(contacts[i]);
    setModalErrors([]);
    setOpen(true);
  };

  const updateDraft = (patch: Partial<Contact>) => {
    const next = { ...draft, ...patch };
    setDraft(next);
    // Re-validate live only after a failed save in the overlay.
    if (modalErrors.length > 0) setModalErrors(runSchema(contactSchema, next));
  };

  const saveContact = () => {
    const found = runSchema(contactSchema, draft);
    setModalErrors(found);
    if (found.length > 0) return;
    const next =
      editingIndex === null
        ? [...contacts, draft]
        : contacts.map((c, i) => (i === editingIndex ? draft : c));
    setContacts(next);
    revalidate({ contacts: next });
    setOpen(false);
  };

  const removeContact = (i: number) => {
    const next = contacts.filter((_, idx) => idx !== i);
    setContacts(next);
    revalidate({ contacts: next });
  };

  const errorFor = (id: string) => modalErrors.find((e) => e.fieldId === id)?.text;
  const has = (id: string) => modalErrors.some((e) => e.fieldId === id);

  const handleContinue = () => submit({ contacts }, () => navigate("/public-form"));

  return (
    <PublicFormLayout back="/public-form">
      <FormSet
        heading="Emergency contacts"
        description="Add at least one person we can contact in an emergency."
        continueLabel="Save and continue"
        onContinue={handleContinue}
        errors={pageErrors}
      >
        <div id="contacts">
          {contacts.length > 0 && (
            <div style={{ marginBottom: "var(--goa-space-l)" }}>
              {contacts.map((c, i) => (
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
                    <div style={{ fontWeight: 700 }}>{c.name}</div>
                    <div style={{ color: "var(--goa-color-text-secondary)" }}>
                      {c.relationship} &middot; {c.phone}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "var(--goa-space-m)", flexShrink: 0 }}>
                    <GoabButton type="tertiary" size="compact" onClick={() => openEdit(i)}>
                      Edit
                    </GoabButton>
                    <GoabButton type="tertiary" size="compact" onClick={() => removeContact(i)}>
                      Remove
                    </GoabButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          <GoabButton type="tertiary" leadingIcon="add" onClick={openAdd}>
            {contacts.length === 0 ? "Add an emergency contact" : "Add another contact"}
          </GoabButton>
        </div>
      </FormSet>

      <GoabModal
        heading={editingIndex === null ? "Add an emergency contact" : "Edit emergency contact"}
        open={open}
        onClose={() => setOpen(false)}
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="tertiary" size="compact" onClick={() => setOpen(false)}>
              Cancel
            </GoabButton>
            <GoabButton type="primary" size="compact" onClick={saveContact}>
              {editingIndex === null ? "Add contact" : "Save changes"}
            </GoabButton>
          </GoabButtonGroup>
        }
      >
        <ErrorSummary ref={modalSummaryRef} errors={modalErrors} />

        <GoabFormItem label="Full name" id="name" error={errorFor("name")}>
          <GoabInput
            name="name"
            width="100%"
            error={has("name")}
            value={draft.name}
            onChange={(e) => updateDraft({ name: e.value })}
          />
        </GoabFormItem>

        <GoabFormItem label="Relationship to you" id="relationship" mt="l" error={errorFor("relationship")}>
          <GoabDropdown
            name="relationship"
            error={has("relationship")}
            value={draft.relationship}
            onChange={(e) => updateDraft({ relationship: e.value ?? "" })}
          >
            {RELATIONSHIPS.map((r) => (
              <GoabDropdownItem key={r} value={r} label={r} />
            ))}
          </GoabDropdown>
        </GoabFormItem>

        <GoabFormItem label="Phone number" id="phone" mt="l" helpText="Include the area code" error={errorFor("phone")}>
          <GoabInput
            name="phone"
            type="tel"
            width="100%"
            error={has("phone")}
            value={draft.phone}
            onChange={(e) => updateDraft({ phone: e.value })}
          />
        </GoabFormItem>
      </GoabModal>
    </PublicFormLayout>
  );
}
