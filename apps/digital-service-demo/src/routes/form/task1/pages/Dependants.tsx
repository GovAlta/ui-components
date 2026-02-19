import { useRef } from "react";
import { GoabxFormItem, GoabxInput } from "@abgov/react-components/experimental";
import { GoabPfSubform } from "@abgov/react-components";

/**
 * Page 7: Dependants (Repeater with Subform)
 *
 * Uses GoabPfSubform for add/edit/remove dependants.
 * The subform opens a modal for adding/editing.
 *
 * Note: The dependants list is rendered OUTSIDE the GoabPfSubform because
 * React children in web component slots don't update dynamically. We manually
 * dispatch edit/delete events to the subform element.
 *
 * Heading comes from outline.props automatically.
 */

function DependantForm() {
  return (
    <GoabxFormItem label="Full name of dependant">
      <GoabxInput name="dependantName" data-pf-item="" width="100%" />
    </GoabxFormItem>
  );
}

type DependantsProps = {
  dependants?: Array<{ _id: string; dependantName?: string }>;
};

export function Dependants({ dependants = [] }: DependantsProps) {
  const subformRef = useRef<HTMLDivElement>(null);

  // Dispatch edit/delete events to the subform's inner element
  // The subform listens on its inner _rootEl div inside the shadow DOM
  const handleEdit = (id: string) => {
    const subformEl = subformRef.current?.querySelector("goa-pf-subform");
    if (subformEl?.shadowRoot) {
      const innerEl = subformEl.shadowRoot.querySelector("div");
      if (innerEl) {
        innerEl.dispatchEvent(new CustomEvent("edit", { detail: id, bubbles: true }));
      }
    }
  };

  const handleDelete = (id: string) => {
    const subformEl = subformRef.current?.querySelector("goa-pf-subform");
    if (subformEl?.shadowRoot) {
      const innerEl = subformEl.shadowRoot.querySelector("div");
      if (innerEl) {
        innerEl.dispatchEvent(new CustomEvent("delete", { detail: id, bubbles: true }));
      }
    }
  };

  return (
    <>
      {/* Description in "description" slot - renders before error summary in FormPage */}
      <p slot="description" style={{ marginBottom: "var(--goa-space-xl)" }}>
        Please enter the full name of any dependants under the age of 18 who should be
        included in this application. This information will help determine eligibility for
        services and benefits. If you have multiple dependants, you can add them using
        the option below. Ensure that names are entered exactly as they appear on
        official documents, such as birth certificates or legal guardianship papers.
      </p>

      <div className="form-fields">
      {/* Render list OUTSIDE the subform - React children in web component slots don't update */}
      {dependants.length > 0 && (
        <div style={{ marginBottom: "var(--goa-space-l)" }}>
          {dependants.map((dep, index) => (
            <div
              key={dep._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "var(--goa-space-m) 0",
                borderBottom: "1px solid var(--goa-color-greyscale-200)",
              }}
            >
              <span>
                <strong>Dependant {index + 1}:</strong> {dep.dependantName || "Unnamed"}
              </span>
              <div style={{ display: "flex", gap: "var(--goa-space-m)" }}>
                <button
                  type="button"
                  className="action-link"
                  onClick={() => handleEdit(dep._id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="action-link"
                  onClick={() => handleDelete(dep._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={subformRef}>
        <GoabPfSubform
          formContent={<DependantForm />}
          addButtonText="Add a dependant"
          addButtonType="tertiary"
          addButtonSize="compact"
          addButtonIcon="add"
          addHeading="Add a dependant"
          editHeading="Edit dependant"
        />
      </div>
      </div>
    </>
  );
}
