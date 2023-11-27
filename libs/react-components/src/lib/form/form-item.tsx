import { Margins } from "../../common/styling";

export type GoAFormItemRequirement = "optional" | "required";
export type GoAFormItemLabelSize = "regular" | "large";

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

export interface GoAFormItemProps extends Margins {
  label?: string;
  labelSize?: GoAFormItemLabelSize;
  requirement?: GoAFormItemRequirement;
  error?: string;
  helpText?: string;
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
  mt,
  mr,
  mb,
  ml,
  testId,
  id,
}: GoAFormItemProps): JSX.Element {
  return (
    <goa-form-item
      label={label}
      labelsize={labelSize}
      error={error}
      requirement={requirement}
      helptext={helpText}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
      id={id}
    >
      {children}
    </goa-form-item>
  );
};

export default GoAFormItem;
