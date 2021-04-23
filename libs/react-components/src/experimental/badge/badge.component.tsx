import React, { FC, ReactNode } from 'react';
import classnames from 'classnames';
import styles from './badge.module.scss';

interface GoABadgeProps {
  type: 'information' | 'success' | 'warning' | 'emergency' |
  'dark' | 'midtone' | 'light' |
  'inactive'
  icon?: ReactNode
  content?: string
}

export const GoABadge: FC<GoABadgeProps> = ({ type, content, icon }: GoABadgeProps) => {

  return (
    <div className={classnames(styles['goa-badge'], styles[`badge-${type}`])}>
      {icon}
      <span className={classnames(styles['goa-badge-content'])}>{content}</span>
    </div>
  )
}

GoABadge.defaultProps = {
  type: 'information'
}
