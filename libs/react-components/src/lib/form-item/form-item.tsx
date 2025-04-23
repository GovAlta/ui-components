import { Margins, GoabFormItemLabelSize, GoabFormItemRequirement } from "../../common/types";

interface WCProps extends Margins {
  label?: string;
  labelsize?: GoabFormItemLabelSize;
  requirement?: GoabFormItemRequirement;
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

export interface GoabFormItemProps extends Margins {
  label?: string;
  labelSize?: GoabFormItemLabelSize;
  requirement?: GoabFormItemRequirement;
  error?: string | React.ReactNode;
  helpText?: string | React.ReactNode;
  maxWidth?: string;
  children?: React.ReactNode;
  testId?: string;
  id?: string;
}

export function GoabFormItem({
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
}: GoabFormItemProps): JSX.Element {
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
      id={id}
    >
      {error && typeof error !== "string" && <div slot="error">{error}</div>}
      {helpText && typeof helpText !== "string" && <div slot="helptext">{helpText}</div>}
      {children}
    </goa-form-item>
  );
}

export default GoabFormItem;
