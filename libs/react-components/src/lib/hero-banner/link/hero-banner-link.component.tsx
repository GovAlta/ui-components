import React, { FC, Fragment } from 'react';
import './hero-banner-link.component.scss';

interface Props {
  linkText: string;
  linkUrl: string;
}

export const GoAHeroBannerLink: FC<Props> = ({ linkText, linkUrl }) => {
  return linkText && linkUrl ? (
    <div>
      <a className="goa-link-button right-arrow" href={linkUrl} role="link">
        {linkText}
      </a>
    </div>
    ) : <Fragment></Fragment>
  ;
};
