import React, { CSSProperties } from 'react'
import { TestProps } from '../common'
import './icons.css'

type IconType = 'close'

const Icons: Record<IconType, JSX.Element> = {
  close: <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Close</title><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 368L144 144M368 144L144 368' /></svg>,
}

type IconSize = 'small' | 'medium' | 'large'

interface Props extends TestProps {
  type: IconType,
  onClick: () => void;
  size?: IconSize;
  variant?: 'circular' | 'goa';
}

export function GoAIcon({ type, variant = 'goa', onClick, size = 'small' }: Props): JSX.Element {
  const pxSize = getSize(size);
  const styles: CSSProperties = {
    width: `${pxSize}px`,
    height: `${pxSize}px`,
  }
  return (
    <div className={`icon-${variant}`} style={styles} data-testid={`icon-${type}`} onClick={onClick}>{Icons[type]}</div>
  )
}

function getSize(size: IconSize): number {
  switch (size) {
    case 'small':
      return 24
    case 'medium':
      return 32
    case 'large':
      return 48
  }
}
