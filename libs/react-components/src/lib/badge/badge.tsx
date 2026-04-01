import {
  DataAttributes,
  GoabBadgeEmphasis,
  GoabBadgeSize,
  GoabBadgeType,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";
import type { JSX } from "react";
import { transformProps, lowercase } from "../common/extract-props";

interface WCProps extends Margins {
  type: GoabBadgeType;
  icon?: string;
  content?: string;
  arialabel?: string;
  testid?: string;
  icontype?: GoabIconType;
  size?: GoabBadgeSize;
  emphasis?: GoabBadgeEmphasis;
  version?: string;
}

declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "goa-badge": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoabBadgeProps extends Margins, DataAttributes {
  /** @required Sets the context and colour of the badge. */
  type: GoabBadgeType;
  /** @deprecated Use iconType instead. When true, displays an icon in the badge. */
  icon?: boolean;
  /** Text label of the badge. */
  content?: string;
  /** Sets a data-testid attribute for automated testing. */
  testId?: string;
  /** Accessible label for screen readers. */
  ariaLabel?: string;
  /** Icon type to display in the badge. */
  iconType?: GoabIconType;
  /** Sets the size of the badge. @default "medium" */
  size?: GoabBadgeSize;
  /** Sets the visual emphasis. 'subtle' for less prominent, 'strong' for more emphasis. @default "strong" */
  emphasis?: GoabBadgeEmphasis;
}

/**
 * Determines the icon display logic for the badge component.
 * Priority order:
 * 1. icon={true} - always show icon, starting with default
 * 2. icon={false} - always hide icon (overrides iconType)
 * 3. iconType provided - show custom icon
 * 4. default/no icon or iconType set - hide icon
 */
function getIconValue(icon?: boolean, iconType?: GoabIconType): "true" | "false" {
  // Explicit icon prop takes precedence
  if (icon !== undefined) {
    return icon ? "true" : "false";
  }

  // Show custom icon if iconType is provided
  return iconType ? "true" : "false";
}

/** Small labels which hold small amounts of information, system feedback, or states. */
export function GoabBadge({
  icon,
  iconType,
  size = "medium",
  emphasis = "strong",
  ...rest
}: GoabBadgeProps): JSX.Element {
  const _props = transformProps<WCProps>({ size, emphasis, ...rest }, lowercase);

  return (
    <goa-badge
      // Handle icon display priority: explicit icon prop takes precedence over iconType
      icon={getIconValue(icon, iconType)}
      icontype={iconType}
      {..._props}
      version="2"
      size={size}
      emphasis={emphasis}
    />
  );
}
