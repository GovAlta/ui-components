import React, { FC } from 'react';

export type GoAHeroBannerContentType = FC;
export const GoAHeroBannerContent: GoAHeroBannerContentType = ({ children }) => {
  return (
    <div slot="content">
      {children}
    </div>
  );
};

export default GoAHeroBannerContent;
