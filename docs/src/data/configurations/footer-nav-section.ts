/**
 * FooterNavSection Component Configurations
 *
 * FooterNavSection is a child component of Footer.
 */

import type { ComponentConfigurations } from "./types";

export const footerNavSectionConfigurations: ComponentConfigurations = {
  componentSlug: "footer-nav-section",
  componentName: "Footer nav section",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic footer nav section",
      description: "Navigation section within Footer",
      code: {
        react: `<GoabAppFooter>
  <GoabAppFooterNavSection heading="Services">
    <a href="/apply">Apply online</a>
    <a href="/renew">Renew</a>
    <a href="/check-status">Check status</a>
  </GoabAppFooterNavSection>
</GoabAppFooter>`,
        angular: `<goab-app-footer>
  <goab-app-footer-nav-section slot="nav" heading="Services">
    <a href="/apply">Apply online</a>
    <a href="/renew">Renew</a>
    <a href="/check-status">Check status</a>
  </goab-app-footer-nav-section>
</goab-app-footer>`,
        webComponents: `<goa-app-footer version="2">
  <goa-app-footer-nav-section slot="nav" heading="Services">
    <a href="/apply">Apply online</a>
    <a href="/renew">Renew</a>
    <a href="/check-status">Check status</a>
  </goa-app-footer-nav-section>
</goa-app-footer>`,
      },
    },
    {
      id: "multi-column",
      name: "Multi-column layout",
      description: "Navigation links in multiple columns",
      code: {
        react: `<GoabAppFooter>
  <GoabAppFooterNavSection heading="All services" maxColumnCount={3}>
    <a href="/health">Health</a>
    <a href="/education">Education</a>
    <a href="/jobs">Jobs and employment</a>
    <a href="/housing">Housing</a>
    <a href="/transportation">Transportation</a>
    <a href="/environment">Environment</a>
    <a href="/business">Business</a>
    <a href="/taxes">Taxes and finance</a>
    <a href="/legal">Legal services</a>
  </GoabAppFooterNavSection>
</GoabAppFooter>`,
        angular: `<goab-app-footer>
  <goab-app-footer-nav-section slot="nav" heading="All services" [maxColumnCount]="3">
    <a href="/health">Health</a>
    <a href="/education">Education</a>
    <a href="/jobs">Jobs and employment</a>
    <a href="/housing">Housing</a>
    <a href="/transportation">Transportation</a>
    <a href="/environment">Environment</a>
    <a href="/business">Business</a>
    <a href="/taxes">Taxes and finance</a>
    <a href="/legal">Legal services</a>
  </goab-app-footer-nav-section>
</goab-app-footer>`,
        webComponents: `<goa-app-footer version="2">
  <goa-app-footer-nav-section slot="nav" heading="All services" maxcolumncount="3">
    <a href="/health">Health</a>
    <a href="/education">Education</a>
    <a href="/jobs">Jobs and employment</a>
    <a href="/housing">Housing</a>
    <a href="/transportation">Transportation</a>
    <a href="/environment">Environment</a>
    <a href="/business">Business</a>
    <a href="/taxes">Taxes and finance</a>
    <a href="/legal">Legal services</a>
  </goa-app-footer-nav-section>
</goa-app-footer>`,
      },
    },
  ],
};
