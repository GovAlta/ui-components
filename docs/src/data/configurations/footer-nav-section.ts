/**
 * FooterNavSection Component Configurations
 *
 * FooterNavSection is a child component of Footer.
 */

import type { ComponentConfigurations } from './types';

export const footerNavSectionConfigurations: ComponentConfigurations = {
  componentSlug: 'footer-nav-section',
  componentName: 'Footer nav section',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic footer nav section',
      description: 'Navigation section within Footer',
      code: {
        react: `<GoabAppFooter>
  <GoabAppFooterNavSection heading="Services">
    <a href="/apply">Apply online</a>
    <a href="/renew">Renew</a>
    <a href="/check-status">Check status</a>
  </GoabAppFooterNavSection>
</GoabAppFooter>`,
        angular: `<goab-footer>
  <goab-footer-nav-section heading="Services">
    <a href="/apply">Apply online</a>
    <a href="/renew">Renew</a>
    <a href="/check-status">Check status</a>
  </goab-footer-nav-section>
</goab-footer>`,
        webComponents: `<goa-footer>
  <goa-footer-nav-section heading="Services">
    <a href="/apply">Apply online</a>
    <a href="/renew">Renew</a>
    <a href="/check-status">Check status</a>
  </goa-footer-nav-section>
</goa-footer>`,
      },
    },
  ],
};
