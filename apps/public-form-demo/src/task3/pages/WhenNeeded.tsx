import { GoabxFormItem, GoabxDatePicker } from "@abgov/react-components/experimental";

/**
 * Future date picker - when is assistance needed to begin?
 * No label needed - page heading serves as the label.
 */
export function WhenNeeded() {
  // Tomorrow (disables today in the calendar)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <div className="form-fields">
      <GoabxFormItem label="">
        <GoabxDatePicker
          name="assistanceDate"
          data-pf-item=""
          min={tomorrow}
        />
      </GoabxFormItem>
    </div>
  );
}
