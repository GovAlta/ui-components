/**
 * Pages Component Configurations
 *
 * Pages provides page layout structure.
 */

import type { ComponentConfigurations } from "./types";

export const pagesConfigurations: ComponentConfigurations = {
  componentSlug: "pages",
  componentName: "Pages",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic pages layout",
      description: "Standard page structure",
      code: {
        react: `<GoabPages>
  <GoabPageBlock>
    <GoabText>Main page content goes here.</GoabText>
  </GoabPageBlock>
</GoabPages>`,
        angular: `<goab-pages>
  <goab-page-block>
    <goab-text>Main page content goes here.</goab-text>
  </goab-page-block>
</goab-pages>`,
        webComponents: `<goa-pages>
  <goa-page-block>
    <goa-text>Main page content goes here.</goa-text>
  </goa-page-block>
</goa-pages>`,
      },
    },
    {
      id: "multi-page",
      name: "Multi-page switching",
      description: "Multiple pages with current page control",
      code: {
        react: `<GoabPages current={2}>
  <GoabPageBlock>
    <GoabText>Page 1: Personal information</GoabText>
  </GoabPageBlock>
  <GoabPageBlock>
    <GoabText>Page 2: Contact details (visible)</GoabText>
  </GoabPageBlock>
  <GoabPageBlock>
    <GoabText>Page 3: Review and submit</GoabText>
  </GoabPageBlock>
</GoabPages>`,
        angular: `<goab-pages [current]="2">
  <goab-page-block>
    <goab-text>Page 1: Personal information</goab-text>
  </goab-page-block>
  <goab-page-block>
    <goab-text>Page 2: Contact details (visible)</goab-text>
  </goab-page-block>
  <goab-page-block>
    <goab-text>Page 3: Review and submit</goab-text>
  </goab-page-block>
</goab-pages>`,
        webComponents: `<goa-pages current="2">
  <goa-page-block>
    <goa-text>Page 1: Personal information</goa-text>
  </goa-page-block>
  <goa-page-block>
    <goa-text>Page 2: Contact details (visible)</goa-text>
  </goa-page-block>
  <goa-page-block>
    <goa-text>Page 3: Review and submit</goa-text>
  </goa-page-block>
</goa-pages>`,
      },
    },
  ],
};
