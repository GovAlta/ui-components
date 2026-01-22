import {
  DataAttributes,
  GoabBadgeEmphasis,
  GoabBadgeSize,
  GoabBadgeType,
  GoabxBadgeType,
  GoabIconType,
  Margins,
} from "@abgov/ui-components-common";
import type { JSX } from "react";
import { transformProps, lowercase } from "../../lib/common/extract-props";

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

export interface GoabxBadgeProps extends Margins, DataAttributes {
  type: GoabxBadgeType;
  icon?: boolean;
  content?: string;
  testId?: string;
  ariaLabel?: string;
  iconType?: GoabIconType;
  size?: GoabBadgeSize;
  emphasis?: GoabBadgeEmphasis;
  version?: string;
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

export function GoabxBadge({
  icon,
  iconType,
  size = "medium",
  emphasis = "strong",
  version = "2",
  ...rest
}: GoabxBadgeProps): JSX.Element {
  const _props = transformProps<WCProps>({ size, emphasis, ...rest }, lowercase);

  return (
    <goa-badge
      // Handle icon display priority: explicit icon prop takes precedence over iconType
      icon={getIconValue(icon, iconType)}
      icontype={iconType}
      {..._props}
      version={version}
      size={size}
      emphasis={emphasis}
    />
  );
}
