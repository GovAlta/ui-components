import {
  GoabFormItemLabelSize,
  GoabFormItemRequirement,
  GoabFormItemType,
  Margins,
  DataAttributes,
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
  type?: GoabFormItemType;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-form-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabFormItemProps extends Margins, DataAttributes {
  /** Creates a label for the form item. */
  label?: string;
  /** Sets the label size. 'regular' for standard, 'large' for emphasis. @default "regular" */
  labelSize?: GoabFormItemLabelSize;
  /** Marks the field with an optional or required label indicator. */
  requirement?: GoabFormItemRequirement;
  /** Error text displayed under the form field. Leave blank to indicate a valid field. Accepts a string or ReactNode for custom error content. */
  error?: string | React.ReactNode;
  /** Help text displayed under the form field to provide additional explanation. Accepts a string or ReactNode for custom help content. */
  helpText?: string | React.ReactNode;
  /** Sets the maximum width of the form item. @default "none" */
  maxWidth?: string;
  /** Specifies the input type for appropriate message spacing. Used with checkbox-list or radio-group. */
  type?: GoabFormItemType;
  /** Sets the display order within the form summary. For public-form use only. */
  publicFormSummaryOrder?: number;
  /** Overrides the label value within the form-summary to provide a shorter description. For public-form use only. */
  name?: string;
  /** Content rendered inside the form item, typically an input component. */
  children?: React.ReactNode;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Sets the id attribute on the form item element. */
  id?: string;
}

/** Wraps an input control with a text label, requirement label, helper text, and error text. */
export function GoabFormItem({
  error,
  helpText,
  publicFormSummaryOrder,
  children,
  type = "",
  ...rest
}: GoabFormItemProps): JSX.Element {
  const _props = transformProps<WCProps>({ type, ...rest }, lowercase);

  return (
    <goa-form-item
      error={typeof error === "string" ? error : undefined}
      helptext={typeof helpText === "string" ? helpText : undefined}
      public-form-summary-order={publicFormSummaryOrder}
      {..._props}
      version="2"
    >
      {error && typeof error !== "string" && <div slot="error">{error}</div>}
      {helpText && typeof helpText !== "string" && <div slot="helptext">{helpText}</div>}
      {children}
    </goa-form-item>
  );
}

export default GoabFormItem;
