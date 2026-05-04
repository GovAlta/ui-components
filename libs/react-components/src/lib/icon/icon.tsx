import {
  GoabIconOverridesType,
  GoabIconSize,
  GoabIconTheme,
  GoabIconType,
  Margins,
  DataAttributes,
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
  /** @required The icon type to display. See GoabIconType for available icons. */
  type: GoabIconType | GoabIconOverridesType;
  /** Sets the size of the icon. Accepts numeric (1-6) or named sizes. @default "medium" */
  size?: GoabIconSize;
  /** Sets the icon theme. 'outline' shows stroked icons, 'filled' shows solid icons. @default "outline" */
  theme?: GoabIconTheme;
  /** When true, inverts the icon colors for use on dark backgrounds. */
  inverted?: string | boolean; // TODO: Change type to only boolean
  /** Sets a custom fill color for the icon. Accepts any valid CSS color value. */
  fillColor?: string;
  /** Sets the opacity of the icon from 0 (transparent) to 1 (opaque). @default 1 */
  opacity?: number;
  /** Adds an accessible title to the icon SVG. Used by screen readers. */
  title?: string;
  /** Defines how the icon will be announced by screen readers. */
  ariaLabel?: string;
  /** Sets the ARIA role for the icon. Use 'presentation' for decorative icons. @default "img" */
  role?: string;
  /** Sets a data-testid attribute for automated testing. */
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
  role?: string;
  testid?: string;
}

/** A simple and universal graphic symbol representing an action, object, or concept to help guide the user. */
export function GoabIcon({ inverted, ...rest }: GoabIconProps): JSX.Element {
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
