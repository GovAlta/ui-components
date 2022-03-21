import React, { FC } from 'react';

interface WCProps {
  title: string;
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
  title: string;
  url?: string;
}

export const GoAAppHeader: FC<Props> = ({ title, url, children }) => {
  return (
    <goa-app-header title={title} url={url}>
      { children }
    </goa-app-header>
  )
}

export default GoAAppHeader;
