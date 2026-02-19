import { GoabxFormItem, GoabxDatePicker } from "@abgov/react-components/experimental";

/**
 * Date of birth page - single date picker for past dates.
 * Uses type="input" for month/day/year fields (better for known dates far in the past).
 * No label needed - page heading serves as the label.
 */
export function DateOfBirth() {
  return (
    <div className="form-fields">
      <GoabxFormItem label="">
        <GoabxDatePicker
          name="dateOfBirth"
          data-pf-item=""
          type="input"
          max={new Date()}
        />
      </GoabxFormItem>
    </div>
  );
}
