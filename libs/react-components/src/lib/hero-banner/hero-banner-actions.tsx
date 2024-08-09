export type GoABHeroBannerActionsType = {
  children?: React.ReactNode;
};

export function GoABHeroBannerActions({
  children,
}: GoABHeroBannerActionsType): JSX.Element {
  return <div slot="actions">{children}</div>;
}

export default GoABHeroBannerActions;
