/**
 * HeroBanner Component Configurations
 *
 * Hero banners display prominent page headers.
 */

import type { ComponentConfigurations } from './types';

export const heroBannerConfigurations: ComponentConfigurations = {
  componentSlug: 'hero-banner',
  componentName: 'Hero banner',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic hero banner',
      description: 'Simple page header banner',
      code: {
        react: `<GoabHeroBanner heading="Welcome to Alberta Services" />`,
        angular: `<goab-hero-banner heading="Welcome to Alberta Services"></goab-hero-banner>`,
        webComponents: `<goa-hero-banner heading="Welcome to Alberta Services"></goa-hero-banner>`,
      },
    },
    {
      id: 'with-background',
      name: 'With background image',
      description: 'Hero banner with image background',
      code: {
        react: `<GoabHeroBanner
  heading="Explore Alberta"
  backgroundUrl="/images/alberta-landscape.jpg"
/>`,
        angular: `<goab-hero-banner
  heading="Explore Alberta"
  backgroundUrl="/images/alberta-landscape.jpg">
</goab-hero-banner>`,
        webComponents: `<goa-hero-banner
  heading="Explore Alberta"
  backgroundurl="/images/alberta-landscape.jpg">
</goa-hero-banner>`,
      },
    },
    {
      id: 'with-content',
      name: 'With content',
      description: 'Hero banner with description and actions',
      code: {
        react: `<GoabHeroBanner heading="Start your application">
  <p>Apply for government services quickly and easily online.</p>
  <GoabButtonGroup mt="l">
    <GoabButton>Get started</GoabButton>
    <GoabButton type="secondary">Learn more</GoabButton>
  </GoabButtonGroup>
</GoabHeroBanner>`,
        angular: `<goab-hero-banner heading="Start your application">
  <p>Apply for government services quickly and easily online.</p>
  <goab-button-group mt="l">
    <goab-button>Get started</goab-button>
    <goab-button type="secondary">Learn more</goab-button>
  </goab-button-group>
</goab-hero-banner>`,
        webComponents: `<goa-hero-banner heading="Start your application">
  <p>Apply for government services quickly and easily online.</p>
  <goa-button-group mt="l">
    <goa-button version="2">Get started</goa-button>
    <goa-button version="2" type="secondary">Learn more</goa-button>
  </goa-button-group>
</goa-hero-banner>`,
      },
    },
    {
      id: 'min-height',
      name: 'Custom height',
      description: 'Hero banner with minimum height',
      code: {
        react: `<GoabHeroBanner
  heading="Full viewport hero"
  minHeight="400px"
  backgroundUrl="/images/hero-bg.jpg"
>
  <p>Large hero for landing pages.</p>
</GoabHeroBanner>`,
        angular: `<goab-hero-banner
  heading="Full viewport hero"
  minHeight="400px"
  backgroundUrl="/images/hero-bg.jpg">
  <p>Large hero for landing pages.</p>
</goab-hero-banner>`,
        webComponents: `<goa-hero-banner
  heading="Full viewport hero"
  minheight="400px"
  backgroundurl="/images/hero-bg.jpg">
  <p>Large hero for landing pages.</p>
</goa-hero-banner>`,
      },
    },
  ],
};
