import { Margins } from "../../common/styling";

export type GoACalloutType =
  | "important"
  | "information"
  | "event"
  | "success"
  | "emergency";

export type GoACalloutSize = "medium" | "large";
export type GoACalloutAriaLive = "off" | "polite" | "assertive";
export type GoACalloutIconSize = "small" | "medium" | "large" | "xlarge";

interface WCProps extends Margins {
  heading?: string;
  type?: GoACalloutType;
  size?: GoACalloutSize;
  maxwidth?: string;
  arialive?: GoACalloutAriaLive;
  iconsize?: GoACalloutIconSize;
  testid?: string;
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
  iconSize?: GoACalloutIconSize;
  maxWidth?: string;
  testId?: string;
  ariaLive?: GoACalloutAriaLive;
  children?: React.ReactNode;
}

export type CalloutProps = GoACalloutProps;

export const GoACallout = ({
  heading,
  type = "information",
  size = "large",
  maxWidth,
  testId,
  ariaLive = "off",
  iconSize,
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
      maxwidth={maxWidth}
      arialive={ariaLive}
      iconsize={iconSize}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      testid={testId}
    >
      {children}
    </goa-callout>
  );
};

export default GoACallout;
