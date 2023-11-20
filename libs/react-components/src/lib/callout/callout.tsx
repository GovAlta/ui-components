import React from "react";
import { Margins } from "../../common/styling";

export type GoACalloutType =
  | "important"
  | "information"
  | "event"
  | "success"
  | "emergency";

export type GoACalloutSize = "medium" | "large";

interface WCProps extends Margins {
  heading?: string;
  type?: GoACalloutType;
  size?: GoACalloutSize;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-callout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoACalloutProps extends Margins {
  heading?: string;
  type?: GoACalloutType;
  size?: GoACalloutSize;
  testId?: string;
  children?: React.ReactNode;
}

export type CalloutProps = GoACalloutProps;

export const GoACallout = ({
  heading,
  type = "information",
  size = "large",
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoACalloutProps) => {
  return (
    <goa-callout
      heading={heading}
      type={type}
      size={size}
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
