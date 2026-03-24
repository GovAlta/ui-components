/**
 * Grid Component Configurations
 *
 * Grid creates responsive multi-column layouts.
 */

import type { ComponentConfigurations } from "./types";

export const gridConfigurations: ComponentConfigurations = {
  componentSlug: "grid",
  componentName: "Grid",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic grid",
      description: "Simple multi-column grid",
      code: {
        react: `<GoabGrid minChildWidth="200px" gap="m">
  <GoabContainer>Item 1</GoabContainer>
  <GoabContainer>Item 2</GoabContainer>
  <GoabContainer>Item 3</GoabContainer>
</GoabGrid>`,
        angular: `<goab-grid minChildWidth="200px" gap="m">
  <goab-container>Item 1</goab-container>
  <goab-container>Item 2</goab-container>
  <goab-container>Item 3</goab-container>
</goab-grid>`,
        webComponents: `<goa-grid minchildwidth="200px" gap="m">
  <goa-container>Item 1</goa-container>
  <goa-container>Item 2</goa-container>
  <goa-container>Item 3</goa-container>
</goa-grid>`,
      },
    },
    {
      id: "gap-sizes",
      name: "Gap sizes",
      description: "Different spacing between items",
      code: {
        react: `<GoabText mt="none" mb="s">Extra small gap</GoabText>
<GoabGrid minChildWidth="100px" gap="xs">
  <GoabContainer>A</GoabContainer>
  <GoabContainer>B</GoabContainer>
  <GoabContainer>C</GoabContainer>
  <GoabContainer>D</GoabContainer>
</GoabGrid>
<GoabDivider mt="l" mb="l" />
<GoabText mt="none" mb="s">Medium gap</GoabText>
<GoabGrid minChildWidth="100px" gap="m">
  <GoabContainer>A</GoabContainer>
  <GoabContainer>B</GoabContainer>
  <GoabContainer>C</GoabContainer>
  <GoabContainer>D</GoabContainer>
</GoabGrid>
<GoabDivider mt="l" mb="l" />
<GoabText mt="none" mb="s">Extra large gap</GoabText>
<GoabGrid minChildWidth="100px" gap="xl">
  <GoabContainer>A</GoabContainer>
  <GoabContainer>B</GoabContainer>
  <GoabContainer>C</GoabContainer>
  <GoabContainer>D</GoabContainer>
</GoabGrid>`,
        angular: `<goab-text mt="none" mb="s">Extra small gap</goab-text>
<goab-grid minChildWidth="100px" gap="xs">
  <goab-container>A</goab-container>
  <goab-container>B</goab-container>
  <goab-container>C</goab-container>
  <goab-container>D</goab-container>
</goab-grid>
<goab-divider mt="l" mb="l"></goab-divider>
<goab-text mt="none" mb="s">Medium gap</goab-text>
<goab-grid minChildWidth="100px" gap="m">
  <goab-container>A</goab-container>
  <goab-container>B</goab-container>
  <goab-container>C</goab-container>
  <goab-container>D</goab-container>
</goab-grid>
<goab-divider mt="l" mb="l"></goab-divider>
<goab-text mt="none" mb="s">Extra large gap</goab-text>
<goab-grid minChildWidth="100px" gap="xl">
  <goab-container>A</goab-container>
  <goab-container>B</goab-container>
  <goab-container>C</goab-container>
  <goab-container>D</goab-container>
</goab-grid>`,
        webComponents: `<goa-text mt="none" mb="s">Extra small gap</goa-text>
<goa-grid minchildwidth="100px" gap="xs">
  <goa-container>A</goa-container>
  <goa-container>B</goa-container>
  <goa-container>C</goa-container>
  <goa-container>D</goa-container>
</goa-grid>
<goa-divider mt="l" mb="l"></goa-divider>
<goa-text mt="none" mb="s">Medium gap</goa-text>
<goa-grid minchildwidth="100px" gap="m">
  <goa-container>A</goa-container>
  <goa-container>B</goa-container>
  <goa-container>C</goa-container>
  <goa-container>D</goa-container>
</goa-grid>
<goa-divider mt="l" mb="l"></goa-divider>
<goa-text mt="none" mb="s">Extra large gap</goa-text>
<goa-grid minchildwidth="100px" gap="xl">
  <goa-container>A</goa-container>
  <goa-container>B</goa-container>
  <goa-container>C</goa-container>
  <goa-container>D</goa-container>
</goa-grid>`,
      },
    },
  ],
};
