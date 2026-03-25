import {
  GoabCalloutAriaLive,
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
  testid?: string;
}

export interface GoabCalloutProps extends Margins, DataAttributes {
  /**
   * Callout heading text.
   * @default ""
   */
  heading?: string;
  /**
   * Define the context and colour of the callout.
   * @required
   */
  type?: GoabCalloutType;
  /**
   * Sets the size of the callout. 'medium' has reduced padding and type size for compact areas.
   * @default "large"
   */
  size?: GoabCalloutSize;
  /**
   * Sets the icon theme. 'outline' for stroked icons, 'filled' for solid icons.
   * @default "outline"
   */
  iconTheme?: GoabCalloutIconTheme;
  /**
   * Sets the maximum width of the callout.
   * @default "none"
   */
  maxWidth?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * Indicates how assistive technology should handle updates to the live region.
   * @default "off"
   */
  ariaLive?: GoabCalloutAriaLive;
  /** TO DO: Write a description */
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
    lowercase
  );

  return (
    <goa-callout {..._props}>
      {children}
    </goa-callout>
  );
};

export default GoabCallout;
