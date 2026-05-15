/**
 * Block Component Configurations
 *
 * Block provides vertical spacing and horizontal alignment.
 */

import type { ComponentConfigurations } from "./types";

export const blockConfigurations: ComponentConfigurations = {
  componentSlug: "block",
  componentName: "Block",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic block",
      description: "Block with default spacing",
      code: {
        react: `<GoabBlock>
  <GoabContainer type="non-interactive"><p>First item</p></GoabContainer>
  <GoabContainer type="non-interactive"><p>Second item</p></GoabContainer>
  <GoabContainer type="non-interactive"><p>Third item</p></GoabContainer>
</GoabBlock>`,
        angular: `<goab-block>
  <goab-container type="non-interactive"><p>First item</p></goab-container>
  <goab-container type="non-interactive"><p>Second item</p></goab-container>
  <goab-container type="non-interactive"><p>Third item</p></goab-container>
</goab-block>`,
        webComponents: `<goa-block>
  <goa-container type="non-interactive"><p>First item</p></goa-container>
  <goa-container type="non-interactive"><p>Second item</p></goa-container>
  <goa-container type="non-interactive"><p>Third item</p></goa-container>
</goa-block>`,
      },
    },
    {
      id: "gap-sizes",
      name: "Gap sizes",
      description: "Different spacing between items",
      code: {
        react: `<GoabBlock gap="xs" mb="l">
  <GoabContainer type="non-interactive"><p>Extra small gap</p></GoabContainer>
  <GoabContainer type="non-interactive"><p>Item 2</p></GoabContainer>
</GoabBlock>
<GoabBlock gap="m" mb="l">
  <GoabContainer type="non-interactive"><p>Medium gap</p></GoabContainer>
  <GoabContainer type="non-interactive"><p>Item 2</p></GoabContainer>
</GoabBlock>
<GoabBlock gap="xl">
  <GoabContainer type="non-interactive"><p>Extra large gap</p></GoabContainer>
  <GoabContainer type="non-interactive"><p>Item 2</p></GoabContainer>
</GoabBlock>`,
        angular: `<goab-block gap="xs" mb="l">
  <goab-container type="non-interactive"><p>Extra small gap</p></goab-container>
  <goab-container type="non-interactive"><p>Item 2</p></goab-container>
</goab-block>
<goab-block gap="m" mb="l">
  <goab-container type="non-interactive"><p>Medium gap</p></goab-container>
  <goab-container type="non-interactive"><p>Item 2</p></goab-container>
</goab-block>
<goab-block gap="xl">
  <goab-container type="non-interactive"><p>Extra large gap</p></goab-container>
  <goab-container type="non-interactive"><p>Item 2</p></goab-container>
</goab-block>`,
        webComponents: `<goa-block gap="xs" mb="l">
  <goa-container type="non-interactive"><p>Extra small gap</p></goa-container>
  <goa-container type="non-interactive"><p>Item 2</p></goa-container>
</goa-block>
<goa-block gap="m" mb="l">
  <goa-container type="non-interactive"><p>Medium gap</p></goa-container>
  <goa-container type="non-interactive"><p>Item 2</p></goa-container>
</goa-block>
<goa-block gap="xl">
  <goa-container type="non-interactive"><p>Extra large gap</p></goa-container>
  <goa-container type="non-interactive"><p>Item 2</p></goa-container>
</goa-block>`,
      },
    },
    {
      id: "alignment",
      name: "Alignment",
      description: "Horizontal alignment options",
      code: {
        react: `<GoabBlock alignment="start" mb="m" direction="column" width="100%">
  <GoabContainer type="non-interactive" width="content"><p>Start aligned</p></GoabContainer>
</GoabBlock>
<GoabBlock alignment="center" mb="m" direction="column" width="100%">
  <GoabContainer type="non-interactive" width="content"><p>Center aligned</p></GoabContainer>
</GoabBlock>
<GoabBlock alignment="end" direction="column" width="100%">
  <GoabContainer type="non-interactive" width="content"><p>End aligned</p></GoabContainer>
</GoabBlock>`,
        angular: `<goab-block alignment="start" mb="m" direction="column" width="100%">
  <goab-container type="non-interactive" width="content"><p>Start aligned</p></goab-container>
</goab-block>
<goab-block alignment="center" mb="m" direction="column" width="100%">
  <goab-container type="non-interactive" width="content"><p>Center aligned</p></goab-container>
</goab-block>
<goab-block alignment="end" direction="column" width="100%">
  <goab-container type="non-interactive" width="content"><p>End aligned</p></goab-container>
</goab-block>`,
        webComponents: `<goa-block alignment="start" mb="m" direction="column" width="100%">
  <goa-container type="non-interactive" width="content"><p>Start aligned</p></goa-container>
</goa-block>
<goa-block alignment="center" mb="m" direction="column" width="100%">
  <goa-container type="non-interactive" width="content"><p>Center aligned</p></goa-container>
</goa-block>
<goa-block alignment="end" direction="column" width="100%">
  <goa-container type="non-interactive" width="content"><p>End aligned</p></goa-container>
</goa-block>`,
      },
    },
    {
      id: "direction",
      name: "Direction",
      description: "Row and column layouts",
      code: {
        react: `<GoabBlock direction="row" gap="l" mb="l">
  <GoabContainer type="non-interactive"><p>Row item 1</p></GoabContainer>
  <GoabContainer type="non-interactive"><p>Row item 2</p></GoabContainer>
</GoabBlock>
<GoabBlock direction="column" gap="m">
  <GoabContainer type="non-interactive"><p>Column item 1</p></GoabContainer>
  <GoabContainer type="non-interactive"><p>Column item 2</p></GoabContainer>
</GoabBlock>`,
        angular: `<goab-block direction="row" gap="l" mb="l">
  <goab-container type="non-interactive"><p>Row item 1</p></goab-container>
  <goab-container type="non-interactive"><p>Row item 2</p></goab-container>
</goab-block>
<goab-block direction="column" gap="m">
  <goab-container type="non-interactive"><p>Column item 1</p></goab-container>
  <goab-container type="non-interactive"><p>Column item 2</p></goab-container>
</goab-block>`,
        webComponents: `<goa-block direction="row" gap="l" mb="l">
  <goa-container type="non-interactive"><p>Row item 1</p></goa-container>
  <goa-container type="non-interactive"><p>Row item 2</p></goa-container>
</goa-block>
<goa-block direction="column" gap="m">
  <goa-container type="non-interactive"><p>Column item 1</p></goa-container>
  <goa-container type="non-interactive"><p>Column item 2</p></goa-container>
</goa-block>`,
      },
    },
  ],
};
