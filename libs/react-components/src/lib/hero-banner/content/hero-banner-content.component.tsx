import React, { FC, Fragment } from 'react';
import './hero-banner-content.component.scss';

interface Props {
  content: string;
}

export const GoAHeroBannerContent: FC<Props> = ({ content, children }) => {
  return (
    <p className="goa-hero-banner-content" role="note">
      {children || content}
    </p>
  );
};
