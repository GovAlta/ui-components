/**
 * Text Component Configurations
 *
 * Text component provides consistent typography styles.
 */

import type { ComponentConfigurations } from './types';

export const textConfigurations: ComponentConfigurations = {
  componentSlug: 'text',
  componentName: 'Text',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic text',
      description: 'Standard paragraph text',
      code: {
        react: `<GoabText>This is a paragraph of text with default styling.</GoabText>`,
        angular: `<goab-text>This is a paragraph of text with default styling.</goab-text>`,
        webComponents: `<goa-text>This is a paragraph of text with default styling.</goa-text>`,
      },
    },
    {
      id: 'headings',
      name: 'Headings',
      description: 'Different heading levels',
      code: {
        react: `<GoabText as="h1">Heading 1</GoabText>
<GoabText as="h2">Heading 2</GoabText>
<GoabText as="h3">Heading 3</GoabText>
<GoabText as="h4">Heading 4</GoabText>`,
        angular: `<goab-text as="h1">Heading 1</goab-text>
<goab-text as="h2">Heading 2</goab-text>
<goab-text as="h3">Heading 3</goab-text>
<goab-text as="h4">Heading 4</goab-text>`,
        webComponents: `<goa-text as="h1">Heading 1</goa-text>
<goa-text as="h2">Heading 2</goa-text>
<goa-text as="h3">Heading 3</goa-text>
<goa-text as="h4">Heading 4</goa-text>`,
      },
    },
    {
      id: 'heading-sizes',
      name: 'Heading sizes',
      description: 'Different heading text sizes',
      code: {
        react: `<GoabText size="heading-xl">Heading XL</GoabText>
<GoabText size="heading-l">Heading L</GoabText>
<GoabText size="heading-m">Heading M</GoabText>
<GoabText size="heading-s">Heading S</GoabText>
<GoabText size="heading-xs">Heading XS</GoabText>`,
        angular: `<goab-text size="heading-xl">Heading XL</goab-text>
<goab-text size="heading-l">Heading L</goab-text>
<goab-text size="heading-m">Heading M</goab-text>
<goab-text size="heading-s">Heading S</goab-text>
<goab-text size="heading-xs">Heading XS</goab-text>`,
        webComponents: `<goa-text size="heading-xl">Heading XL</goa-text>
<goa-text size="heading-l">Heading L</goa-text>
<goa-text size="heading-m">Heading M</goa-text>
<goa-text size="heading-s">Heading S</goa-text>
<goa-text size="heading-xs">Heading XS</goa-text>`,
      },
    },
    {
      id: 'body-sizes',
      name: 'Body sizes',
      description: 'Different body text sizes',
      code: {
        react: `<GoabText size="body-l">Body large text</GoabText>
<GoabText size="body-m">Body medium text (default)</GoabText>
<GoabText size="body-s">Body small text</GoabText>
<GoabText size="body-xs">Body extra small text</GoabText>`,
        angular: `<goab-text size="body-l">Body large text</goab-text>
<goab-text size="body-m">Body medium text (default)</goab-text>
<goab-text size="body-s">Body small text</goab-text>
<goab-text size="body-xs">Body extra small text</goab-text>`,
        webComponents: `<goa-text size="body-l">Body large text</goa-text>
<goa-text size="body-m">Body medium text (default)</goa-text>
<goa-text size="body-s">Body small text</goa-text>
<goa-text size="body-xs">Body extra small text</goa-text>`,
      },
    },
    {
      id: 'with-margins',
      name: 'With margins',
      description: 'Text with spacing',
      code: {
        react: `<GoabText mb="m">Paragraph with bottom margin.</GoabText>
<GoabText mt="l" mb="l">Paragraph with top and bottom margin.</GoabText>`,
        angular: `<goab-text mb="m">Paragraph with bottom margin.</goab-text>
<goab-text mt="l" mb="l">Paragraph with top and bottom margin.</goab-text>`,
        webComponents: `<goa-text mb="m">Paragraph with bottom margin.</goa-text>
<goa-text mt="l" mb="l">Paragraph with top and bottom margin.</goa-text>`,
      },
    },
  ],
};
