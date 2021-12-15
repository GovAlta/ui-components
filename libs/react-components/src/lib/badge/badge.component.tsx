import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './badge.module.scss';
import { GoAIcon, GoAIconType } from '../../experimental/icons';

export type GoABadgeType
  = 'information'
  | 'success'
  | 'warning'
  | 'emergency'
  | 'dark'
  | 'midtone'
  | 'light'
  | 'inactive'
  ;

interface GoABadgeProps {
  type: GoABadgeType;
  icon?: GoAIconType;
  content?: string;
  testId?: string;
}

export const GoABadge: FC<GoABadgeProps> = ({ type, content, icon, testId }: GoABadgeProps) => {
  return (
    <div data-testid={testId} className={classnames(styles['goa-badge'], styles[`badge-${type}`])}>
      {icon && <GoAIcon type={icon} />}
      <div className={classnames(styles['goa-badge-content'])}>{content}</div>
    </div>
  )
}

export const GoAInfoBadge: FC<GoABadgeProps> = ({ content, testId }: GoABadgeProps) => {
  return (
    <div data-testid={testId} className={classnames(styles['goa-badge'], styles[`badge-information`])}>
      <GoAIcon type="information-circle" />
      <div className={classnames(styles['goa-badge-content'])}>{content}</div>
    </div>
  )
}

export const GoASuccessBadge: FC<GoABadgeProps> = ({ content, testId }: GoABadgeProps) => {
  return (
    <div data-testid={testId} className={classnames(styles['goa-badge'], styles[`badge-success`])}>
      <GoAIcon type="checkmark-circle" />
      <div className={classnames(styles['goa-badge-content'])}>{content}</div>
    </div>
  )
}

export const GoAWarningBadge: FC<GoABadgeProps> = ({ content, testId }: GoABadgeProps) => {
  return (
    <div data-testid={testId} className={classnames(styles['goa-badge'], styles[`badge-warning`])}>
      <GoAIcon type="warning" />
      <div className={classnames(styles['goa-badge-content'])}>{content}</div>
    </div>
  )
}

export const GoAEmergencyBadge: FC<GoABadgeProps> = ({ content, testId }: GoABadgeProps) => {
  return (
    <div data-testid={testId} className={classnames(styles['goa-badge'], styles[`badge-emergency`])}>
      <GoAIcon type="alert-circle" />
      <div className={classnames(styles['goa-badge-content'])}>{content}</div>
    </div>
  )
}
