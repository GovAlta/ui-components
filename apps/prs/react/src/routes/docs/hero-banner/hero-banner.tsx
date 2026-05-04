import {
  GoabButton,
  GoabButtonGroup,
  GoabHeroBanner,
  GoabHeroBannerActions,
} from "@abgov/react-components";

export function DocsHeroBannerRoute() {
  return (
    <div>
      <h2>Hero Banner</h2>

      <h3>Basic hero banner</h3>
      <GoabHeroBanner heading="Start your application">
        <p>Apply for government services quickly and easily online.</p>
        <GoabButtonGroup alignment="start" mt="l">
          <GoabButton>Get started</GoabButton>
          <GoabButton type="secondary">Learn more</GoabButton>
        </GoabButtonGroup>
      </GoabHeroBanner>

      <h3>With background image</h3>
      <GoabHeroBanner
        heading="Explore Alberta"
        backgroundUrl="/images/alberta-landscape.jpg"
      />

      <h3>Background color</h3>
      <GoabHeroBanner
        heading="Community services"
        backgroundColor="#1a3d5c"
        textColor="#ffffff"
      >
        <p>Find resources and support in your community.</p>
      </GoabHeroBanner>

      <h3>Custom height</h3>
      <GoabHeroBanner
        heading="Full viewport hero"
        minHeight="400px"
        backgroundUrl="/images/hero-bg.jpg"
      >
        <p>Large hero for landing pages.</p>
      </GoabHeroBanner>

      <h2>Examples</h2>

      <h3>Hero banner with actions</h3>
      <GoabHeroBanner heading="Supporting Businesses">
        Resources are available to help Alberta entrepreneurs and small businesses
        start, grow and succeed.
        <GoabHeroBannerActions>
          <GoabButton type="start" onClick={() => console.log("Call to action clicked")}>
            Call to action
          </GoabButton>
        </GoabHeroBannerActions>
      </GoabHeroBanner>
    </div>
  );
}
