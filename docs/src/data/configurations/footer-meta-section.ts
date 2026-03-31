/**
 * FooterMetaSection Component Configurations
 *
 * FooterMetaSection is a child component of Footer.
 */

import type { ComponentConfigurations } from './types';

export const footerMetaSectionConfigurations: ComponentConfigurations = {
  componentSlug: 'footer-meta-section',
  componentName: 'Footer meta section',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic footer meta section',
      description: 'Meta links section within Footer',
      code: {
        react: `<GoabAppFooter>
  <GoabAppFooterMetaSection>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms of use</a>
    <a href="/accessibility">Accessibility</a>
  </GoabAppFooterMetaSection>
</GoabAppFooter>`,
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
