import {
  GoabFormItemLabelSize,
  GoabFormItemRequirement,
  GoabFormItemType,
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
  label?: string;
  labelSize?: GoabFormItemLabelSize;
  requirement?: GoabFormItemRequirement;
  error?: string | React.ReactNode;
  helpText?: string | React.ReactNode;
  maxWidth?: string;
  type?: GoabFormItemType;
  /**
   * Public form: to arrange fields in the summary
   */
  publicFormSummaryOrder?: number;
  /**
   * Public form: allow to override the label value within the form-summary to provide a shorter description of the value
   */
  name?: string;
  children?: React.ReactNode;
  testId?: string;
  id?: string;
}

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
