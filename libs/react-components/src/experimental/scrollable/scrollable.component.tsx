import React, { CSSProperties, FC } from 'react';
import { TestProps } from '../common';
import './scrollable.css';

interface Props {
  vertical?: boolean;
  horizontal?: boolean;
  hPadding?: number;
  vPadding?: number;
  height?: number;
}

export const GoAScrollable: FC<Props & TestProps> = ({
  vertical,
  horizontal,
  hPadding,
  vPadding,
  height,
  children,
  testId,
}) => {
  const style: CSSProperties = {
    overflowY: vertical ? 'auto' : 'hidden',
    overflowX: horizontal ? 'auto' : 'hidden',
    maxHeight: height ?? '100%',
    padding: `${vPadding ?? 0}rem ${hPadding ?? 0}rem`,
  };
  return (
    <div className='goa-scrollable'>
      <div style={style} data-testid={testId}>{children}</div>
    </div>
  );
}

export default GoAScrollable;
