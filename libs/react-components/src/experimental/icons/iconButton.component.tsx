import React from 'react'
import { TestProps } from '../common'
import { GoAIcon, IconSize, GoAIconType, IconVariant } from './icon.component';
import './icons.css'

interface Props extends TestProps {
  type: GoAIconType,
  size?: IconSize;
  variant?: IconVariant;
  title?: string;
  onClick: () => void;
}

export function GoAIconButton({ type, variant = 'goa', onClick, size = 'small', title, testId }: Props & TestProps): JSX.Element {
  return (
    <div title={title} className={`goa-icon-button goa-icon-button-${variant}`} data-testid={testId} onClick={onClick}>
      <GoAIcon type={type} size={size}></GoAIcon>
    </div>
  )
}
