export type ABGovHeroBannerActionsType = {
  children?: React.ReactNode;
};

export function ABGovHeroBannerActions({
  children,
}: ABGovHeroBannerActionsType): JSX.Element {
  return <div slot="actions">{children}</div>;
}

export default ABGovHeroBannerActions;
