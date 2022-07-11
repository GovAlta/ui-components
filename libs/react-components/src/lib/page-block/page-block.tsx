import React, { FC, ReactNode } from 'react';

export interface WCPageBlockProps {
  width: "full" | string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-page-block': WCPageBlockProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

export interface PageBlockProps {
  width: "full" | string;
  children: ReactNode;
}

export const GoAPageBlock: FC<PageBlockProps> = (props) => {
  return (
    <goa-page-block width={props.width}>
      {props.children}
    </goa-page-block>
  )
}

