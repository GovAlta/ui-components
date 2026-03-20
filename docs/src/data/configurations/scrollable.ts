/**
 * Scrollable Component Configurations
 *
 * Scrollable provides a scrollable container.
 */

import type { ComponentConfigurations } from "./types";

export const scrollableConfigurations: ComponentConfigurations = {
  componentSlug: "scrollable",
  componentName: "Scrollable",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic scrollable",
      description: "Scrollable content area",
      code: {
        react: `<GoabScrollable maxHeight="300px">
  <p>Long content that scrolls...</p>
  <p>More content...</p>
  <p>Even more content...</p>
</GoabScrollable>`,
        angular: `<goab-scrollable maxHeight="300px">
  <p>Long content that scrolls...</p>
  <p>More content...</p>
  <p>Even more content...</p>
</goab-scrollable>`,
        webComponents: `<goa-scrollable maxheight="300px">
  <p>Long content that scrolls...</p>
  <p>More content...</p>
  <p>Even more content...</p>
</goa-scrollable>`,
      },
    },
    {
      id: "horizontal",
      name: "Horizontal scroll",
      description: "Horizontally scrollable content",
      code: {
        react: `<GoabScrollable direction="horizontal">
  <div style={{ display: 'flex', gap: '1rem' }}>
    <GoabCard width="250px">Card 1</GoabCard>
    <GoabCard width="250px">Card 2</GoabCard>
    <GoabCard width="250px">Card 3</GoabCard>
    <GoabCard width="250px">Card 4</GoabCard>
  </div>
</GoabScrollable>`,
        angular: `<goab-scrollable direction="horizontal">
  <div style="display: flex; gap: 1rem">
    <goab-card width="250px">Card 1</goab-card>
    <goab-card width="250px">Card 2</goab-card>
    <goab-card width="250px">Card 3</goab-card>
    <goab-card width="250px">Card 4</goab-card>
  </div>
</goab-scrollable>`,
        webComponents: `<goa-scrollable direction="horizontal">
  <div style="display: flex; gap: 1rem">
    <goa-card width="250px">Card 1</goa-card>
    <goa-card width="250px">Card 2</goa-card>
    <goa-card width="250px">Card 3</goa-card>
    <goa-card width="250px">Card 4</goa-card>
  </div>
</goa-scrollable>`,
      },
    },
  ],
};
