import type { JSX } from "react";
export type GoabHeroBannerActionsType = {
  /** Content rendered inside the hero banner actions slot, typically buttons or links. */
  children?: React.ReactNode;
};

export function GoabHeroBannerActions({
  children,
}: GoabHeroBannerActionsType): JSX.Element {
  return <div slot="actions">{children}</div>;
}

export default GoabHeroBannerActions;
