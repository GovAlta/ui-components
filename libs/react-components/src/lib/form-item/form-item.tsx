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
}

export default GoABFormItem;
