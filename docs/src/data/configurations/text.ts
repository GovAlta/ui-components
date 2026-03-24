/**
 * Text Component Configurations
 *
 * Text component provides consistent typography styles.
 */

import type { ComponentConfigurations } from "./types";

export const textConfigurations: ComponentConfigurations = {
  componentSlug: "text",
  componentName: "Text",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Basic text",
      description: "Standard paragraph text",
      code: {
        react: `<GoabText>This is a paragraph of text with default styling.</GoabText>`,
        angular: `<goab-text>This is a paragraph of text with default styling.</goab-text>`,
        webComponents: `<goa-text>This is a paragraph of text with default styling.</goa-text>`,
      },
    },
    {
      id: "heading-sizes",
      name: "Heading sizes",
      description: "All heading text sizes",
      code: {
        react: `<GoabDivider mb="none" mt="none" />
<GoabText size="heading-xl">Heading XL</GoabText>
<GoabDivider mb="none" mt="none" />
<GoabText size="heading-l">Heading L</GoabText>
<GoabDivider mb="none" mt="none" />
<GoabText size="heading-m">Heading M</GoabText>
<GoabDivider mb="none" mt="none" />
<GoabText size="heading-s">Heading S</GoabText>
<GoabDivider mb="none" mt="none" />
<GoabText size="heading-xs">Heading XS</GoabText>
<GoabDivider mb="none" mt="none" />
<GoabText size="heading-2xs">Heading 2XS</GoabText>
<GoabDivider mb="none" mt="none" />`,
        angular: `<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="heading-xl">Heading XL</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="heading-l">Heading L</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="heading-m">Heading M</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="heading-s">Heading S</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="heading-xs">Heading XS</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="heading-2xs">Heading 2XS</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>`,
        webComponents: `<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="heading-xl">Heading XL</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="heading-l">Heading L</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="heading-m">Heading M</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="heading-s">Heading S</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="heading-xs">Heading XS</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="heading-2xs">Heading 2XS</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>`,
      },
    },
    {
      id: "body-sizes",
      name: "Body sizes",
      description: "All body text sizes",
      code: {
        react: `<GoabDivider mb="none" mt="none" />
<GoabText size="body-l">Body large text</GoabText>
<GoabDivider mb="none" mt="none" />
<GoabText size="body-m">Body medium text (default)</GoabText>
<GoabDivider mb="none" mt="none" />
<GoabText size="body-s">Body small text</GoabText>
<GoabDivider mb="none" mt="none" />
<GoabText size="body-xs">Body extra small text</GoabText>
<GoabDivider mb="none" mt="none" />`,
        angular: `<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="body-l">Body large text</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="body-m">Body medium text (default)</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="body-s">Body small text</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>
<goab-text size="body-xs">Body extra small text</goab-text>
<goab-divider mb="none" mt="none"></goab-divider>`,
        webComponents: `<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="body-l">Body large text</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="body-m">Body medium text (default)</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="body-s">Body small text</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>
<goa-text size="body-xs">Body extra small text</goa-text>
<goa-divider mb="none" mt="none"></goa-divider>`,
      },
    },
    {
      id: "color",
      name: "Color",
      description: "Primary and secondary text colors",
      code: {
        react: `<GoabText color="primary" mt="none" mb="none">Primary color text (default)</GoabText>
<GoabText color="secondary" mb="none">Secondary color text</GoabText>`,
        angular: `<goab-text color="primary" mt="none" mb="none">Primary color text (default)</goab-text>
<goab-text color="secondary" mb="none">Secondary color text</goab-text>`,
        webComponents: `<goa-text color="primary" mt="none" mb="none">Primary color text (default)</goa-text>
<goa-text color="secondary" mb="none">Secondary color text</goa-text>`,
      },
    },
  ],
};
