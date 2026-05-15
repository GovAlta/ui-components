/**
 * PageBlock Component Configurations
 *
 * PageBlock provides consistent page layout structure.
 */

import type { ComponentConfigurations } from "./types";

export const pageBlockConfigurations: ComponentConfigurations = {
  componentSlug: "page-block",
  componentName: "Page block",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic page block",
      description: "Standard page content wrapper",
      code: {
        react: `<GoabPageBlock>
  <h1>Page Title</h1>
  <p>Page content goes here.</p>
</GoabPageBlock>`,
        angular: `<goab-page-block>
  <h1>Page Title</h1>
  <p>Page content goes here.</p>
</goab-page-block>`,
        webComponents: `<goa-page-block>
  <h1>Page Title</h1>
  <p>Page content goes here.</p>
</goa-page-block>`,
      },
    },
    {
      id: "width-options",
      name: "Width options",
      description: "Full width and constrained content",
      code: {
        react: `<GoabPageBlock width="full">
  <GoabText>Full width content (default)</GoabText>
</GoabPageBlock>
<GoabPageBlock width="760px">
  <GoabText>Constrained to 760px</GoabText>
</GoabPageBlock>`,
        angular: `<goab-page-block width="full">
  <goab-text>Full width content (default)</goab-text>
</goab-page-block>
<goab-page-block width="760px">
  <goab-text>Constrained to 760px</goab-text>
</goab-page-block>`,
        webComponents: `<goa-page-block width="full">
  <goa-text>Full width content (default)</goa-text>
</goa-page-block>
<goa-page-block width="760px">
  <goa-text>Constrained to 760px</goa-text>
</goa-page-block>`,
      },
    },
  ],
};
