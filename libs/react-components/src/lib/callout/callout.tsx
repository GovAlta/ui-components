import {
  GoabCalloutAriaLive,
  GoabCalloutEmphasis,
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
  /** Callout heading text. */
  heading?: string;
  /** Sets the context and colour of the callout. @default "information" */
  type?: GoabCalloutType;
  /** Sets the size of the callout. 'medium' has reduced padding and type size for compact areas. @default "large" */
  size?: GoabCalloutSize;
  /** Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons. @default "outline" */
  iconTheme?: GoabCalloutIconTheme;
  /** Sets the visual prominence. 'high' for full background, 'medium' for subtle, 'low' for minimal. @default "medium" */
  emphasis?: GoabCalloutEmphasis;
  /** Sets the maximum width of the callout. */
  maxWidth?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Indicates how assistive technology should handle updates to the live region. @default "off" */
  ariaLive?: GoabCalloutAriaLive;
  /** Content rendered inside the callout body. */
  children?: React.ReactNode;
}

/** Communicate important information through a strong visual emphasis. */
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
