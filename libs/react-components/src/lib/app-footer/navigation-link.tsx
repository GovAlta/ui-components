import React, { FC } from 'react';

interface WCProps {
  footerid?: string;
  url: string;
  title: string;
  section?: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-navigation-link': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  footerId?: string;
  url: string;
  title: string;
  section?: string;
}

export const GoANavigationLink: FC<Props> = ({ footerId, url, title, section, children }) => {
  return (
    <goa-navigation-link
      footerid={footerId}
      url={url}
      title={title}
      section={section}
    >
      { children }
    </goa-navigation-link>
  )
}

export default GoANavigationLink;
