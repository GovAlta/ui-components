import React, { FC, ReactNode } from 'react';
import '../../theme.scss';
import './badge.scss';

interface GoABadgeProps {
  type: 'information' | 'success' | 'warning' | 'emergency' |
  'dark' | 'midtone' | 'light' |
  'inactive'
  icon?: ReactNode
  content?: string
}

export const GoABadge: FC<GoABadgeProps> = ({ type, content, icon }: GoABadgeProps) => {

  return (
    <div className={`goa-badge badge-${type}`}>
      {icon}
      <span className="goa-badge-content">{content}</span>
    </div>
  )
}

GoABadge.defaultProps = {
  type: 'information'
}
