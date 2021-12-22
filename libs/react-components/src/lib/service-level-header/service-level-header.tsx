import React, { FC } from 'react';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-service-level-header': WebComponentProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

export type ServiceLevel = 'alpha' | 'beta' | 'live'

interface WebComponentProps {
  level: ServiceLevel;
}

export interface HeaderProps {
  level: ServiceLevel,
}

export const GoAServiceLevelHeader: FC<HeaderProps> = ({ level}) => {
  return (
    <goa-service-level-header level={level} />
  )
};

export default GoAServiceLevelHeader;
