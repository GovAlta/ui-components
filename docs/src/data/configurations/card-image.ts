/**
 * CardImage Component Configurations
 *
 * CardImage displays an image within a Card.
 */

import type { ComponentConfigurations } from "./types";

export const cardImageConfigurations: ComponentConfigurations = {
  componentSlug: "card-image",
  componentName: "Card image",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic card image",
      description: "Image at top of Card",
      code: {
        react: `<GoabCard>
  <GoabCardImage src="/images/feature.jpg" alt="Feature image" />
  <GoabCardContent>
    <h3>Featured Service</h3>
    <p>Learn about this government service.</p>
  </GoabCardContent>
</GoabCard>`,
        angular: `<goab-card>
  <goab-card-image src="/images/feature.jpg" alt="Feature image"></goab-card-image>
  <goab-card-content>
    <h3>Featured Service</h3>
    <p>Learn about this government service.</p>
  </goab-card-content>
</goab-card>`,
        webComponents: `<goa-card>
  <goa-card-image src="/images/feature.jpg" alt="Feature image"></goa-card-image>
  <goa-card-content>
    <h3>Featured Service</h3>
    <p>Learn about this government service.</p>
  </goa-card-content>
</goa-card>`,
      },
    },
  ],
};
