import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import {
  GoabFormItem,
  GoabInput,
  GoabRadioGroup,
  GoabRadioItem,
  GoabButton,
} from "@abgov/react-components";
import { PublicFormLayout } from "../public-form-layout";
import { FormSet } from "../form-set";
import { FieldError } from "../error-summary";

const ROOT = "/public-form/new-page";

type Child = { name: string; isAdult: string; inEducation: string };
const EMPTY_CHILD: Child = { name: "", isAdult: "", inEducation: "" };

const yesNo = (v: string) => (v === "yes" ? "Yes" : v === "no" ? "No" : "Not answered");

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "var(--goa-space-m)",
        padding: "var(--goa-space-s) 0",
        borderTop: "1px solid var(--goa-color-greyscale-200)",
      }}
    >
      <span style={{ color: "var(--goa-color-text-secondary)" }}>{label}</span>
      <span style={{ flex: 1 }}>{value}</span>
    </div>
  );
}

/** A lone Yes/No sub-flow page that branches on Continue (the spec's core primitive). */
function YesNoStep({
  heading,
  back,
  value,
  onChange,
  next,
  requiredError,
}: {
  heading: string;
  back: string;
  value: string;
  onChange: (v: string) => void;
  next: (v: string) => string;
  requiredError: string;
}) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const validate = (v: string): FieldError[] => (v ? [] : [{ fieldId: "answer", text: requiredError }]);
  const handleChange = (v: string) => {
    onChange(v);
    if (submitted) setErrors(validate(v));
  };
  const handleContinue = () => {
    setSubmitted(true);
    const found = validate(value);
    setErrors(found);
    if (found.length === 0) navigate(next(value));
  };

  return (
    <PublicFormLayout back={back}>
      <FormSet onContinue={handleContinue} errors={errors}>
        <GoabFormItem
          label={heading}
          labelSize="large"
          id="answer"
          error={errors.find((e) => e.fieldId === "answer")?.text}
        >
          <GoabRadioGroup
            name="answer"
            ariaLabel={heading}
            value={value}
            onChange={(e) => handleChange(e.value)}
          >
            <GoabRadioItem value="yes" label="Yes" />
            <GoabRadioItem value="no" label="No" />
          </GoabRadioGroup>
        </GoabFormItem>
      </FormSet>
    </PublicFormLayout>
  );
}

