import { ABGovCalloutSize, ABGovCalloutType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  heading?: string;
  type?: ABGovCalloutType;
  size?: ABGovCalloutSize;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-callout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface ABGovCalloutProps extends Margins {
  heading?: string;
  type?: ABGovCalloutType;
  size?: ABGovCalloutSize;
  testId?: string;
  children?: React.ReactNode;
}

export const ABGovCallout = ({
  heading,
  type = "information",
  size = "large",
  testId,
  children,
  mt,
  mr,
  mb,
  ml,
}: ABGovCalloutProps) => {
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
}

export default ABGovCallout;
