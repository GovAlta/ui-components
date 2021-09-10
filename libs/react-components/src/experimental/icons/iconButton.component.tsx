import React from 'react'
import { TestProps } from '../common'
import { GoAIcon, IconSize, IconType, IconVariant } from './icon.component';
import './icons.css'

interface Props extends TestProps {
  type: IconType,
  size?: IconSize;
  variant?: IconVariant;
  onClick: () => void;
}

export function GoAIconButton({ type, variant = 'goa', onClick, size = 'small', testId }: Props & TestProps): JSX.Element {
  return (
    <div className={`goa-icon-button goa-icon-button-${variant}`} data-testid={testId} onClick={onClick}>
      <GoAIcon type={type} size={size}></GoAIcon>
    </div>
  )
}
