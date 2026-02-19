import {
  GoabxFormItem,
  GoabxDropdown,
  GoabxDropdownItem,
} from "@abgov/react-components/experimental";

/**
 * Conditional page - only shown when user selects "someone else" on ApplyingFor.
 * The branching logic is handled in outline.ts.
 * No label needed - page heading serves as the label.
 */
export function Relationship() {
  return (
    <div className="form-fields">
      <GoabxFormItem label="">
        <GoabxDropdown name="relationship" data-pf-item="">
          <GoabxDropdownItem value="parent" label="Parent or guardian" />
          <GoabxDropdownItem value="spouse" label="Spouse or partner" />
          <GoabxDropdownItem value="child" label="Adult child" />
          <GoabxDropdownItem value="sibling" label="Sibling" />
          <GoabxDropdownItem value="caregiver" label="Caregiver" />
          <GoabxDropdownItem value="legal-representative" label="Legal representative" />
          <GoabxDropdownItem value="other" label="Other" />
        </GoabxDropdown>
      </GoabxFormItem>
    </div>
  );
}
