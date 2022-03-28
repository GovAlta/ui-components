import React, { FC } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-microsite-header': WebComponentProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

export type ServiceLevel = 'alpha' | 'beta' | 'live'

interface WebComponentProps {
  level: ServiceLevel;
  version?: string;
  feedbackurl?: string;
}

export interface HeaderProps {
  level: ServiceLevel;
  version?: string;
  feedbackUrl?: string;
}

export const GoAMicrositeHeader: FC<HeaderProps> = ({ level, version, feedbackUrl }) => {
  return (
    <goa-microsite-header level={level} version={version} feedbackurl={feedbackUrl} />
  )
};

export default GoAMicrositeHeader;
