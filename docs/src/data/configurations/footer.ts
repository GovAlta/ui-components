/**
 * Footer Component Configurations
 *
 * Footer provides page-level footer navigation.
 */

import type { ComponentConfigurations } from './types';

export const footerConfigurations: ComponentConfigurations = {
  componentSlug: 'footer',
  componentName: 'Footer',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic footer',
      description: 'Simple page footer',
      code: {
        react: `<GoabFooter />`,
        angular: `<goab-footer></goab-footer>`,
        webComponents: `<goa-footer></goa-footer>`,
      },
    },
    {
      id: 'with-nav-sections',
      name: 'With navigation',
      description: 'Footer with navigation sections',
      code: {
        react: `<GoabFooter>
  <GoabFooterNavSection heading="Services">
    <a href="/apply">Apply online</a>
    <a href="/renew">Renew</a>
    <a href="/status">Check status</a>
  </GoabFooterNavSection>
  <GoabFooterNavSection heading="Contact">
    <a href="/help">Help center</a>
    <a href="/feedback">Feedback</a>
  </GoabFooterNavSection>
</GoabFooter>`,
        angular: `<goab-footer>
  <goab-footer-nav-section heading="Services">
    <a href="/apply">Apply online</a>
    <a href="/renew">Renew</a>
    <a href="/status">Check status</a>
  </goab-footer-nav-section>
  <goab-footer-nav-section heading="Contact">
    <a href="/help">Help center</a>
    <a href="/feedback">Feedback</a>
  </goab-footer-nav-section>
</goab-footer>`,
        webComponents: `<goa-footer>
  <goa-footer-nav-section heading="Services">
    <a href="/apply">Apply online</a>
    <a href="/renew">Renew</a>
    <a href="/status">Check status</a>
  </goa-footer-nav-section>
  <goa-footer-nav-section heading="Contact">
    <a href="/help">Help center</a>
    <a href="/feedback">Feedback</a>
  </goa-footer-nav-section>
</goa-footer>`,
      },
    },
    {
      id: 'with-meta',
      name: 'With meta section',
      description: 'Footer with copyright and links',
      code: {
        react: `<GoabFooter>
  <GoabFooterMetaSection>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms of use</a>
    <a href="/accessibility">Accessibility</a>
  </GoabFooterMetaSection>
</GoabFooter>`,
        angular: `<goab-footer>
  <goab-footer-meta-section>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms of use</a>
    <a href="/accessibility">Accessibility</a>
  </goab-footer-meta-section>
</goab-footer>`,
        webComponents: `<goa-footer>
  <goa-footer-meta-section>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms of use</a>
    <a href="/accessibility">Accessibility</a>
  </goa-footer-meta-section>
</goa-footer>`,
      },
    },
  ],
};
