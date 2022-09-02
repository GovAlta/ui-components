import React, { FC } from 'react';

interface WCProps {
  heading?: string;
  url?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-app-header': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  heading?: string;
  url?: string;
  children?: React.ReactNode;
}

export const GoAAppHeader: FC<Props> = ({ heading, url, children }) => {
  return (
    <goa-app-header heading={heading} url={url}>
      {children}
    </goa-app-header>
  )
}

export default GoAAppHeader;
