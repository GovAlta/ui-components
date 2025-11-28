import {
  GoabFormItemLabelSize,
  GoabFormItemRequirement,
  Margins, DataGridProps,
} from "@abgov/ui-components-common";

import type { JSX } from "react";
import { extractProps } from "../common/extract-props";

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

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-form-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabFormItemProps extends Margins, DataGridProps {
  label?: string;
  labelSize?: GoabFormItemLabelSize;
  requirement?: GoabFormItemRequirement;
  error?: string | React.ReactNode;
  helpText?: string | React.ReactNode;
  maxWidth?: string;
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

export function GoabFormItem(props: GoabFormItemProps): JSX.Element {
  const _props = extractProps<WCProps>(props, {
    exclude: ["error", "helpText", "publicFormSummaryOrder"],
    attributeMapping: "lowercase",
  });

  return (
    <goa-form-item
      error={typeof props.error === "string" ? props.error : undefined}
      helptext={typeof props.helpText === "string" ? props.helpText : undefined}
      public-form-summary-order={props.publicFormSummaryOrder}
      {..._props}
    >
      {props.error && typeof props.error !== "string" && <div slot="error">{props.error}</div>}
      {props.helpText && typeof props.helpText !== "string" && <div slot="helptext">{props.helpText}</div>}
      {props.children}
    </goa-form-item>
  );
}

export default GoabFormItem;
