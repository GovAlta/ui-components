import { Margins } from "../../common/styling";

export type GoAFormItemRequirement = "optional" | "required";
export type GoAFormItemLabelSize = "regular" | "large";

interface WCProps extends Margins {
  label?: string;
  labelsize?: GoAFormItemLabelSize;
  requirement?: GoAFormItemRequirement;
  error?: string;
  helptext?: string;
  maxwidth?: string;
  id?: string;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-form-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoAFormItemProps extends Margins {
  label?: string;
  labelSize?: GoAFormItemLabelSize;
  requirement?: GoAFormItemRequirement;
  error?: React.ReactNode;
  helpText?: React.ReactNode;
  maxWidth?: string;
  children?: React.ReactNode;
  testId?: string;
  id?: string;
}

export function GoAFormItem({
  children,
  helpText,
  error,
  requirement,
  label,
  labelSize,
  maxWidth,
  mt,
  mr,
  mb,
  ml,
  testId,
  id,
}: GoAFormItemProps): JSX.Element {
  if (id) {
    console.warn("FormItem [id] property has been deprecated");
  }

  return (
    <goa-form-item
      label={label}
      labelsize={labelSize}
      error={typeof error === "string" ? error : undefined}
      requirement={requirement}
      helptext={typeof helpText === "string" ? helpText : undefined}
      maxwidth={maxWidth}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    >
      {error && typeof error !== "string" && <div slot="error">{error}</div>}
      {helpText && typeof helpText !== "string" && <div slot="helptext">{helpText}</div>}
      {children}
    </goa-form-item>
  );
}

export default GoAFormItem;
