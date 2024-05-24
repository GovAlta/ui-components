import { GoABBadgeType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  type: GoABBadgeType;
  icon?: boolean;
  content?: string;
  arialabel?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      "goa-badge": WCProps & React.HTMLAttributes<HTMLElement>;
    }
  }
}

export interface GoABBadgeProps extends Margins {
  type: GoABBadgeType;
  icon?: boolean;
  content?: string;
  testId?: string;
  ariaLabel?: string;
}

export function GoABBadge({
  type,
  content,
  icon,
  testId,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: GoABBadgeProps): JSX.Element {
  return (
    <goa-badge
      type={type}
      content={content}
      icon={icon}
      data-testid={testId}
      arialabel={ariaLabel}
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
export function GoABInfoBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: GoABBadgeProps): JSX.Element {
  return (
    <GoABBadge
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
export function GoABSuccessBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: GoABBadgeProps): JSX.Element {
  return (
    <GoABBadge
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
export function GoABImportantBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: GoABBadgeProps): JSX.Element {
  return (
    <GoABBadge
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
export function GoABEmergencyBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: GoABBadgeProps): JSX.Element {
  return (
    <GoABBadge
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
