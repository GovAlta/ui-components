import { GoabCalloutAriaLive, GoabCalloutSize, GoabCalloutType, GoabCalloutIconTheme } from "@abgov/ui-components-common";
import { Margins } from "../../common/types";

interface WCProps extends Margins {
  heading?: string;
  type?: GoabCalloutType;
  size?: GoabCalloutSize;
  arialive?: GoabCalloutAriaLive;
  maxwidth?: string;
  icontheme?: GoabCalloutIconTheme;
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

export interface GoabCalloutProps extends Margins {
  heading?: string;
  type?: GoabCalloutType;
  size?: GoabCalloutSize;
  iconTheme?: GoabCalloutIconTheme;
  maxWidth?: string;
  testId?: string;
  ariaLive?: GoabCalloutAriaLive;
  children?: React.ReactNode;
}

export const GoabCallout = ({
  heading,
  type = "information",
  iconTheme = "outline",
  size = "large",
  maxWidth,
  testId,
  ariaLive = "off",
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
      arialive={ariaLive}
      icontheme={iconTheme}
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

export default GoabCallout;
