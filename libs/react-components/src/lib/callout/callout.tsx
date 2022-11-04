import React from "react";

type CalloutType =
  | "important"
  | "information"
  | "event"
  | "success"
  | "emergency";

interface WCProps {
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

export interface CalloutProps {
  heading?: string;
  type?: CalloutType;
  children?: React.ReactNode;
}

export const GoACallout = ({
  heading,
  type = "information",
  children,
}: CalloutProps) => {
  return (
    <goa-callout heading={heading} type={type}>
      {children}
    </goa-callout>
  );
};

export default GoACallout;
