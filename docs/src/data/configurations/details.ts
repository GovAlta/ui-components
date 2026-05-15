/**
 * Details Component Configurations
 *
 * Details show expandable/collapsible content.
 */

import type { ComponentConfigurations } from "./types";

export const detailsConfigurations: ComponentConfigurations = {
  componentSlug: "details",
  componentName: "Details",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic details",
      description: "Simple expandable section",
      code: {
        react: `<GoabDetails heading="More information">
  <p>This content is revealed when the details component is expanded.</p>
</GoabDetails>`,
        angular: `<goab-details heading="More information">
  <p>This content is revealed when the details component is expanded.</p>
</goab-details>`,
        webComponents: `<goa-details heading="More information">
  <p>This content is revealed when the details component is expanded.</p>
</goa-details>`,
      },
    },
    {
      id: "open",
      name: "Open by default",
      description: "Details that starts expanded",
      code: {
        react: `<GoabDetails heading="Visible by default" open>
  <p>This content is shown when the page loads.</p>
</GoabDetails>`,
        angular: `<goab-details heading="Visible by default" [open]="true">
  <p>This content is shown when the page loads.</p>
</goab-details>`,
        webComponents: `<goa-details heading="Visible by default" open>
  <p>This content is shown when the page loads.</p>
</goa-details>`,
      },
    },
  ],
};
