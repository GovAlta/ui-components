import React from 'react'
import { TestProps } from '../common'
import { GoAIcon, IconSize, GoAIconType, IconVariant } from './icon.component';
import './icons.scss'

interface Props extends TestProps {
  type: GoAIconType,
  size?: IconSize;
  variant?: IconVariant;
  title?: string;
  disabled?: boolean;
  onClick: () => void;
}

export function GoAIconButton({ type, disabled, variant = 'primary', onClick, size = 'medium', title, testId }: Props & TestProps): JSX.Element {
  return (
    <button title={title} disabled={disabled} className={`goa-icon-button goa-icon-button-${variant}`} data-testid={testId} onClick={onClick}>
      <GoAIcon type={type} size={size}></GoAIcon>
    </button>
  )
}
