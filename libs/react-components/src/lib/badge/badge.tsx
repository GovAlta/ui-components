import { GoabBadgeType, Margins, GoabIconType } from "@abgov/ui-components-common";
import type { JSX } from "react";
import { DataGridProps, useDataGridProps } from "../common/data-props";

interface WCProps extends Margins {
  type: GoabBadgeType;
  icon?: string;
  content?: string;
  arialabel?: string;
  testid?: string;
  icontype?: GoabIconType;
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

export interface GoabBadgeProps extends Margins, DataGridProps {
  type: GoabBadgeType;
  icon?: boolean;
  content?: string;
  testId?: string;
  ariaLabel?: string;
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

export function GoabBadge(props: GoabBadgeProps): JSX.Element {
  const [dataGridProps, {
    type,
    content,
    icon,
    testId,
    mt,
    mr,
    mb,
    ml,
    ariaLabel,
    iconType,
  }] = useDataGridProps(props);

  return (
    <goa-badge
      type={type}
      content={content}
      // Handle icon display priority: explicit icon prop takes precedence over iconType
      icon={getIconValue(icon, iconType)}
      testid={testId}
      arialabel={ariaLabel}
      icontype={iconType}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
      {...dataGridProps}
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
