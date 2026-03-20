/**
 * CardContent Component Configurations
 *
 * CardContent is a child component of Card.
 */

import type { ComponentConfigurations } from "./types";

export const cardContentConfigurations: ComponentConfigurations = {
  componentSlug: "card-content",
  componentName: "Card content",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic card content",
      description: "Content area within Card",
      code: {
        react: `<GoabCard>
  <GoabCardContent>
    <h3>Card title</h3>
    <p>Card description and content goes here.</p>
  </GoabCardContent>
</GoabCard>`,
        angular: `<goab-card>
  <goab-card-content>
    <h3>Card title</h3>
    <p>Card description and content goes here.</p>
  </goab-card-content>
</goab-card>`,
        webComponents: `<goa-card>
  <goa-card-content>
    <h3>Card title</h3>
    <p>Card description and content goes here.</p>
  </goa-card-content>
</goa-card>`,
      },
    },
  ],
};
