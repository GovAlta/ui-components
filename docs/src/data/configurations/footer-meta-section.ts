/**
 * FooterMetaSection Component Configurations
 *
 * FooterMetaSection is a child component of Footer.
 */

import type { ComponentConfigurations } from "./types";

export const footerMetaSectionConfigurations: ComponentConfigurations = {
  componentSlug: "footer-meta-section",
  componentName: "Footer meta section",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic footer meta section",
      description: "Meta links section within Footer",
      code: {
        react: `<GoabAppFooter>
  <GoabAppFooterMetaSection>
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms of use</a>
    <a href="/accessibility">Accessibility</a>
  </GoabAppFooterMetaSection>
</GoabAppFooter>`,
        angular: `<goab-app-footer>
  <goab-app-footer-meta-section slot="meta">
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms of use</a>
    <a href="/accessibility">Accessibility</a>
  </goab-app-footer-meta-section>
</goab-app-footer>`,
        webComponents: `<goa-app-footer version="2">
  <goa-app-footer-meta-section slot="meta">
    <a href="/privacy">Privacy</a>
    <a href="/terms">Terms of use</a>
    <a href="/accessibility">Accessibility</a>
  </goa-app-footer-meta-section>
</goa-app-footer>`,
      },
    },
  ],
};
