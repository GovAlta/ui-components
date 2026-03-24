import {
  DataAttributes,
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
}

export interface GoabBadgeProps extends Margins, DataAttributes {
  /** Defines the context and colour of the badge. */
  type: GoabBadgeType;
  /**
   * @deprecated Use icontype instead. Includes an icon in the badge.
   * @default ""
   */
  icon?: boolean;
  /**
   * Text label of the badge.
   * @default ""
   */
  content?: string;
  /**
   * Sets a data-testid attribute for automated testing.
   * @default ""
   */
  testId?: string;
  /**
   * Accessible label for screen readers.
   * @default ""
   */
  ariaLabel?: string;
  /** Icon type to display in the badge. */
  iconType?: GoabIconType;
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

export function GoabBadge({ icon, iconType, ...rest }: GoabBadgeProps): JSX.Element {
  const _props = transformProps<WCProps>(rest, lowercase);

  return (
    <goa-badge
      // Handle icon display priority: explicit icon prop takes precedence over iconType
      icon={getIconValue(icon, iconType)}
      icontype={iconType}
      {..._props}
    />
  );
}

/**
 * @deprecated
 */
export function GoabInfoBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: GoabBadgeProps): JSX.Element {
  return (
    <GoabBadge
      type="information"
      icon={icon}
      content={content}
      testId={testId}
      ariaLabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
}

/**
 * @deprecated
 */
export function GoabSuccessBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: GoabBadgeProps): JSX.Element {
  return (
    <GoabBadge
      type="success"
      icon={icon}
      content={content}
      ariaLabel={ariaLabel}
      testId={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
}

/**
 * @deprecated
 */
export function GoabImportantBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: GoabBadgeProps): JSX.Element {
  return (
    <GoabBadge
      type="important"
      icon={icon}
      content={content}
      testId={testId}
      ariaLabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
}

/**
 * @deprecated
 */
export function GoabEmergencyBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: GoabBadgeProps): JSX.Element {
  return (
    <GoabBadge
      type="emergency"
      icon={icon}
      content={content}
      testId={testId}
      ariaLabel={ariaLabel}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
}
