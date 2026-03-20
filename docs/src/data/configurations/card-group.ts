/**
 * CardGroup Component Configurations
 *
 * CardGroup arranges multiple cards in a grid.
 */

import type { ComponentConfigurations } from "./types";

export const cardGroupConfigurations: ComponentConfigurations = {
  componentSlug: "card-group",
  componentName: "Card group",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic card group",
      description: "Grid of cards",
      code: {
        react: `<GoabCardGroup>
  <GoabCard>
    <GoabCardContent>
      <h3>Card 1</h3>
      <p>First card content.</p>
    </GoabCardContent>
  </GoabCard>
  <GoabCard>
    <GoabCardContent>
      <h3>Card 2</h3>
      <p>Second card content.</p>
    </GoabCardContent>
  </GoabCard>
  <GoabCard>
    <GoabCardContent>
      <h3>Card 3</h3>
      <p>Third card content.</p>
    </GoabCardContent>
  </GoabCard>
</GoabCardGroup>`,
        angular: `<goab-card-group>
  <goab-card>
    <goab-card-content>
      <h3>Card 1</h3>
      <p>First card content.</p>
    </goab-card-content>
  </goab-card>
  <goab-card>
    <goab-card-content>
      <h3>Card 2</h3>
      <p>Second card content.</p>
    </goab-card-content>
  </goab-card>
  <goab-card>
    <goab-card-content>
      <h3>Card 3</h3>
      <p>Third card content.</p>
    </goab-card-content>
  </goab-card>
</goab-card-group>`,
        webComponents: `<goa-card-group>
  <goa-card>
    <goa-card-content>
      <h3>Card 1</h3>
      <p>First card content.</p>
    </goa-card-content>
  </goa-card>
  <goa-card>
    <goa-card-content>
      <h3>Card 2</h3>
      <p>Second card content.</p>
    </goa-card-content>
  </goa-card>
  <goa-card>
    <goa-card-content>
      <h3>Card 3</h3>
      <p>Third card content.</p>
    </goa-card-content>
  </goa-card>
</goa-card-group>`,
      },
    },
  ],
};
