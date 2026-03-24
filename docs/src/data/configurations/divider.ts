/**
 * Divider Component Configurations
 *
 * Dividers separate content sections visually.
 */

import type { ComponentConfigurations } from "./types";

export const dividerConfigurations: ComponentConfigurations = {
  componentSlug: "divider",
  componentName: "Divider",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic divider",
      description: "Divider with spacing",
      code: {
        react: `<GoabText mt="none" mb="none">Section one</GoabText>
<GoabDivider mt="xl" mb="xl" />
<GoabText mt="none" mb="none">Section two</GoabText>`,
        angular: `<goab-text>Section one</goab-text>
<goab-divider mt="xl" mb="xl"></goab-divider>
<goab-text>Section two</goab-text>`,
        webComponents: `<goa-text>Section one</goa-text>
<goa-divider mt="xl" mb="xl"></goa-divider>
<goa-text>Section two</goa-text>`,
      },
    },
  ],
};
