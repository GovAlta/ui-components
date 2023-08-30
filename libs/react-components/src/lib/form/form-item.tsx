import React, { FC } from "react";
import { Margins } from "../../common/styling";

type RequirementType = "optional" | "required";

interface WCProps extends Margins {
  label?: string;
  labelsize?: string;
  requirement?: RequirementType;
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

interface GoAFormItemProps extends Margins {
  label?: string;
  labelSize?: string;
  requirement?: RequirementType;
  error?: string;
  helpText?: string;
  children?: React.ReactNode;
  testId?: string;
  id?: string;
}

export const GoAFormItem: FC<GoAFormItemProps> = ({
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
}) => {
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
