import {
  GoabCalloutAriaLive,
  GoabCalloutEmphasis,
  GoabCalloutSize,
  GoabCalloutType,
  GoabCalloutIconTheme,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  heading?: string;
  type?: GoabCalloutType;
  size?: GoabCalloutSize;
  arialive?: GoabCalloutAriaLive;
  maxwidth?: string;
  icontheme?: GoabCalloutIconTheme;
  emphasis?: GoabCalloutEmphasis;
  testid?: string;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-callout": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabCalloutProps extends Margins, DataAttributes {
  heading?: string;
  type?: GoabCalloutType;
  size?: GoabCalloutSize;
  iconTheme?: GoabCalloutIconTheme;
  emphasis?: GoabCalloutEmphasis;
  maxWidth?: string;
  testId?: string;
  ariaLive?: GoabCalloutAriaLive;
  children?: React.ReactNode;
}

export const GoabCallout = ({
  type = "information",
  iconTheme = "outline",
  size = "large",
  ariaLive = "off",
  emphasis = "medium",
  children,
  ...rest
}: GoabCalloutProps) => {
  const _props = transformProps<WCProps>(
    { type, icontheme: iconTheme, size, arialive: ariaLive, emphasis, ...rest },
    lowercase,
  );

  return (
    <goa-callout {..._props} version="2">
      {children}
    </goa-callout>
  );
};

export default GoabCallout;
