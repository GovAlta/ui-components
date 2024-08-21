import { GoabCalloutSize, GoabCalloutType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  heading?: string;
  type?: GoabCalloutType;
  size?: GoabCalloutSize;
  maxwidth?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-callout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCalloutProps extends Margins {
  heading?: string;
  type?: GoabCalloutType;
  size?: GoabCalloutSize;
  maxWidth?: string;
  testId?: string;
  children?: React.ReactNode;
}

export const GoabCallout = ({
  heading,
  type = "information",
  size = "large",
  maxWidth,
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}: GoabCalloutProps) => {
  return (
    <goa-callout
      heading={heading}
      type={type}
      size={size}
      maxwidth={maxWidth}
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

export default GoabCallout;
