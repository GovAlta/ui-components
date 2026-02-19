import {
  GoabxFormItem,
  GoabxDropdown,
  GoabxDropdownItem,
} from "@abgov/react-components/experimental";

/**
 * Employment status dropdown page.
 * No label needed - page heading serves as the label.
 */
export function Employment() {
  return (
    <div className="form-fields">
      <GoabxFormItem label="">
        <GoabxDropdown name="employmentStatus" data-pf-item="">
          <GoabxDropdownItem value="employed-full-time" label="Employed full-time" />
          <GoabxDropdownItem value="employed-part-time" label="Employed part-time" />
          <GoabxDropdownItem value="self-employed" label="Self-employed" />
          <GoabxDropdownItem value="unemployed" label="Unemployed" />
          <GoabxDropdownItem value="student" label="Student" />
          <GoabxDropdownItem value="retired" label="Retired" />
          <GoabxDropdownItem value="unable-to-work" label="Unable to work" />
          <GoabxDropdownItem value="other" label="Other" />
        </GoabxDropdown>
      </GoabxFormItem>
    </div>
  );
}
