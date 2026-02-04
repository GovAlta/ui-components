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
        angular: `<goabx-button>Submit</goabx-button>`,
        webComponents: `<goa-button version="2">Submit</goa-button>`,
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
        angular: `<goabx-button type="primary">Primary</goabx-button>
<goabx-button type="secondary">Secondary</goabx-button>
<goabx-button type="tertiary">Tertiary</goabx-button>`,
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
        react: `<GoabxButton size="normal">Normal</GoabxButton>
<GoabxButton size="compact">Compact</GoabxButton>`,
        angular: `<goabx-button size="normal">Normal</goabx-button>
<goabx-button size="compact">Compact</goabx-button>`,
        webComponents: `<goa-button version="2" size="normal">Normal</goa-button>
<goa-button version="2" size="compact">Compact</goa-button>`,
      },
    },
    {
      id: 'with-icons',
      name: 'With icons',
      description: 'Buttons with leading or trailing icons',
      code: {
        react: `<GoabxButton leadingIcon="add">Add item</GoabxButton>
<GoabxButton trailingIcon="arrow-forward">Next</GoabxButton>`,
        angular: `<goabx-button leadingIcon="add">Add item</goabx-button>
<goabx-button trailingIcon="arrow-forward">Next</goabx-button>`,
        webComponents: `<goa-button version="2" leadingicon="add">Add item</goa-button>
<goa-button version="2" trailingicon="arrow-forward">Next</goa-button>`,
      },
    },
    {
      id: 'disabled',
      name: 'Disabled',
      description: 'Buttons in disabled state',
      code: {
        react: `<GoabxButton disabled>Disabled primary</GoabxButton>
<GoabxButton type="secondary" disabled>Disabled secondary</GoabxButton>`,
        angular: `<goabx-button disabled="true">Disabled primary</goabx-button>
<goabx-button type="secondary" disabled="true">Disabled secondary</goabx-button>`,
        webComponents: `<goa-button version="2" disabled>Disabled primary</goa-button>
<goa-button version="2" type="secondary" disabled>Disabled secondary</goa-button>`,
      },
    },
    {
      id: 'destructive',
      name: 'Destructive',
      description: 'Buttons for destructive actions like delete',
      code: {
        react: `<GoabxButton variant="destructive">Delete</GoabxButton>
<GoabxButton variant="destructive" type="secondary">Cancel subscription</GoabxButton>`,
        angular: `<goabx-button variant="destructive">Delete</goabx-button>
<goabx-button variant="destructive" type="secondary">Cancel subscription</goabx-button>`,
        webComponents: `<goa-button version="2" variant="destructive">Delete</goa-button>
<goa-button version="2" variant="destructive" type="secondary">Cancel subscription</goa-button>`,
      },
    },
    {
      id: 'inverse',
      name: 'Inverse',
      description: 'Buttons for use on dark backgrounds',
      code: {
        react: `<GoabxButton variant="inverse">Learn more</GoabxButton>
<GoabxButton variant="inverse" type="secondary">Contact us</GoabxButton>`,
        angular: `<goabx-button variant="inverse">Learn more</goabx-button>
<goabx-button variant="inverse" type="secondary">Contact us</goabx-button>`,
        webComponents: `<goa-button version="2" variant="inverse">Learn more</goa-button>
<goa-button version="2" variant="inverse" type="secondary">Contact us</goa-button>`,
      },
    },
  ],
};
