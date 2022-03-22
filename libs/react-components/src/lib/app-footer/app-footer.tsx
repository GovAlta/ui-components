/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import React, { FC } from 'react';

interface WCProps {
  id?: string;
  appurl?: string;
  title?: string;
  copyrighturl?: string;
  copyrighttext?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-app-footer': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  id?: string;
  appUrl?: string;
  title?: string;
  copyrightUrl?: string;
  copyrightText?: string;
}

export const GoAAppFooter: FC<Props> = ({ id, appUrl, title, copyrightUrl, copyrightText, children }) => {
  return (
    <goa-app-footer
      id={id}
      appurl={appUrl}
      title={title}
      copyrighturl={copyrightUrl}
      copyrighttext={copyrightText}
    >
      {children}
    </goa-app-footer>
  )
}

export default GoAAppFooter;
