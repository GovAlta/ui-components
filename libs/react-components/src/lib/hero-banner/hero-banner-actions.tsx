import React, { FC } from 'react';

export type GoAHeroBannerActionsType = FC;

export const GoAHeroBannerActions: GoAHeroBannerActionsType = ({ children }) => {
  return (
    <div slot="actions">
      {children}
    </div>
  );
};

export default GoAHeroBannerActions;
