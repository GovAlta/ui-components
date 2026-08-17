/**
 * Footer Component Configurations
 *
 * Footer provides page-level footer navigation.
 */

import type { ComponentConfigurations } from "./types";

export const footerConfigurations: ComponentConfigurations = {
  componentSlug: "footer",
  componentName: "Footer",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic footer",
      description: "Simple page footer",
      code: {
        react: `<footer>
  <GoabAppFooter />
</footer>`,
        angular: `<footer>
  <goab-app-footer></goab-app-footer>
</footer>`,
        webComponents: `<footer>
  <goa-app-footer version="2"></goa-app-footer>
</footer>`,
      },
    },
    {
      id: "with-meta",
      name: "With meta section",
      description: "Footer with copyright and links",
      code: {
        react: `<footer>
  <GoabAppFooter>
    <GoabAppFooterMetaSection>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms of use</a>
      <a href="/accessibility">Accessibility</a>
    </GoabAppFooterMetaSection>
  </GoabAppFooter>
</footer>`,
        angular: `<footer>
  <goab-app-footer>
    <goab-app-footer-meta-section slot="meta">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms of use</a>
      <a href="/accessibility">Accessibility</a>
    </goab-app-footer-meta-section>
  </goab-app-footer>
</footer>`,
        webComponents: `<footer>
  <goa-app-footer version="2">
    <goa-app-footer-meta-section slot="meta">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms of use</a>
      <a href="/accessibility">Accessibility</a>
    </goa-app-footer-meta-section>
  </goa-app-footer>
</footer>`,
      },
    },
    {
      id: "with-nav-sections",
      name: "With navigation",
      description: "Footer with navigation sections",
      code: {
        react: `<footer>
  <GoabAppFooter>
    <GoabAppFooterNavSection heading="Services">
      <a href="/apply">Apply online</a>
      <a href="/renew">Renew</a>
      <a href="/status">Check status</a>
    </GoabAppFooterNavSection>
    <GoabAppFooterNavSection heading="Contact">
      <a href="/help">Help center</a>
      <a href="/feedback">Feedback</a>
    </GoabAppFooterNavSection>
  </GoabAppFooter>
</footer>`,
        angular: `<footer>
  <goab-app-footer>
    <goab-app-footer-nav-section slot="nav" heading="Services">
      <a href="/apply">Apply online</a>
      <a href="/renew">Renew</a>
      <a href="/status">Check status</a>
    </goab-app-footer-nav-section>
    <goab-app-footer-nav-section slot="nav" heading="Contact">
      <a href="/help">Help center</a>
      <a href="/feedback">Feedback</a>
    </goab-app-footer-nav-section>
  </goab-app-footer>
</footer>`,
        webComponents: `<footer>
  <goa-app-footer version="2">
    <goa-app-footer-nav-section slot="nav" heading="Services">
      <a href="/apply">Apply online</a>
      <a href="/renew">Renew</a>
      <a href="/status">Check status</a>
    </goa-app-footer-nav-section>
    <goa-app-footer-nav-section slot="nav" heading="Contact">
      <a href="/help">Help center</a>
      <a href="/feedback">Feedback</a>
    </goa-app-footer-nav-section>
  </goa-app-footer>
</footer>`,
      },
    },
    {
      id: "full",
      name: "With meta and nav sections",
      description: "Footer with navigation and meta sections",
      code: {
        react: `<footer>
  <GoabAppFooter>
    <GoabAppFooterNavSection heading="Services">
      <a href="/apply">Apply online</a>
      <a href="/renew">Renew</a>
      <a href="/status">Check status</a>
    </GoabAppFooterNavSection>
    <GoabAppFooterNavSection heading="Contact">
      <a href="/help">Help center</a>
      <a href="/feedback">Feedback</a>
    </GoabAppFooterNavSection>
    <GoabAppFooterMetaSection>
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms of use</a>
      <a href="/accessibility">Accessibility</a>
    </GoabAppFooterMetaSection>
  </GoabAppFooter>
</footer>`,
        angular: `<footer>
  <goab-app-footer>
    <goab-app-footer-nav-section slot="nav" heading="Services">
      <a href="/apply">Apply online</a>
      <a href="/renew">Renew</a>
      <a href="/status">Check status</a>
    </goab-app-footer-nav-section>
    <goab-app-footer-nav-section slot="nav" heading="Contact">
      <a href="/help">Help center</a>
      <a href="/feedback">Feedback</a>
    </goab-app-footer-nav-section>
    <goab-app-footer-meta-section slot="meta">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms of use</a>
      <a href="/accessibility">Accessibility</a>
    </goab-app-footer-meta-section>
  </goab-app-footer>
</footer>`,
        webComponents: `<footer>
  <goa-app-footer version="2">
    <goa-app-footer-nav-section slot="nav" heading="Services">
      <a href="/apply">Apply online</a>
      <a href="/renew">Renew</a>
      <a href="/status">Check status</a>
    </goa-app-footer-nav-section>
    <goa-app-footer-nav-section slot="nav" heading="Contact">
      <a href="/help">Help center</a>
      <a href="/feedback">Feedback</a>
    </goa-app-footer-nav-section>
    <goa-app-footer-meta-section slot="meta">
      <a href="/privacy">Privacy</a>
      <a href="/terms">Terms of use</a>
      <a href="/accessibility">Accessibility</a>
    </goa-app-footer-meta-section>
  </goa-app-footer>
</footer>`,
      },
    },
    {
      id: "with-links",
      name: "With links",
      description: "Footer sections with standard links and link components",
      code: {
        react: `<footer>
  <GoabAppFooter>
    <GoabAppFooterNavSection heading="Services">
      <a href="/apply">Apply online</a>
      <GoabLink trailingIcon="open">
        <a href="https://www.alberta.ca/services">All services</a>
      </GoabLink>
    </GoabAppFooterNavSection>
    <GoabAppFooterMetaSection>
      <a href="/privacy">Privacy</a>
      <GoabLink><a href="/accessibility">Accessibility</a></GoabLink>
    </GoabAppFooterMetaSection>
  </GoabAppFooter>
</footer>`,
        angular: `<footer>
  <goab-app-footer>
    <goab-app-footer-nav-section slot="nav" heading="Services">
      <a href="/apply">Apply online</a>
      <goab-link trailingIcon="open">
        <a href="https://www.alberta.ca/services">All services</a>
      </goab-link>
    </goab-app-footer-nav-section>
    <goab-app-footer-meta-section slot="meta">
      <a href="/privacy">Privacy</a>
      <goab-link><a href="/accessibility">Accessibility</a></goab-link>
    </goab-app-footer-meta-section>
  </goab-app-footer>
</footer>`,
        webComponents: `<footer>
  <goa-app-footer version="2">
    <goa-app-footer-nav-section slot="nav" heading="Services">
      <a href="/apply">Apply online</a>
      <goa-link trailingicon="open">
        <a href="https://www.alberta.ca/services">All services</a>
      </goa-link>
    </goa-app-footer-nav-section>
    <goa-app-footer-meta-section slot="meta">
      <a href="/privacy">Privacy</a>
      <goa-link><a href="/accessibility">Accessibility</a></goa-link>
    </goa-app-footer-meta-section>
  </goa-app-footer>
</footer>`,
      },
    },
  ],
};
