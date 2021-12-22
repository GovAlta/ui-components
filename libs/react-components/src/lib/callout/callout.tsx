import React from 'react';

type CalloutType = "important" | 'information' | 'event' | 'success' | 'emergency';

interface WCProps {
  title: string;
  type: CalloutType;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-callout': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}


export interface CalloutProps {
  title?: string,
  type?: CalloutType,
  children?: React.ReactNode,
}

export const GoACallout = ({ title, type = "information", children }: CalloutProps) => {
  return (
    <goa-callout title={title} type={type}>
      {children}
    </goa-callout>
  );
};

export default GoACallout;
