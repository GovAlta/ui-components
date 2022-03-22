import React, { FC } from 'react';

interface WCProps {
  footerid?: string;
  url: string;
  title: string;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      'goa-meta-link': WCProps & React.HTMLAttributes<HTMLElement>
    }
  }
}

interface Props {
  footerId?: string;
  url: string;
  title: string;
}

export const GoAMetaLink: FC<Props> = ({ footerId, url, title, children }) => {
  return (
    <goa-meta-link
      footerid={footerId}
      url={url}
      title={title}
    >
      { children }
    </goa-meta-link>
  )
}

export default GoAMetaLink;
