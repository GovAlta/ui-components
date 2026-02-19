import {
  GoabxFormItem,
  GoabxRadioGroup,
  GoabxRadioItem,
} from "@abgov/react-components/experimental";

/**
 * Radio page with branching - "myself" or "someone else".
 * The branching logic is handled in outline.ts via the `next` function.
 */
export function ApplyingFor() {
  return (
    <div className="form-fields">
      <GoabxFormItem label="">
        <GoabxRadioGroup name="applyingFor" data-pf-item="">
          <GoabxRadioItem value="myself" label="Myself" />
          <GoabxRadioItem value="someone-else" label="Someone else" />
        </GoabxRadioGroup>
      </GoabxFormItem>
    </div>
  );
}
