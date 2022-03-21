import React, { FC } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-page-block': React.HTMLAttributes<HTMLElement>
    }
  }
}

export const GoAPageBlock: FC = ({ children }) => {
  return (
    <goa-page-block>
      {children}
    </goa-page-block>
  )
}
