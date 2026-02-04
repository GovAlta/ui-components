/**
 * Button Component Configurations
 *
 * Template pattern for component configurations.
 * Each configuration shows a different use case with
 * code snippets for all three frameworks.
 */

import type { ComponentConfigurations } from './types';

export const buttonConfigurations: ComponentConfigurations = {
  componentSlug: 'button',
  componentName: 'Button',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Primary button',
      description: 'Simple button with default styling',
      code: {
        react: `<GoabxButton>Submit</GoabxButton>`,
        angular: `<goab-button>Submit</goab-button>`,
        webComponents: `<goa-button>Submit</goa-button>`,
      },
    },
    {
      id: 'variants',
      name: 'Variants',
      description: 'Primary, secondary, and tertiary button types',
      code: {
        react: `<GoabxButton type="primary">Primary</GoabxButton>
<GoabxButton type="secondary">Secondary</GoabxButton>
<GoabxButton type="tertiary">Tertiary</GoabxButton>`,
        angular: `<goab-button type="primary">Primary</goab-button>
<goab-button type="secondary">Secondary</goab-button>
<goab-button type="tertiary">Tertiary</goab-button>`,
        webComponents: `<goa-button type="primary">Primary</goa-button>
<goa-button type="secondary">Secondary</goa-button>
<goa-button type="tertiary">Tertiary</goa-button>`,
      },
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Normal and compact button sizes',
      code: {
        react: `<GoabxButton size="normal">Normal</GoabxButton>
<GoabxButton size="compact">Compact</GoabxButton>`,
        angular: `<goab-button size="normal">Normal</goab-button>
<goab-button size="compact">Compact</goab-button>`,
        webComponents: `<goa-button size="normal">Normal</goa-button>
<goa-button size="compact">Compact</goa-button>`,
      },
    },
    {
      id: 'with-icons',
      name: 'With icons',
      description: 'Buttons with leading or trailing icons',
      code: {
        react: `<GoabxButton leadingIcon="add">Add item</GoabxButton>
<GoabxButton trailingIcon="arrow-forward">Next</GoabxButton>`,
        angular: `<goab-button leadingIcon="add">Add item</goab-button>
<goab-button trailingIcon="arrow-forward">Next</goab-button>`,
        webComponents: `<goa-button leadingicon="add">Add item</goa-button>
<goa-button trailingicon="arrow-forward">Next</goa-button>`,
      },
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Buttons in disabled state',
      code: {
        react: `<GoabxButton disabled>Disabled primary</GoabxButton>
<GoabxButton type="secondary" disabled>Disabled secondary</GoabxButton>`,
        angular: `<goab-button disabled="true">Disabled primary</goab-button>
<goab-button type="secondary" disabled="true">Disabled secondary</goab-button>`,
        webComponents: `<goa-button disabled>Disabled primary</goa-button>
<goa-button type="secondary" disabled>Disabled secondary</goa-button>`,
      },
    },
    {
      id: 'destructive',
      name: 'Destructive',
      description: 'Buttons for destructive actions like delete',
      code: {
        react: `<GoabxButton variant="destructive">Delete</GoabxButton>
<GoabxButton variant="destructive" type="secondary">Cancel subscription</GoabxButton>`,
        angular: `<goab-button variant="destructive">Delete</goab-button>
<goab-button variant="destructive" type="secondary">Cancel subscription</goab-button>`,
        webComponents: `<goa-button variant="destructive">Delete</goa-button>
<goa-button variant="destructive" type="secondary">Cancel subscription</goa-button>`,
      },
    },
    {
      id: 'inverse',
      name: 'Inverse',
      description: 'Buttons for use on dark backgrounds',
      code: {
        react: `<GoabxButton variant="inverse">Learn more</GoabxButton>
<GoabxButton variant="inverse" type="secondary">Contact us</GoabxButton>`,
        angular: `<goab-button variant="inverse">Learn more</goab-button>
<goab-button variant="inverse" type="secondary">Contact us</goab-button>`,
        webComponents: `<goa-button variant="inverse">Learn more</goa-button>
<goa-button variant="inverse" type="secondary">Contact us</goa-button>`,
      },
    },
  ],
};
