import { GoABCalloutSize, GoABCalloutType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  heading?: string;
  type?: GoABCalloutType;
  size?: GoABCalloutSize;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-callout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABCalloutProps extends Margins {
  heading?: string;
  type?: GoABCalloutType;
  size?: GoABCalloutSize;
  testId?: string;
  children?: React.ReactNode;
}

export const GoABCallout = ({
  heading,
  type = "information",
  size = "large",
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoABCalloutProps) => {
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

export default GoABCallout;
