import { ABGovFormItemLabelSize, ABGovFormItemRequirement, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  label?: string;
  labelsize?: GoAFormItemLabelSize;
  requirement?: GoAFormItemRequirement;
  error?: string;
  helptext?: string;
  id?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-form-item": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovFormItemProps extends Margins {
  label?: string;
  labelSize?: GoAFormItemLabelSize;
  requirement?: GoAFormItemRequirement;
  error?: React.ReactNode;
  helpText?: React.ReactNode;
  children?: React.ReactNode;
  testId?: string;
  id?: string;
}

export function ABGovFormItem({
  children,
  helpText,
  error,
  requirement,
  label,
  labelSize,
  mt,
  mr,
  mb,
  ml,
  testId,
  id,
}: ABGovFormItemProps): JSX.Element {
  return (
    <goa-form-item
      label={label}
      labelsize={labelSize}
      error={typeof error === "string" ? error : undefined}
      requirement={requirement}
      helptext={typeof helpText === "string" ? helpText : undefined}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
      id={id}
    >
      {error && typeof error !== "string" && <div slot="error">{error}</div>}
      {helpText && typeof helpText !== "string" && <div slot="helptext">{helpText}</div>}
      {children}
    </goa-form-item>
  );
}

export default ABGovFormItem;
