import {
  GoabIconOverridesType,
  GoabIconSize,
  GoabIconTheme,
  GoabIconType,
  Margins, DataAttributes,
} from "@abgov/ui-components-common";

import type { JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IonIconElement extends HTMLElement {}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-icon": WCProps & React.HTMLAttributes<IonIconElement>;
    }
  }
}

export interface GoabIconProps extends Margins, DataAttributes {
  /**
   * The icon type to display. See GoAIconType for available icons.
   * @required
   */
  type: GoabIconType | GoabIconOverridesType;
  /**
   * Sets the size of the icon. Accepts numeric (1-6) or named sizes.
   * @default "medium"
   */
  size?: GoabIconSize;
  /**
   * Sets the icon theme. 'outline' shows stroked icons, 'filled' shows solid icons.
   * @default "outline"
   */
  theme?: GoabIconTheme;
  /**
   * When true, inverts the icon colors for use on dark backgrounds.
   * @default false
   */
  inverted?: string | boolean; // TODO: Change type to only boolean
  /**
   * Sets a custom fill color for the icon. Accepts any valid CSS color value.
   * @default ""
   */
  fillColor?: string;
  /**
   * Sets the opacity of the icon from 0 (transparent) to 1 (opaque).
   * @default 1
   */
  opacity?: number;
  /**
   * Adds an accessible title to the icon SVG. Used by screen readers.
   * @default ""
   */
  title?: string;
  /**
   * Defines how the icon will be announced by screen readers.
   * @default ""
   */
  ariaLabel?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
}

interface WCProps extends Margins {
  type: GoabIconType | GoabIconOverridesType;
  theme?: GoabIconTheme;
  size?: GoabIconSize;
  inverted?: string;
  fillcolor?: string;
  opacity?: number;
  title?: string;
  arialabel?: string;
  testid?: string;
}

export function GoabIcon({
  inverted,
  ...rest
}: GoabIconProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-icon
      inverted={
        typeof inverted === "boolean" ? (inverted ? "true" : undefined) : inverted
      }
      {..._props}
    />
  );
}
