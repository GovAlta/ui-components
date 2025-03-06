import type { JSX } from "react";
export type GoabHeroBannerActionsType = {
  children?: React.ReactNode;
};

export function GoabHeroBannerActions({
  children,
}: GoabHeroBannerActionsType): JSX.Element {
  return <div slot="actions">{children}</div>;
}

export default GoabHeroBannerActions;
