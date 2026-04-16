/**
 * MicrositeHeader Component Configurations
 *
 * Microsite header for smaller government sites.
 */

import type { ComponentConfigurations } from "./types";

export const micrositeHeaderConfigurations: ComponentConfigurations = {
  componentSlug: "microsite-header",
  componentName: "Microsite header",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic microsite header",
      description: "Simple microsite navigation",
      code: {
        react: `<GoabMicrositeHeader type="alpha" />`,
        angular: `<goab-microsite-header type="alpha"></goab-microsite-header>`,
        webComponents: `<goa-microsite-header type="alpha"></goa-microsite-header>`,
      },
    },
    {
      id: "types",
      name: "Header types",
      description: "Different microsite types",
      code: {
        react: `<GoabMicrositeHeader type="alpha" />
<GoabMicrositeHeader type="beta" />
<GoabMicrositeHeader type="live" />`,
        angular: `<goab-microsite-header type="alpha"></goab-microsite-header>
<goab-microsite-header type="beta"></goab-microsite-header>
<goab-microsite-header type="live"></goab-microsite-header>`,
        webComponents: `<goa-microsite-header type="alpha"></goa-microsite-header>
<goa-microsite-header type="beta"></goa-microsite-header>
<goa-microsite-header type="live"></goa-microsite-header>`,
      },
    },
    {
      id: "with-version",
      name: "With version",
      description: "Header showing version number",
      code: {
        react: `<GoabMicrositeHeader type="alpha" version="1.0.0" />`,
        angular: `<goab-microsite-header type="alpha" version="1.0.0"></goab-microsite-header>`,
        webComponents: `<goa-microsite-header type="alpha" version="1.0.0"></goa-microsite-header>`,
      },
    },
    {
      id: "with-feedback",
      name: "With feedback link",
      description: "Header with feedback URL",
      code: {
        react: `<GoabMicrositeHeader type="beta" feedbackUrl="/feedback" />`,
        angular: `<goab-microsite-header type="beta" feedbackUrl="/feedback"></goab-microsite-header>`,
        webComponents: `<goa-microsite-header type="beta" feedbackurl="/feedback"></goa-microsite-header>`,
      },
    },
  ],
};
