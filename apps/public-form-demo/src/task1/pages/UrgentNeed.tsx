import { GoabxFormItem, GoabxRadioGroup, GoabxRadioItem } from "@abgov/react-components/experimental";

/**
 * Page 1: Urgent Financial Need
 *
 * Simple radio group question with Yes/No options.
 * Heading and section-title come from outline.props automatically.
 */
export function UrgentNeed() {
  return (
    <GoabxFormItem label="">
      <GoabxRadioGroup name="urgentNeed" data-pf-item="">
        <GoabxRadioItem value="Yes" label="Yes" />
        <GoabxRadioItem value="No" label="No" />
      </GoabxRadioGroup>
    </GoabxFormItem>
  );
}
