import { url } from 'inspector';
import React, { FC, Fragment } from 'react';
import { GoAHeroBannerContent } from './content/hero-banner-content.component';
import { GoAHeroBannerLink } from './link/hero-banner-link.component';
import './hero-banner.component.scss';

interface Props {
  title: string;
  backgroundUrl: string;
  content?: string;
  linkText?: string;
  linkUrl?: string;
}

export const GoAHeroBanner: FC<Props> = ({
  title,
  backgroundUrl,
  content,
  linkText,
  linkUrl,
  children,
}) => {
  return (
    <Fragment>
      <div
        className="goa-hero"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.40) 40%, rgba(0, 0, 0, 0.6) 100%), url('${backgroundUrl}')`,
        }}
      >
        <h1 role="heading" aria-level={1}>{title}</h1>
        {children || (
          <Fragment>
            { content &&
              <GoAHeroBannerContent content={content}></GoAHeroBannerContent> }
            { linkText && linkUrl &&
              <GoAHeroBannerLink linkText={linkText} linkUrl={linkUrl} /> }
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

GoAHeroBanner.defaultProps = {
  content: '',
  linkText: '',
  linkUrl: '',
};

export default GoAHeroBanner;
