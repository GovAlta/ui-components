import React, { FC } from 'react';

interface WCProps {
  title: string;
  backgroundurl: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-hero-banner': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  title: string;
  backgroundUrl: string;
}

export const GoAHeroBanner: FC<Props> = ({ title, backgroundUrl, children}) => {
  return (
    <goa-hero-banner title={title} backgroundurl={backgroundUrl}>
      {children}
    </goa-hero-banner>
  );
};

export default GoAHeroBanner;