/** Sub-flow page 1: the child's name. */
function NameStep({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const validate = (v: string): FieldError[] =>
    v.trim() ? [] : [{ fieldId: "name", text: "Enter the child's full name" }];
  const handleChange = (v: string) => {
    onChange(v);
    if (submitted) setErrors(validate(v));
  };
  const handleContinue = () => {
    setSubmitted(true);
    const found = validate(value);
    setErrors(found);
    if (found.length === 0) navigate(`${ROOT}/add/age`);
  };

  return (
    <PublicFormLayout back={ROOT}>
      <FormSet onContinue={handleContinue} errors={errors}>
        <GoabFormItem
          label="What is the child's full name?"
          labelSize="large"
          id="name"
          error={errors.find((e) => e.fieldId === "name")?.text}
        >
          <GoabInput
            name="name"
            width="100%"
            error={errors.some((e) => e.fieldId === "name")}
            value={value}
            onChange={(e) => handleChange(e.value)}
          />
        </GoabFormItem>
      </FormSet>
    </PublicFormLayout>
  );
}

/** Final sub-flow page: confirm and add the child to the list. */
function ConfirmStep({ draft, editing, onAdd }: { draft: Child; editing: boolean; onAdd: () => void }) {
  const back = draft.isAdult === "yes" ? `${ROOT}/add/education` : `${ROOT}/add/age`;
  return (
    <PublicFormLayout back={back}>
      <FormSet
        heading={`Check ${draft.name || "the child"}'s details`}
        continueLabel={editing ? "Save changes" : "Continue"}
        onContinue={onAdd}
      >
        <div>
          <SummaryRow label="Name" value={draft.name} />
          <SummaryRow label="18 or older" value={yesNo(draft.isAdult)} />
          {draft.isAdult === "yes" && (
            <SummaryRow label="In full-time education" value={yesNo(draft.inEducation)} />
          )}
        </div>
      </FormSet>
    </PublicFormLayout>
  );
}

/** The main page: the collected list of children + Add + Save and continue. */
function ChildrenList({
  items,
  onAdd,
  onEdit,
  onRemove,
  errors,
  onContinue,
}: {
  items: Child[];
  onAdd: () => void;
  onEdit: (i: number) => void;
  onRemove: (i: number) => void;
  errors: FieldError[];
  onContinue: () => void;
}) {
  return (
    <PublicFormLayout back="/public-form">
      <FormSet
        heading="Your children"
        description="Add each child who lives with you."
        continueLabel="Save and continue"
        onContinue={onContinue}
        errors={errors}
      >
        <div id="children">
          {items.length > 0 && (
            <div style={{ marginBottom: "var(--goa-space-l)" }}>
              {items.map((c, i) => (
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
                      18 or older: {yesNo(c.isAdult)}
                      {c.isAdult === "yes" ? ` · In education: ${yesNo(c.inEducation)}` : ""}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "var(--goa-space-m)", flexShrink: 0 }}>
                    <GoabButton type="tertiary" size="compact" onClick={() => onEdit(i)}>
                      Change
                    </GoabButton>
                    <GoabButton type="tertiary" size="compact" onClick={() => onRemove(i)}>
                      Remove
                    </GoabButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          <GoabButton type="tertiary" leadingIcon="add" onClick={onAdd}>
            {items.length === 0 ? "Add a child" : "Add another child"}
          </GoabButton>
        </div>
      </FormSet>
    </PublicFormLayout>
  );
}

/**
 * New page per item, with branches: the public form pattern itself, looped.
 *
 * "Add a child" walks a sub-flow of full pages (name -> 18-or-older -> [in
 * education, if 18+] -> confirm), branching on the age answer, then collects the
 * child into a list. Each page is a real route, so the browser back button and
 * state carry across the sub-flow (the team's feasibility stress-test). The added
 * children show as a list with Change / Remove, the loop reduced to a title.
 */
export function NewPageTask() {
  const navigate = useNavigate();
  const [children, setChildren] = useState<Child[]>([]);
  const [draft, setDraft] = useState<Child>(EMPTY_CHILD);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const update = (patch: Partial<Child>) => setDraft((d) => ({ ...d, ...patch }));

  const startAdd = () => {
    setDraft(EMPTY_CHILD);
    setEditingIndex(null);
    navigate(`${ROOT}/add/name`);
  };

  const startEdit = (i: number) => {
    setDraft(children[i]);
    setEditingIndex(i);
    navigate(`${ROOT}/add/name`);
  };

  const removeChild = (i: number) => setChildren((prev) => prev.filter((_, idx) => idx !== i));

  const saveChild = () => {
    setChildren((prev) =>
      editingIndex === null ? [...prev, draft] : prev.map((c, i) => (i === editingIndex ? draft : c)),
    );
    setEditingIndex(null);
    navigate(ROOT);
  };

  const pageErrors: FieldError[] =
    submitted && children.length === 0
      ? [{ fieldId: "children", text: "Add at least one child" }]
      : [];

  const handleContinue = () => {
    setSubmitted(true);
    if (children.length > 0) navigate("/public-form");
  };

  return (
    <Routes>
      <Route
        index
        element={
          <ChildrenList
            items={children}
            onAdd={startAdd}
            onEdit={startEdit}
            onRemove={removeChild}
            errors={pageErrors}
            onContinue={handleContinue}
          />
        }
      />
      <Route
        path="add/name"
        element={<NameStep value={draft.name} onChange={(v) => update({ name: v })} />}
      />
      <Route
        path="add/age"
        element={
          <YesNoStep
            heading="Is the child 18 or older?"
            back={`${ROOT}/add/name`}
            value={draft.isAdult}
            onChange={(v) => update({ isAdult: v })}
            next={(v) => (v === "yes" ? `${ROOT}/add/education` : `${ROOT}/add/confirm`)}
            requiredError="Select yes if the child is 18 or older"
          />
        }
      />
      <Route
        path="add/education"
        element={
          <YesNoStep
            heading="Is the child in full-time education?"
            back={`${ROOT}/add/age`}
            value={draft.inEducation}
            onChange={(v) => update({ inEducation: v })}
            next={() => `${ROOT}/add/confirm`}
            requiredError="Select yes if the child is in full-time education"
          />
        }
      />
      <Route
        path="add/confirm"
        element={<ConfirmStep draft={draft} editing={editingIndex !== null} onAdd={saveChild} />}
      />
      <Route path="*" element={<Navigate to={ROOT} replace />} />
    </Routes>
  );
}
