import { ABGovBadgeType, Margins } from "@abgov/ui-components-common";

interface WCProps extends Margins {
  type: ABGovBadgeType;
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

export interface ABGovBadgeProps extends Margins {
  type: ABGovBadgeType;
  icon?: boolean;
  content?: string;
  testId?: string;
  ariaLabel?: string;
}

export function ABGovBadge({
  type,
  content,
  icon,
  testId,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: ABGovBadgeProps): JSX.Element {
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
export function ABGovInfoBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: ABGovBadgeProps): JSX.Element {
  return (
    <ABGovBadge
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
export function ABGovSuccessBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: ABGovBadgeProps): JSX.Element {
  return (
    <ABGovBadge
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
export function ABGovImportantBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: ABGovBadgeProps): JSX.Element {
  return (
    <ABGovBadge
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
export function ABGovEmergencyBadge({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
  ariaLabel,
}: ABGovBadgeProps): JSX.Element {
  return (
    <ABGovBadge
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
