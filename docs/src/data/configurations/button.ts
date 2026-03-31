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
        react: `<GoabButton>Submit</GoabButton>`,
        angular: `<goab-button>Submit</goab-button>`,
        webComponents: `<goa-button version="2">Submit</goa-button>`,
      },
    },
    {
      id: 'variants',
      name: 'Variants',
      description: 'Primary, secondary, and tertiary button types',
      code: {
        react: `<GoabButton type="primary">Primary</GoabButton>
<GoabButton type="secondary">Secondary</GoabButton>
<GoabButton type="tertiary">Tertiary</GoabButton>`,
        angular: `<goab-button type="primary">Primary</goab-button>
<goab-button type="secondary">Secondary</goab-button>
<goab-button type="tertiary">Tertiary</goab-button>`,
        webComponents: `<goa-button version="2" type="primary">Primary</goa-button>
<goa-button version="2" type="secondary">Secondary</goa-button>
<goa-button version="2" type="tertiary">Tertiary</goa-button>`,
      },
    },
    {
      id: 'sizes',
      name: 'Sizes',
      description: 'Normal and compact button sizes',
      code: {
        react: `<GoabButton size="normal">Normal</GoabButton>
<GoabButton size="compact">Compact</GoabButton>`,
        angular: `<goab-button size="normal">Normal</goab-button>
<goab-button size="compact">Compact</goab-button>`,
        webComponents: `<goa-button version="2" size="normal">Normal</goa-button>
<goa-button version="2" size="compact">Compact</goa-button>`,
      },
    },
    {
      id: 'with-icons',
      name: 'With icons',
      description: 'Buttons with leading or trailing icons',
      code: {
        react: `<GoabButton leadingIcon="add">Add item</GoabButton>
<GoabButton trailingIcon="arrow-forward">Next</GoabButton>`,
        angular: `<goab-button leadingIcon="add">Add item</goab-button>
<goab-button trailingIcon="arrow-forward">Next</goab-button>`,
        webComponents: `<goa-button version="2" leadingicon="add">Add item</goa-button>
<goa-button version="2" trailingicon="arrow-forward">Next</goa-button>`,
      },
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Buttons in disabled state',
      code: {
        react: `<GoabButton disabled>Disabled primary</GoabButton>
<GoabButton type="secondary" disabled>Disabled secondary</GoabButton>`,
        angular: `<goab-button disabled="true">Disabled primary</goab-button>
<goab-button type="secondary" disabled="true">Disabled secondary</goab-button>`,
        webComponents: `<goa-button version="2" disabled>Disabled primary</goa-button>
<goa-button version="2" type="secondary" disabled>Disabled secondary</goa-button>`,
      },
    },
    {
      id: 'destructive',
      name: 'Destructive',
      description: 'Buttons for destructive actions like delete',
      code: {
        react: `<GoabButton variant="destructive">Delete</GoabButton>
<GoabButton variant="destructive" type="secondary">Cancel subscription</GoabButton>`,
        angular: `<goab-button variant="destructive">Delete</goab-button>
<goab-button variant="destructive" type="secondary">Cancel subscription</goab-button>`,
        webComponents: `<goa-button version="2" variant="destructive">Delete</goa-button>
<goa-button version="2" variant="destructive" type="secondary">Cancel subscription</goa-button>`,
      },
    },
    {
      id: 'inverse',
      name: 'Inverse',
      description: 'Buttons for use on dark backgrounds',
      code: {
        react: `<GoabButton variant="inverse">Learn more</GoabButton>
<GoabButton variant="inverse" type="secondary">Contact us</GoabButton>`,
        angular: `<goab-button variant="inverse">Learn more</goab-button>
<goab-button variant="inverse" type="secondary">Contact us</goab-button>`,
        webComponents: `<goa-button version="2" variant="inverse">Learn more</goa-button>
<goa-button version="2" variant="inverse" type="secondary">Contact us</goa-button>`,
      },
    },
  ],
};
