import {
  GoabButton,
  GoabHeroBanner,
  GoabHeroBannerActions,
} from "@abgov/react-components";

export function HeroBannerWithActions() {
  function handleClick() {
    console.log("Call to action clicked");
  }

  return (
    <GoabHeroBanner heading="Supporting Businesses">
      Resources are available to help Alberta entrepreneurs and small businesses
      start, grow and succeed.
      <GoabHeroBannerActions>
        <GoabButton type="start" onClick={handleClick}>
          Call to action
        </GoabButton>
      </GoabHeroBannerActions>
    </GoabHeroBanner>
  );
}
