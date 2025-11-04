import {
  GoabFormItemLabelSize,
  GoabFormItemRequirement,
  Margins,
} from "@abgov/ui-components-common";

import type { JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

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
  const [dataGridProps, {
    children,
    helpText,
    error,
    requirement,
    label,
    labelSize,
    maxWidth,
    publicFormSummaryOrder,
    name,
    mt,
    mr,
    mb,
    ml,
    testId,
    id,
  }] = useDataGridProps(props);

  return (
    <goa-form-item
      version={"2"}
      label={label}
      labelsize={labelSize}
      error={typeof error === "string" ? error : undefined}
      requirement={requirement}
      helptext={typeof helpText === "string" ? helpText : undefined}
      maxwidth={maxWidth}
      public-form-summary-order={publicFormSummaryOrder}
      name={name}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
      id={id}
      {...dataGridProps}
    >
      {error && typeof error !== "string" && <div slot="error">{error}</div>}
      {helpText && typeof helpText !== "string" && <div slot="helptext">{helpText}</div>}
      {children}
    </goa-form-item>
  );
}

export default GoabFormItem;
