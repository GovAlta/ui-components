import React, { FC } from 'react';
import { GoAIconType } from '../icons';

// import type { BadgeType } from '@abgov/shared/common';

// TODO: move types like this into a shared file
// export type BadgeType;
export type GoABadgeType
  = 'information'
  | 'success'
  | 'important'
  | 'emergency'
  | 'dark'
  | 'midtone'
  | 'light'
  ;

interface GoABadgeProps {
  type: GoABadgeType;
  icon?: GoAIconType;
  content?: string;
  testId?: string;
}

interface WCProps {
  type: GoABadgeType;
  icon?: GoAIconType;
  content?: string;
  testid?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface IntrinsicElements {
      'goa-badge': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

export const GoABadge: FC<GoABadgeProps> = ({ type, content, icon, testId }: GoABadgeProps) => {
  return (
    <goa-badge type={type} content={content} icon={icon} testid={testId} />
  )
}

export const GoAInfoBadge: FC<GoABadgeProps> = ({ content, testId }: GoABadgeProps) => {
  return (
    <GoABadge type="information" icon="information-circle" content={content} testId={testId} />
  )
}

export const GoASuccessBadge: FC<GoABadgeProps> = ({ content, testId }: GoABadgeProps) => {
  return (
    <GoABadge type="success" icon="checkmark-circle" content={content} testId={testId} />
  )
}

export const GoAWarningBadge: FC<GoABadgeProps> = ({ content, testId }: GoABadgeProps) => {
  return (
    <GoABadge type="important" icon="warning" content={content} testId={testId} />
  )
}

export const GoAEmergencyBadge: FC<GoABadgeProps> = ({ content, testId }: GoABadgeProps) => {
  return (
    <GoABadge type="emergency" icon="alert-circle" content={content} testId={testId} />
  )
}
