export type GoAHeroBannerActionsType = {
  children?: React.ReactNode;
};

export function GoAHeroBannerActions({
  children,
}: GoAHeroBannerActionsType): JSX.Element {
  return <div slot="actions">{children}</div>;
}

export default GoAHeroBannerActions;
