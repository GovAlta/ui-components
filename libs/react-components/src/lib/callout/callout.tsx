import React from "react";
import { Margins } from "../../common/styling";

type CalloutType =
  | "important"
  | "information"
  | "event"
  | "success"
  | "emergency";

interface WCProps extends Margins {
  heading?: string;
  type?: CalloutType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-callout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface CalloutProps extends Margins {
  heading?: string;
  type?: CalloutType;
  testId?: string;
  children?: React.ReactNode;
}

export const GoACallout = ({
  heading,
  type = "information",
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}: CalloutProps) => {
  return (
    <goa-callout
      heading={heading}
      type={type}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      data-testid={testId}
    >
      {children}
    </goa-callout>
  );
};

export default GoACallout;
