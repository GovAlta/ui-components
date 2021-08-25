import React from 'react'

interface Props {
  onClick: () => void;
  size?: number;
  className?: string;
}

export function GoACloseIcon({ className, onClick, size = 24 }: Props): JSX.Element {
  return (
    <svg className={className} data-testid='icon-close' width={size} height={size} onClick={onClick} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><title>Close</title><path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M368 368L144 144M368 144L144 368' /></svg>
  )
}
