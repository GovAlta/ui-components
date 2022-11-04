import React, { FC } from "react";

type RequirementType = "optional" | "required";

interface WCProps {
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

interface GoAFormItemProps {
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
}) => {
  return (
    <goa-form-item
      label={label}
      error={error}
      requirement={requirement}
      helptext={helpText}
    >
      {children}
    </goa-form-item>
  );
};

export default GoAFormItem;
