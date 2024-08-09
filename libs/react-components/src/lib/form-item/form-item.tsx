import {
  GoABFormItemLabelSize,
  GoABFormItemRequirement,
  Margins,
} from "@abgov/ui-components-common";

interface WCProps extends Margins {
  label?: string;
  labelsize?: GoABFormItemLabelSize;
  requirement?: GoABFormItemRequirement;
  error?: string;
  helptext?: string;
  maxwidth?: string;
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

export interface GoABFormItemProps extends Margins {
  label?: string;
  labelSize?: GoABFormItemLabelSize;
  requirement?: GoABFormItemRequirement;
  error?: string;
  helpText?: string;
  maxWidth?: string;
  children?: React.ReactNode;
  testId?: string;
  id?: string;
}

export function GoABFormItem({
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
}: GoABFormItemProps): JSX.Element {
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
      data-testid={testId}
      id={id}
    >
      {error && typeof error !== "string" && <div slot="error">{error}</div>}
      {helpText && typeof helpText !== "string" && <div slot="helptext">{helpText}</div>}
      {children}
    </goa-form-item>
  );
}

export default GoABFormItem;
