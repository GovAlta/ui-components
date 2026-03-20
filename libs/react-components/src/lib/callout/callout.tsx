import {
  GoabCalloutAriaLive,
  GoabCalloutSize,
  GoabCalloutType,
  GoabCalloutIconTheme,
  Margins,
  DataAttributes,
} from "@abgov/ui-components-common";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  heading?: string;
  type?: GoabCalloutType;
  size?: GoabCalloutSize;
  arialive?: GoabCalloutAriaLive;
  maxwidth?: string;
  icontheme?: GoabCalloutIconTheme;
  testid?: string;
}

export interface GoabCalloutProps extends Margins, DataAttributes {
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
  type = "information",
  iconTheme = "outline",
  size = "large",
  ariaLive = "off",
  children,
  ...rest
}: GoabCalloutProps) => {
  const _props = transformProps<WCProps>(
    { type, icontheme: iconTheme, size, arialive: ariaLive, ...rest },
    lowercase,
  );

  return <goa-callout {..._props}>{children}</goa-callout>;
};

export default GoabCallout;
