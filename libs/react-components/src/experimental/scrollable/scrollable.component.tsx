import React, { CSSProperties, ReactElement, ReactNode } from 'react';
import './scrollable.css';

interface Props {
  vertical?: boolean;
  horizontal?: boolean;
  hPadding?: number;
  vPadding?: number;
  height?: number;
}

export function GoAScrollable({
  vertical,
  horizontal,
  hPadding,
  vPadding,
  height,
  children,
}: Props & { children: ReactNode }): ReactElement {
  const style: CSSProperties = {
    overflowY: vertical ? 'auto' : 'hidden',
    overflowX: horizontal ? 'auto' : 'hidden',
    height: height ?? '100%',
    padding: `${vPadding ?? 0}rem ${hPadding ?? 0}rem`,
  };
  return (
    <div className='goa-scrollable'>
      <div style={style}>{children}</div>
    </div>
  );
}

export default GoAScrollable;
