import type { JSX } from "react";
export type GoabHeroBannerActionsType = {
  /** Content rendered inside the hero banner actions slot, typically buttons or links. */
  children?: React.ReactNode;
};

/** Displays action content in the hero banner actions area. */
export function GoabHeroBannerActions({
  children,
}: GoabHeroBannerActionsType): JSX.Element {
  return <div slot="actions">{children}</div>;
}

export default GoabHeroBannerActions;
