import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './badge.module.scss';

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
  type: GoABadgeType
  icon?: ReactNode
  content?: string
  testId?: string
}

export const GoABadge: FC<GoABadgeProps> = ({ type, content, icon, testId }: GoABadgeProps) => {

  return (
    <div data-testid={testId} className={classnames(styles['goa-badge'], styles[`badge-${type}`])}>
      {icon}
      <div className={classnames(styles['goa-badge-content'])}>{content}</div>
    </div>
  )
}

GoABadge.defaultProps = {
  type: 'information'
}
