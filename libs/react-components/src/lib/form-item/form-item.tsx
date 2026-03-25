import {
  GoabFormItemLabelSize,
  GoabFormItemRequirement,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";

import type { JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  label?: string;
  labelsize?: GoabFormItemLabelSize;
  requirement?: GoabFormItemRequirement;
  error?: string;
  helptext?: string;
  maxwidth?: string;
  "public-form-summary-order"?: number;
  name?: string;
  id?: string;
  testid?: string;
}

export interface GoabFormItemProps extends Margins, DataAttributes {
  /**
   * Creates a label for the form item.
   * @default ""
   */
  label?: string;
  /**
   * Sets the label size. 'compact' for dense layouts, 'regular' for standard, 'large' for emphasis.
   * @default "regular"
   */
  labelSize?: GoabFormItemLabelSize;
  /**
   * Marks the field with an optional or required label indicator.
   * @default ""
   */
  requirement?: GoabFormItemRequirement;
  /**
   * Error text displayed under the form field. Leave blank to indicate a valid field.
   * @default ""
   */
  error?: string | React.ReactNode;
  /**
   * Help text displayed under the form field to provide additional explanation.
   * @default ""
   */
  helpText?: string | React.ReactNode;
  /**
   * Sets the maximum width of the form item.
   * @default "none"
   */
  maxWidth?: string;
  /**
   * Public form: to arrange fields in the summary
   */
  publicFormSummaryOrder?: number;
  /**
   * Public form: allow to override the label value within the form-summary to provide a shorter description of the value
   */
  name?: string;
  /** TO REVIEW: The input control or other form element rendered inside this form item. */
  children?: React.ReactNode;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  id?: string;
}

export function GoabFormItem({
  error,
  helpText,
  publicFormSummaryOrder,
  children,
  ...rest
}: GoabFormItemProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-form-item
      error={typeof error === "string" ? error : undefined}
      helptext={typeof helpText === "string" ? helpText : undefined}
      public-form-summary-order={publicFormSummaryOrder}
      {..._props}
    >
      {error && typeof error !== "string" && <div slot="error">{error}</div>}
      {helpText && typeof helpText !== "string" && <div slot="helptext">{helpText}</div>}
      {children}
    </goa-form-item>
  );
}

export default GoabFormItem;
