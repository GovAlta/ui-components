import React, { FC } from "react";
import { Margins } from "../../common/styling";

type RequirementType = "optional" | "required";

interface WCProps extends Margins {
  label: string;
  requirement?: RequirementType;
  error?: string;
  helptext?: string;
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
  label: string;
  requirement?: RequirementType;
  error?: string;
  helpText?: string;
  children?: React.ReactNode;
}

export const GoAFormItem: FC<GoAFormItemProps> = ({
  children,
  helpText,
  error,
  requirement,
  label,
  mt,
  mr,
  mb,
  ml,
}) => {
  return (
    <goa-form-item
      label={label}
      error={error}
      requirement={requirement}
      helptext={helpText}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    >
      {children}
    </goa-form-item>
  );
};

export default GoAFormItem;
