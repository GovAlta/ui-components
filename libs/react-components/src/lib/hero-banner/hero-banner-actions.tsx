import React, { FC } from "react";

export type GoAHeroBannerActionsType = {
  children?: React.ReactNode;
};

export const GoAHeroBannerActions: FC<GoAHeroBannerActionsType> = ({
  children,
}) => {
  return <div slot="actions">{children}</div>;
};

export default GoAHeroBannerActions;
