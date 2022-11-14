import React, { FC } from "react";
import { Margins } from "../../common/styling";

export type GoABadgeType =
  | "information"
  | "success"
  | "important"
  | "emergency"
  | "dark"
  | "midtone"
  | "light";

interface GoABadgeProps extends Margins {
  type: GoABadgeType;
  icon?: boolean;
  content?: string;
  testId?: string;
}

interface WCProps extends Margins {
  type: GoABadgeType;
  icon?: boolean;
  content?: string;
  testid?: string;
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

export const GoABadge: FC<GoABadgeProps> = ({
  type,
  content,
  icon,
  testId,
  mt,
  mr,
  mb,
  ml,
}: GoABadgeProps) => {
  return (
    <goa-badge
      type={type}
      content={content}
      icon={icon}
      testid={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
};

/**
 * @deprecated
 */
export const GoAInfoBadge: FC<GoABadgeProps> = ({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
}: GoABadgeProps) => {
  return (
    <GoABadge
      type="information"
      icon={icon}
      content={content}
      testId={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
};

/**
 * @deprecated
 */
export const GoASuccessBadge: FC<GoABadgeProps> = ({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
}: GoABadgeProps) => {
  return (
    <GoABadge
      type="success"
      icon={icon}
      content={content}
      testId={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
};

/**
 * @deprecated
 */
export const GoAImportantBadge: FC<GoABadgeProps> = ({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
}: GoABadgeProps) => {
  return (
    <GoABadge
      type="important"
      icon={icon}
      content={content}
      testId={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
};

/**
 * @deprecated
 */
export const GoAEmergencyBadge: FC<GoABadgeProps> = ({
  content,
  testId,
  icon,
  mt,
  mr,
  mb,
  ml,
}: GoABadgeProps) => {
  return (
    <GoABadge
      type="emergency"
      icon={icon}
      content={content}
      testId={testId}
      mt={mt}
      mr={mr}
      mb={mb}
      ml={ml}
    />
  );
};
